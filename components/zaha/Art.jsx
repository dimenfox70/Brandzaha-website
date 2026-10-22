// Placeholder artwork for the Zaha page. Simple, faceless and on-brand, so it
// reads as an illustration, never as a real try-on result.

const SKIN = '#b98d70';
const SKIN_SHADE = '#a07658';
const HAIR = '#2a231f';
const TROUSERS = '#24242b';

function Collar({ style, shade, color }) {
  if (style === 'tee') {
    return <path d="M131 148c6 13 32 13 38 0" fill="none" stroke={shade} strokeWidth="5" strokeLinecap="round" />;
  }
  if (style === 'mandarin') {
    return (
      <>
        <path d="M133 143q17 9 34 0v10q-17 9-34 0z" fill={shade} />
        <path d="M150 156v172" stroke={shade} strokeWidth="2.5" />
        {[184, 216, 248, 280].map((y) => <circle key={y} cx="150" cy={y} r="2.6" fill={shade} />)}
      </>
    );
  }
  // camp collar: open V with flat lapels
  return (
    <>
      <path d="M136 146h28l-14 46z" fill={SKIN} />
      <path d="M150 194l-17-50-19 6 9 20 15 6z" fill={shade} />
      <path d="M150 194l17-50 19 6-9 20-15 6z" fill={shade} />
      <path d="M150 194v134" stroke={shade} strokeWidth="2.5" />
      {[214, 246, 278, 308].map((y) => <circle key={y} cx="150" cy={y} r="2.6" fill={shade} />)}
      <rect x="165" y="204" width="22" height="24" rx="2" fill="none" stroke={shade} strokeWidth="2" />
      <path d="M118 158l6 12" stroke={color} strokeWidth="1.5" opacity=".5" />
    </>
  );
}

export function FigureArt({ shirt = '#3a3a42', shade = '#2b2b32', collar = 'tee', className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 300 400" preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
      {/* arms */}
      <path d="M97 170c-12 32-20 82-24 132-1 16 2 30 8 33 8 2 12-8 12-22 2-42 10-82 18-112z" fill={SKIN} />
      <path d="M203 170c12 32 20 82 24 132 1 16-2 30-8 33-8 2-12-8-12-22-2-42-10-82-18-112z" fill={SKIN} />
      {/* trousers */}
      <path d="M94 322c20 10 92 10 112 0l6 78h-54l-8-48-8 48H88z" fill={TROUSERS} />
      {/* neck + head */}
      <path d="M137 116h26l2 32h-30z" fill={SKIN_SHADE} />
      <ellipse cx="150" cy="88" rx="30" ry="36" fill={SKIN} />
      <path d="M119 86c-3-34 21-46 33-45 21 0 35 15 30 46-4-17-16-25-32-25s-27 8-31 24z" fill={HAIR} />
      {/* shirt */}
      <path d="M104 150c16-8 32-10 46-4 14-6 30-4 46 4l34 18c6 28 8 46 6 58l-28 6-2 98c-20 9-92 9-112 0l-2-98-28-6c-2-12 0-30 6-58z" fill={shirt} />
      {/* folds */}
      <path d="M92 232l2 96c8 4 18 6 28 7l-6-100z" fill={shade} opacity=".35" />
      <path d="M208 232l-2 96c-8 4-18 6-28 7l6-100z" fill={shade} opacity=".25" />
      <path d="M70 168l34-18-6 82-34-6c-2-12 0-30 6-58z" fill={shade} opacity=".3" />
      <Collar style={collar} shade={shade} color={shirt} />
    </svg>
  );
}

export function ShirtArt({ color = '#9fb391', shade = '#7c8f6f', className, style }) {
  return (
    <svg className={className} style={style} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <path d="M35 17l15 5 15-5 21 12-6 17-10-4v44H30V42l-10 4-6-17z" fill={color} />
      <path d="M30 42v44h7V40z" fill={shade} opacity=".4" />
      <path d="M50 22l-9-6-6 1 6 12 9 3zM50 22l9-6 6 1-6 12-9 3z" fill={shade} />
      <path d="M50 32v54" stroke={shade} strokeWidth="1.2" />
      {[42, 54, 66, 78].map((y) => <circle key={y} cx="50" cy={y} r="1.3" fill={shade} />)}
    </svg>
  );
}
