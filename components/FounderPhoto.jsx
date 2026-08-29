'use client';
import { useState } from 'react';
import Poster from './Poster';

export default function FounderPhoto({ src = '/founder.jpg', alt, seed = 'himanshi' }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="founder__photo">
      {ok ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} onError={() => setOk(false)} />
      ) : (
        <Poster palette={['#12130c', '#26301a', '#d8ff36']} seed={seed} alt={alt} />
      )}
    </div>
  );
}
