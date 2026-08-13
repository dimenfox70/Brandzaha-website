import { poster } from '@/lib/poster';

// Generated gradient poster placeholder. Swap for <Image> when real assets land.
export default function Poster({ palette, seed = 'bz', alt = '', className = '', style }) {
  return (
    <div
      className={className}
      role="img"
      aria-label={alt}
      style={{
        backgroundImage: `url("${poster(palette, seed)}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100%',
        ...style,
      }}
    />
  );
}
