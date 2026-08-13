// Generated gradient poster (SVG data-URI) used when a real image is absent,
// so the site always renders cleanly.
function hashSeed(s) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function poster(palette = ['#101012', '#1b1b20', '#d8ff36'], seed = 'bz') {
  const [c1, c2, accent] = palette;
  const a1 = (hashSeed(seed) % 60) - 30;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
    <radialGradient id="r" cx="70%" cy="25%" r="60%"><stop offset="0" stop-color="${accent}" stop-opacity=".55"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient>
    <filter id="b"><feGaussianBlur stdDeviation="18"/></filter>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <rect width="800" height="600" fill="url(#r)"/>
  <g opacity=".18" stroke="${accent}" stroke-width="1" fill="none">
    <circle cx="640" cy="150" r="120" transform="rotate(${a1} 640 150)"/>
    <circle cx="640" cy="150" r="180"/>
    <path d="M-40 480 Q 400 360 840 520"/><path d="M-40 540 Q 400 420 840 580"/>
  </g>
  <g opacity=".9" filter="url(#b)"><circle cx="180" cy="470" r="90" fill="${accent}" opacity=".25"/></g>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export default poster;
