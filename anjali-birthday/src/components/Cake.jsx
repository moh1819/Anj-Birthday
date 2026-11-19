import { useRef, useState } from 'react';
import { burstFrom } from './effects.js';
import { Heart } from './Icons.jsx';

/** Feature 1 — The Birthday Cake */
export default function Cake() {
  const [out, setOut] = useState(false);
  const cakeRef = useRef(null);

  const blow = () => {
    if (out) { setOut(false); return; }
    setOut(true);
    setTimeout(() => burstFrom(cakeRef.current, { count: 70, spread: 1.3 }), 350);
  };

  return (
    <div className="feature feature-cake">
      <div className={`cake ${out ? 'is-out' : ''}`} ref={cakeRef} aria-hidden="true">
        <div className="cake-glow" />
        <div className="candles">
          {[0, 1, 2].map((i) => (
            <div className="candle" key={i} style={{ '--i': i }}>
              <span className="flame"><span className="flame-core" /></span>
              <span className="smoke"><i /><i /><i /></span>
              <span className="wick" />
            </div>
          ))}
        </div>
        <svg className="cake-svg" viewBox="0 0 260 220">
          <defs>
            <linearGradient id="tierTop" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#fbe3e8" /><stop offset="1" stopColor="#efb7c4" />
            </linearGradient>
            <linearGradient id="tierBot" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#7a2742" /><stop offset="1" stopColor="#4a1428" />
            </linearGradient>
            <linearGradient id="goldBand" x1="0" x2="1">
              <stop offset="0" stopColor="#b8893f" /><stop offset=".5" stopColor="#f6dfa6" /><stop offset="1" stopColor="#b8893f" />
            </linearGradient>
          </defs>
          <ellipse cx="130" cy="206" rx="118" ry="12" fill="#e8c98a" opacity=".55" />
          <ellipse cx="130" cy="202" rx="112" ry="10" fill="url(#goldBand)" />
          <rect x="30" y="118" width="200" height="84" rx="10" fill="url(#tierBot)" />
          <rect x="30" y="160" width="200" height="8" fill="url(#goldBand)" opacity=".9" />
          <path d="M30 124 q12 20 24 0 q12 26 24 0 q12 18 24 0 q12 24 24 0 q12 18 24 0 q12 26 24 0 q12 18 24 0 q12 22 24 0 v-8 h-200z" fill="#f6d3da" />
          <rect x="62" y="50" width="136" height="74" rx="10" fill="url(#tierTop)" />
          <path d="M62 56 q10 16 20 0 q10 20 20 0 q10 14 20 0 q10 18 20 0 q10 14 20 0 q10 20 20 0 q8 12 16 0 v-8 h-136z" fill="#fff4f6" />
          <rect x="62" y="96" width="136" height="6" fill="url(#goldBand)" />
          {[78, 100, 122, 144, 166, 186].map((x) => <circle key={x} cx={x} cy="112" r="3" fill="#fff8ec" />)}
          {[46, 74, 102, 130, 158, 186, 214].map((x) => <circle key={x} cx={x} cy="186" r="3.4" fill="#f3d79b" />)}
          <g transform="translate(130 140)" fill="#f3d79b">
            <path d="M0 -8 c4 -8 14 -6 12 2 c-2 6 -12 12 -12 12 s-10 -6 -12 -12 c-2 -8 8 -10 12 -2z" />
          </g>
        </svg>
      </div>

      <div className="feature-body">
        <h3 className="feature-title">Make it a <span className="script gold-text">sweet</span> moment</h3>
        <button type="button" className="btn btn-gold" onClick={blow} aria-pressed={out}>
          {out ? 'Light the Candles Again' : 'Blow Out the Candles 🎂'}
        </button>
        <p className={`feature-msg ${out ? 'show' : ''}`} role="status" aria-live="polite">
          {out && (<>May all your wishes come true, <span className="script gold-text">Anjali!</span> <Heart className="heart-inline" /></>)}
        </p>
      </div>
    </div>
  );
}
