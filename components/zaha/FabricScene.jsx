'use client';
import { useEffect, useRef } from 'react';
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  CanvasTexture,
  CircleGeometry,
  Color,
  Group,
  LineSegments,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Plane,
  PlaneGeometry,
  Points,
  Raycaster,
  Scene,
  ShaderMaterial,
  SRGBColorSpace,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three';

/*
 * Hero scene: a woven "fabric" of lime points over a faint wireframe that ripples
 * and reacts to the pointer, plus a floating ring (the try-on mirror) with
 * product-coloured tiles orbiting it. Waves run on the GPU, so each frame is cheap.
 */

const LIME = '#d8ff36';
const INK = '#f4f4f0';
const TILES = [
  { bg: '#d8c4a0', fg: '#a88f66', kind: 'shirt' },
  { bg: '#9fb391', fg: '#6f8562', kind: 'kurta' },
  { bg: '#ff6b6b', fg: '#c94b4b', kind: 'dress' },
  { bg: '#efe8d8', fg: '#bdb39d', kind: 'shirt' },
  { bg: '#4d7cff', fg: '#3157c4', kind: 'jacket' },
  { bg: '#95bf47', fg: '#5e8e3e', kind: 'trousers' },
  { bg: '#4d6fbf', fg: '#2f4a8a', kind: 'dress' },
];

// Shared displacement: slow swell + weave texture + pointer ripple (plane-local space).
const WAVE = /* glsl */ `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseAmt;
  float fabric(vec2 p) {
    float t = uTime;
    float z = sin(p.x * 0.55 + t * 0.55) * 0.34
            + sin(p.y * 0.85 - t * 0.42) * 0.22
            + sin((p.x + p.y) * 0.32 + t * 0.27) * 0.30;
    float d = distance(p, uMouse);
    z += uMouseAmt * (0.6 * exp(-d * d * 0.55) + 0.14 * sin(d * 3.2 - t * 4.0) * exp(-d * 0.55));
    return z;
  }
`;

const pointsVert = /* glsl */ `
  ${WAVE}
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uHalf;
  attribute float aWeave;
  varying float vAlpha;
  varying float vLift;
  void main() {
    vec3 p = position;
    // over-under weave: neighbouring threads sit slightly above / below
    float z = fabric(p.xy) + aWeave * 0.045;
    p.z += z;
    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (8.0 / -mv.z);
    vec2 e = abs(p.xy) / uHalf;
    float edge = (1.0 - smoothstep(0.55, 1.0, e.x)) * (1.0 - smoothstep(0.45, 1.0, e.y));
    vAlpha = edge;
    vLift = clamp(z * 0.9 + 0.5, 0.0, 1.0);
  }
`;

const pointsFrag = /* glsl */ `
  uniform vec3 uColor;
  varying float vAlpha;
  varying float vLift;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.05, d) * vAlpha * (0.55 + 0.45 * vLift);
    gl_FragColor = vec4(uColor * (0.7 + 0.5 * vLift), a);
  }
`;

const linesVert = /* glsl */ `
  ${WAVE}
  uniform vec2 uHalf;
  attribute float aWeave;
  varying float vAlpha;
  void main() {
    vec3 p = position;
    p.z += fabric(p.xy) + aWeave * 0.045;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    vec2 e = abs(p.xy) / uHalf;
    vAlpha = (1.0 - smoothstep(0.5, 1.0, e.x)) * (1.0 - smoothstep(0.4, 1.0, e.y));
  }
`;

const linesFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  varying float vAlpha;
  void main() { gl_FragColor = vec4(uColor, uOpacity * vAlpha); }
`;

const glassVert = /* glsl */ `
  varying vec2 vUv;
  void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`;

const glassFrag = /* glsl */ `
  uniform float uTime;
  uniform vec3 uTint;
  varying vec2 vUv;
  void main() {
    vec2 c = vUv - 0.5;
    float r = length(c) * 2.0;
    float rim = smoothstep(0.55, 1.0, r) * 0.16;
    float band = smoothstep(0.18, 0.0, abs(c.x * 0.8 + c.y - (fract(uTime * 0.08) * 2.4 - 1.2))) * 0.10;
    gl_FragColor = vec4(uTint, rim + band + 0.025);
  }
