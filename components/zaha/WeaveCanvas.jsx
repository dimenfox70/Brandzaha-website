'use client';
import { useEffect, useRef } from 'react';
import s from './zaha.module.css';

// Hero background: a woven-fabric field of lime points that ripples under the pointer,
// with a floating "mirror" ring and orbiting product tiles for the try-on idea.
// three.js loads after the page is idle. Without WebGL the hero simply keeps its dark gradient.
// With reduced motion it draws one still frame and never animates.
export default function WeaveCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    let stop = () => {};
    let cancelled = false;

    const load = () => {
      import('three')
        .then((THREE) => { if (!cancelled) stop = startWeave(THREE, canvas); })
        .catch(() => {});
    };
    const hasIdle = 'requestIdleCallback' in window;
    const idle = hasIdle ? window.requestIdleCallback(load, { timeout: 1500 }) : window.setTimeout(load, 300);

    return () => {
      cancelled = true;
      if (hasIdle) window.cancelIdleCallback(idle);
      else window.clearTimeout(idle);
      stop();
    };
  }, []);

  return <canvas ref={ref} className={s.weave} aria-hidden="true" />;
}

function startWeave(THREE, canvas) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch {
    return () => {};
  }
  // Colours are written and shown as plain sRGB values, so the lime matches the CSS #d8ff36 exactly.
  renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
  const srgb = (hex) => new THREE.Color().setHex(hex, THREE.LinearSRGBColorSpace);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  cam.position.set(0, 2.2, 9);
  cam.lookAt(0, 0, 0);

  // The fabric: a tilted grid drawn as points plus a faint wireframe.
  const geo = new THREE.PlaneGeometry(18, 11, 90, 56);
  geo.rotateX(-Math.PI / 2.6);
  const base = geo.attributes.position.array.slice();
  const lime = srgb(0xd8ff36);
  const dim = srgb(0x3a3f22);
  const cols = new Float32Array(geo.attributes.position.count * 3);
  geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
  const ptsMat = new THREE.PointsMaterial({ size: 0.045, vertexColors: true, transparent: true, opacity: 0.95 });
  const wireMat = new THREE.MeshBasicMaterial({ color: srgb(0xd8ff36), wireframe: true, transparent: true, opacity: 0.05 });
  const cloth = new THREE.Group();
  cloth.add(new THREE.Points(geo, ptsMat));
  cloth.add(new THREE.Mesh(geo, wireMat));
  cloth.position.set(1.5, -0.6, 0);
  scene.add(cloth);

  // A floating "mirror" ring for the try-on idea.
  const ringGeo = new THREE.TorusGeometry(1.25, 0.012, 8, 120);
  const ring2Geo = new THREE.TorusGeometry(1.45, 0.006, 8, 120);
  const ringMat = new THREE.MeshBasicMaterial({ color: srgb(0xf4f4f0), transparent: true, opacity: 0.55 });
  const ring2Mat = new THREE.MeshBasicMaterial({ color: srgb(0xd8ff36), transparent: true, opacity: 0.6 });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
  const halo = new THREE.Group();
  halo.add(ring, ring2);
  halo.position.set(3.2, 1.3, 0);
  scene.add(halo);

  // Orbiting product tiles.
  const tileGeo = new THREE.PlaneGeometry(0.34, 0.44);
  const tileMats = [0xd8ff36, 0x4d7cff, 0xff6b6b, 0xf4f4f0, 0x95bf47].map(
    (c) => new THREE.MeshBasicMaterial({ color: srgb(c), transparent: true, opacity: 0.85, side: THREE.DoubleSide }),
  );
  const tiles = tileMats.map((m) => {
    const tile = new THREE.Mesh(tileGeo, m);
    halo.add(tile);
    return tile;
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let mx = 0, my = 0, tx = 0, ty = 0;
  const onPointer = (e) => { tx = e.clientX / window.innerWidth - 0.5; ty = e.clientY / window.innerHeight - 0.5; };

  const size = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    const narrow = w < 700;
    cam.position.z = narrow ? 12 : 9;
    halo.position.x = narrow ? 1.4 : 3.2;
    halo.position.y = narrow ? 2.2 : 1.3;
    cam.updateProjectionMatrix();
  };

  const p = geo.attributes.position.array;
  const n = p.length / 3;
  const start = performance.now();
  const frame = (now) => {
    const t = reduced.matches ? 2 : (now - start) / 1000;
    mx += (tx - mx) * 0.04;
    my += (ty - my) * 0.04;
    for (let i = 0; i < n; i++) {
      const x = base[i * 3], z = base[i * 3 + 2];
      const d = Math.hypot(x - mx * 12, z - my * 8);
      const y = Math.sin(x * 0.55 + t * 0.9) * 0.35 + Math.cos(z * 0.8 + t * 0.6) * 0.28
        + Math.sin((x + z) * 0.3 - t * 0.5) * 0.2 + Math.exp(-d * d * 0.08) * 0.6 * Math.sin(d * 2 - t * 3);
      p[i * 3 + 1] = base[i * 3 + 1] + y;
      const c = Math.min(1, Math.max(0, (y + 0.6) / 1.4));
      cols[i * 3] = dim.r + (lime.r - dim.r) * c;
      cols[i * 3 + 1] = dim.g + (lime.g - dim.g) * c;
      cols[i * 3 + 2] = dim.b + (lime.b - dim.b) * c;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
    cloth.rotation.y = mx * 0.25;
    cloth.rotation.x = my * 0.08;
    ring.rotation.x = t * 0.4;
    ring.rotation.y = t * 0.25;
    ring2.rotation.y = -t * 0.3;
    ring2.rotation.x = Math.PI / 3 + t * 0.1;
    halo.position.y += Math.sin(t * 1.2) * 0.002;
    tiles.forEach((m, j) => {
      const a = t * 0.5 + j * ((Math.PI * 2) / 5);
      m.position.set(Math.cos(a) * 1.9, Math.sin(a * 1.3) * 0.35, Math.sin(a) * 1.9);
      m.rotation.y = -a + Math.PI / 2;
    });
    renderer.render(scene, cam);
  };

  // Animate only while the hero is on screen and motion is allowed.
  let visible = true;
  let raf = 0;
  const loop = (now) => { raf = requestAnimationFrame(loop); frame(now); };
  const sync = () => {
    const run = visible && !reduced.matches;
    if (run && !raf) raf = requestAnimationFrame(loop);
    if (!run && raf) { cancelAnimationFrame(raf); raf = 0; }
    if (reduced.matches) frame(0);
  };

  const io = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
  const ro = new ResizeObserver(() => { size(); if (!raf) frame(performance.now()); });
  size();
  frame(start);
  io.observe(canvas);
  ro.observe(canvas);
  window.addEventListener('pointermove', onPointer, { passive: true });
  reduced.addEventListener('change', sync);
  sync();

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener('pointermove', onPointer);
    reduced.removeEventListener('change', sync);
    [geo, ringGeo, ring2Geo, tileGeo].forEach((g) => g.dispose());
    [ptsMat, wireMat, ringMat, ring2Mat, ...tileMats].forEach((m) => m.dispose());
    renderer.dispose();
  };
}
