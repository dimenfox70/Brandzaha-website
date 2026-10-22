import { ImageResponse } from 'next/og';
import { zaha } from '@/lib/zaha';

export const alt = zaha.seo.ogAlt;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TILES = ['#d8c4a0', '#9fb391', '#ff6b6b', '#efe8d8', '#4d7cff', '#95bf47'];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0a0a0a', color: '#f4f4f0', padding: 72, position: 'relative', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: 700 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 30, fontWeight: 700 }}>
            <div style={{ width: 44, height: 44, borderRadius: 11, background: '#d8ff36', color: '#0a0a0a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>B</div>
            <div style={{ display: 'flex' }}>Brand<span style={{ fontStyle: 'italic', color: '#d8ff36' }}>Zaha</span></div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignSelf: 'flex-start', background: '#d8ff36', color: '#0a0a0a', borderRadius: 100, padding: '8px 20px', fontSize: 24, fontWeight: 700 }}>
              {`${zaha.hero.pill.tag} · ${zaha.hero.pill.text}`}
            </div>
            <div style={{ fontSize: 92, fontWeight: 800, lineHeight: 0.95, letterSpacing: -2, marginTop: 28, textTransform: 'uppercase' }}>{zaha.hero.title.join(' ')}</div>
          </div>
          <div style={{ fontSize: 28, color: '#b7b7b1' }}>Zaha AI Shopping Assistant</div>
        </div>
        <div style={{ position: 'absolute', right: 90, top: 140, width: 340, height: 340, borderRadius: 340, border: '4px solid #f4f4f0', display: 'flex', boxShadow: '0 0 80px rgba(216,255,54,.35)' }} />
        {TILES.map((c, i) => {
          const a = (i / TILES.length) * Math.PI * 2;
          return (
            <div key={c} style={{ position: 'absolute', width: 54, height: 72, borderRadius: 9, background: c, left: 940 + Math.cos(a) * 230 - 27, top: 310 + Math.sin(a) * 230 - 36, display: 'flex' }} />
          );
        })}
      </div>
    ),
    size,
  );
}
