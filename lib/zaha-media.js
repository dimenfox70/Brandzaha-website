// Server-only helpers: find optional media in /public and read image sizes,
// so real screenshots and photos replace placeholders without code changes.
import fs from 'node:fs';
import path from 'node:path';

const PUBLIC_DIR = path.join(process.cwd(), 'public');
const IMAGE_EXTS = ['.png', '.jpg', '.jpeg', '.webp'];

function diskPath(publicPath) {
  return path.join(PUBLIC_DIR, publicPath.replace(/^\/+/, ''));
}

export function publicFileExists(publicPath) {
  try {
    return fs.statSync(diskPath(publicPath)).isFile();
  } catch {
    return false;
  }
}

// Read width/height from PNG, JPEG or WebP headers. Returns null if unknown.
function readSize(file) {
  let buf;
  try {
    const fd = fs.openSync(file, 'r');
    buf = Buffer.alloc(256 * 1024);
    const n = fs.readSync(fd, buf, 0, buf.length, 0);
    fs.closeSync(fd);
    buf = buf.subarray(0, n);
  } catch {
    return null;
  }
  // PNG
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) };
  }
  // JPEG: walk segments until a start-of-frame marker
  if (buf[0] === 0xff && buf[1] === 0xd8) {
    let i = 2;
    while (i + 9 < buf.length) {
      if (buf[i] !== 0xff) { i++; continue; }
      const marker = buf[i + 1];
      const len = buf.readUInt16BE(i + 2);
      const isSof = marker >= 0xc0 && marker <= 0xcf && ![0xc4, 0xc8, 0xcc].includes(marker);
      if (isSof) return { width: buf.readUInt16BE(i + 7), height: buf.readUInt16BE(i + 5) };
      i += 2 + len;
    }
    return null;
  }
  // WebP
  if (buf.length > 30 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WEBP') {
    const chunk = buf.toString('ascii', 12, 16);
    if (chunk === 'VP8X') return { width: 1 + buf.readUIntLE(24, 3), height: 1 + buf.readUIntLE(27, 3) };
    if (chunk === 'VP8 ') return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff };
    if (chunk === 'VP8L') {
      const b = buf.readUInt32LE(21);
      return { width: (b & 0x3fff) + 1, height: ((b >> 14) & 0x3fff) + 1 };
    }
  }
  return null;
}

// Find an image by path, also trying the other common extensions.
// Returns { src, width, height } or null when nothing is there.
export function findImage(publicPath) {
  if (!publicPath) return null;
  const ext = path.extname(publicPath);
  const base = publicPath.slice(0, publicPath.length - ext.length);
  const candidates = [publicPath, ...IMAGE_EXTS.filter((e) => e !== ext.toLowerCase()).map((e) => base + e)];
  for (const src of candidates) {
    if (publicFileExists(src)) {
      const size = readSize(diskPath(src)) || { width: 1600, height: 1000 };
      return { src, ...size };
    }
  }
  return null;
}