`;

function drawTile({ bg, fg, kind }) {
  const c = document.createElement('canvas');
  c.width = 96; c.height = 128;
  const g = c.getContext('2d');
  const r = 16;
  g.fillStyle = bg;
  g.beginPath();
  g.moveTo(r, 0); g.arcTo(96, 0, 96, 128, r); g.arcTo(96, 128, 0, 128, r); g.arcTo(0, 128, 0, 0, r); g.arcTo(0, 0, 96, 0, r);
  g.fill();
  g.fillStyle = fg;
  g.beginPath();
  if (kind === 'dress') {
    g.moveTo(38, 26); g.lineTo(58, 26); g.lineTo(62, 50); g.lineTo(76, 104); g.lineTo(20, 104); g.lineTo(34, 50); g.closePath();
  } else if (kind === 'trousers') {
    g.moveTo(30, 24); g.lineTo(66, 24); g.lineTo(72, 106); g.lineTo(54, 106); g.lineTo(48, 52); g.lineTo(42, 106); g.lineTo(24, 106); g.closePath();
  } else if (kind === 'kurta') {
    g.moveTo(36, 22); g.lineTo(60, 22); g.lineTo(80, 36); g.lineTo(72, 50); g.lineTo(66, 46); g.lineTo(68, 108); g.lineTo(28, 108); g.lineTo(30, 46); g.lineTo(24, 50); g.lineTo(16, 36); g.closePath();
  } else {
    // shirt / jacket
    g.moveTo(36, 26); g.lineTo(60, 26); g.lineTo(82, 40); g.lineTo(74, 56); g.lineTo(66, 52); g.lineTo(66, 100); g.lineTo(30, 100); g.lineTo(30, 52); g.lineTo(22, 56); g.lineTo(14, 40); g.closePath();
  }
  g.fill();
  if (kind === 'shirt' || kind === 'jacket') {
    g.strokeStyle = bg; g.lineWidth = 3;
    g.beginPath(); g.moveTo(48, 34); g.lineTo(48, 98); g.stroke();
  }
  const tex = new CanvasTexture(c);
  tex.colorSpace = SRGBColorSpace;
  return tex;
}

function buildFabric(cols, rows, w, h) {
  const pts = new Float32Array(cols * rows * 3);
  const weave = new Float32Array(cols * rows);
  const at = (i, j) => [(i / (cols - 1) - 0.5) * w, (j / (rows - 1) - 0.5) * h, 0];
  const over = (i, j) => ((i + j) % 2 ? 1 : -1);
  let k = 0;
  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      pts.set(at(i, j), k * 3);
      weave[k++] = over(i, j);
    }
  }
  const pointsGeo = new BufferGeometry();
  pointsGeo.setAttribute('position', new BufferAttribute(pts, 3));
  pointsGeo.setAttribute('aWeave', new BufferAttribute(weave, 1));

  // Wireframe: every 3rd thread, both directions, zig-zagging over/under like woven yarn.
  const seg = [];
  const segW = [];
  const push = (a, b) => { seg.push(...at(...a), ...at(...b)); segW.push(over(...a), over(...b)); };
  for (let j = 0; j < rows; j += 3) for (let i = 0; i < cols - 1; i++) push([i, j], [i + 1, j]);
  for (let i = 0; i < cols; i += 3) for (let j = 0; j < rows - 1; j++) push([i, j], [i, j + 1]);
  const linesGeo = new BufferGeometry();
  linesGeo.setAttribute('position', new BufferAttribute(new Float32Array(seg), 3));
  linesGeo.setAttribute('aWeave', new BufferAttribute(new Float32Array(segW), 1));
  return { pointsGeo, linesGeo };
}

export default function FabricScene({ hostRef, reducedMotion = false, onReady, onFail }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const host = hostRef?.current || mount?.parentElement;
    if (!mount || !host) return undefined;

    let renderer;
    try {
      renderer = new WebGLRenderer({ antialias: window.devicePixelRatio < 1.5, alpha: true, powerPreference: 'low-power' });
    } catch {
      onFail?.();
      return undefined;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.setAttribute('aria-hidden', 'true');

    const scene = new Scene();
    const camera = new PerspectiveCamera(38, 1, 0.1, 60);
    camera.position.set(0, 0.4, 9);

    /* Fabric */
    const small = window.innerWidth < 700;
    const W = 17, H = 10.5;
    const { pointsGeo, linesGeo } = buildFabric(small ? 96 : 150, small ? 60 : 92, W, H);
    const shared = {
      uTime: { value: 0 },
      uMouse: { value: new Vector2(99, 99) },
      uMouseAmt: { value: 0 },
      uHalf: { value: new Vector2(W / 2, H / 2) },
    };
    const pointsMat = new ShaderMaterial({
      uniforms: { ...shared, uColor: { value: new Color(LIME) }, uSize: { value: small ? 3 : 2.6 }, uPixelRatio: { value: dpr } },
      vertexShader: pointsVert,
      fragmentShader: pointsFrag,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const linesMat = new ShaderMaterial({
      uniforms: { ...shared, uColor: { value: new Color(LIME) }, uOpacity: { value: 0.14 } },
      vertexShader: linesVert,
      fragmentShader: linesFrag,
      transparent: true,
      depthWrite: false,
      blending: AdditiveBlending,
    });
    const fabric = new Group();
    fabric.add(new LineSegments(linesGeo, linesMat));
    fabric.add(new Points(pointsGeo, pointsMat));
    fabric.rotation.x = -1.18;
    scene.add(fabric);

    /* Mirror ring + orbiting tiles */
    const mirror = new Group();
    const ringGeo = new TorusGeometry(1.25, 0.02, 12, 180);
    const ringMat = new MeshBasicMaterial({ color: new Color(INK), transparent: true, opacity: 0.9 });
    const innerRingGeo = new TorusGeometry(1.36, 0.006, 8, 180);
    const innerRingMat = new MeshBasicMaterial({ color: new Color(LIME), transparent: true, opacity: 0.55 });
    const glassGeo = new CircleGeometry(1.24, 72);
    const glassMat = new ShaderMaterial({
      uniforms: { uTime: shared.uTime, uTint: { value: new Color(INK) } },
      vertexShader: glassVert,
      fragmentShader: glassFrag,
      transparent: true,
      depthWrite: false,
    });
    mirror.add(new Mesh(glassGeo, glassMat));
    mirror.add(new Mesh(ringGeo, ringMat));
    mirror.add(new Mesh(innerRingGeo, innerRingMat));
    scene.add(mirror);

    const tileGeo = new PlaneGeometry(0.34, 0.453);
    const tiles = TILES.map((t, i) => {
      const tex = drawTile(t);
      const mat = new MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false });
      const mesh = new Mesh(tileGeo, mat);
      mesh.userData = { phase: (i / TILES.length) * Math.PI * 2, tex };
      scene.add(mesh);
      return mesh;
    });

    const raycaster = new Raycaster();
    const ndc = new Vector2();
    const hit = new Vector3();

    /* Layout: the ring sits exactly where the CSS fallback ring is drawn, so the
       placement for each breakpoint lives in zaha.css. */
    const layout = { ringX: 2.6, ringY: 0.35, ringScale: 1 };
    const ringPlane = new Plane(new Vector3(0, 0, 1), -0.4);
    const ringEl = host.querySelector('.zh-fallback__ring');
    const toWorld = (px, py, w, h, out) => {
      ndc.set((px / w) * 2 - 1, -(py / h) * 2 + 1);
      raycaster.setFromCamera(ndc, camera);
      return raycaster.ray.intersectPlane(ringPlane, out);
    };
    function resize() {
      const w = host.clientWidth || window.innerWidth;
      const h = host.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      const portrait = camera.aspect < 0.9;
      camera.fov = portrait ? 46 : 38;
      camera.updateProjectionMatrix();
      camera.position.set(0, 0.4, 9);
      camera.lookAt(0, -0.2, 0);
      camera.updateMatrixWorld();
      fabric.position.set(0, portrait ? -2.2 : -1.95, -1);
      if (ringEl) {
        const hr = host.getBoundingClientRect();
        const rr = ringEl.getBoundingClientRect();
        const cx = rr.left - hr.left + rr.width / 2;
        const cy = rr.top - hr.top + rr.height / 2;
        const c = toWorld(cx, cy, w, h, new Vector3());
        const e = toWorld(cx + rr.width / 2, cy, w, h, new Vector3());
        if (c && e) Object.assign(layout, { ringX: c.x, ringY: c.y, ringScale: Math.max(0.2, (e.x - c.x) / 1.25) });
      }
      if (reducedMotion) render(2.4);
    }

    /* Pointer → plane-local coordinates */
    const plane = new Plane();
    const normal = new Vector3();
    const mouseTarget = new Vector2(99, 99);
    const tilt = { x: 0, y: 0, tx: 0, ty: 0 };
    let lastMove = -1e9;
    let clock = 0;

    function onPointer(e) {
      const r = host.getBoundingClientRect();
      if (e.clientY < r.top || e.clientY > r.bottom) return;
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = -((e.clientY - r.top) / r.height) * 2 + 1;
      tilt.tx = nx; tilt.ty = ny;
      ndc.set(nx, ny);
      raycaster.setFromCamera(ndc, camera);
      fabric.updateMatrixWorld();
      normal.set(0, 0, 1).applyQuaternion(fabric.quaternion);
      plane.setFromNormalAndCoplanarPoint(normal, fabric.position);
      if (raycaster.ray.intersectPlane(plane, hit)) {
        fabric.worldToLocal(hit);
        mouseTarget.set(hit.x, hit.y);
        lastMove = clock;
      }
    }

    function render(t) {
      shared.uTime.value = t;
      // ease pointer
      const m = shared.uMouse.value;
      if (m.x > 90) m.copy(mouseTarget); else m.lerp(mouseTarget, 0.08);
      const active = clock - lastMove < 1.6 ? 1 : 0;
      shared.uMouseAmt.value += (active - shared.uMouseAmt.value) * 0.04;
      tilt.x += (tilt.tx - tilt.x) * 0.05;
      tilt.y += (tilt.ty - tilt.y) * 0.05;

      const s = layout.ringScale;
      mirror.position.set(layout.ringX, layout.ringY + Math.sin(t * 0.8) * 0.08, 0.4);
      mirror.scale.setScalar(s);
      mirror.rotation.set(-tilt.y * 0.25 + Math.sin(t * 0.5) * 0.05, tilt.x * 0.35 + Math.sin(t * 0.35) * 0.12, 0);

      tiles.forEach((tile) => {
        const a = tile.userData.phase + t * 0.32;
        const x = Math.cos(a) * 1.85 * s;
        const z = Math.sin(a) * 0.9 * s;
        const y = Math.sin(a) * 0.55 * s + Math.sin(t * 1.3 + tile.userData.phase) * 0.06;
        tile.position.set(mirror.position.x + x, mirror.position.y + y, mirror.position.z + z);
        tile.quaternion.copy(camera.quaternion);
        tile.rotateZ(Math.sin(t * 0.9 + tile.userData.phase) * 0.18);
        tile.scale.setScalar(s * (0.85 + (z / (0.9 * s) + 1) * 0.15));
        tile.material.opacity = 0.55 + ((z / (0.9 * s)) + 1) * 0.225;
      });

      camera.position.x = tilt.x * 0.25;
      camera.position.y = 0.4 + tilt.y * 0.12;
      camera.lookAt(0, -0.2, 0);
      renderer.render(scene, camera);
    }

    /* Loop: runs only while the hero is on screen and the tab is visible */
    let raf = 0;
    let running = false;
    let visible = true;
    let last = 0;
    let readyFired = false;

    function frame(now) {
      if (!running) return;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      clock += dt;
      render(clock);
      if (!readyFired) { readyFired = true; onReady?.(); }
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (running || reducedMotion || !visible || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start(); else stop();
    }, { threshold: 0 });
    io.observe(host);

    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVis);

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    resize();

    const onLost = (e) => { e.preventDefault(); stop(); onFail?.(); };
    renderer.domElement.addEventListener('webglcontextlost', onLost);

    if (reducedMotion) {
      render(2.4);
      onReady?.();
    } else {
      window.addEventListener('pointermove', onPointer, { passive: true });
      start();
    }

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('pointermove', onPointer);
      renderer.domElement.removeEventListener('webglcontextlost', onLost);
      tiles.forEach((t) => { t.userData.tex.dispose(); t.material.dispose(); });
      [pointsGeo, linesGeo, ringGeo, innerRingGeo, glassGeo, tileGeo].forEach((g) => g.dispose());
      [pointsMat, linesMat, ringMat, innerRingMat, glassMat].forEach((m) => m.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
    // Scene is built once per mount; callbacks are read through refs in the parent.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion]);

  return <div ref={mountRef} className="zh-canvas" />;
}
