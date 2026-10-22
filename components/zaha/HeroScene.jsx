'use client';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useRef, useState } from 'react';

// three.js only ever loads in the browser, in its own chunk.
const FabricScene = dynamic(() => import('./FabricScene'), { ssr: false });

const FALLBACK_TILES = ['#d8c4a0', '#9fb391', '#ff6b6b', '#efe8d8', '#4d7cff', '#95bf47', '#4d6fbf'];

// Hardware-accelerated WebGL only. Software renderers (no GPU, e.g. SwiftShader)
// would run the scene on the CPU, so those devices keep the CSS version.
function hasFastWebGL() {
  try {
    if (!window.WebGLRenderingContext) return false;
    const opts = { failIfMajorPerformanceCaveat: true };
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2', opts) || c.getContext('webgl', opts);
    if (!gl) return false;
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER));
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return !/swiftshader|llvmpipe|softpipe|software/i.test(renderer);
  } catch {
    return false;
  }
}

function lowPowerDevice() {
  const n = navigator;
  return !!(n.connection && n.connection.saveData) || (n.deviceMemory && n.deviceMemory <= 2) || (n.hardwareConcurrency && n.hardwareConcurrency <= 2);
}

// Wait for the page to finish loading and the main thread to go quiet.
function whenIdle(cb) {
  let idleId = 0;
  let timer = 0;
  const idle = () => {
    if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(cb, { timeout: 2500 });
    else timer = window.setTimeout(cb, 600);
  };
  if (document.readyState === 'complete') idle();
  else window.addEventListener('load', idle, { once: true });
  return () => {
    window.removeEventListener('load', idle);
    if (idleId) window.cancelIdleCallback(idleId);
    if (timer) window.clearTimeout(timer);
  };
}

export default function HeroScene() {
  const hostRef = useRef(null);
  const [mode, setMode] = useState('fallback'); // fallback | loading | ready
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    // ?force3d skips the device checks (handy for testing on machines without a GPU).
    const forced = new URLSearchParams(window.location.search).has('force3d');
    if (!forced && (!hasFastWebGL() || lowPowerDevice())) return undefined;
    return whenIdle(() => setMode('loading'));
  }, []);

  const onReady = useCallback(() => setMode('ready'), []);
  const onFail = useCallback(() => setMode('fallback'), []);

  return (
    <div ref={hostRef} className={`zh-scene ${mode === 'ready' ? 'is-ready' : ''}`} aria-hidden="true">
      <div className="zh-fallback">
        <div className="zh-fallback__fabric" />
        <div className="zh-fallback__ring">
          <span className="zh-fallback__glass" />
          <span className="zh-fallback__orbit">
            {FALLBACK_TILES.map((c, i) => (
              <i key={c + i} style={{ '--c': c, '--a': `${(360 / FALLBACK_TILES.length) * i}deg` }} />
            ))}
          </span>
        </div>
      </div>
      {mode !== 'fallback' && <FabricScene hostRef={hostRef} reducedMotion={reduced} onReady={onReady} onFail={onFail} />}
    </div>
  );
}
