import { useRef, useState } from 'react';
import { burstFrom } from './effects.js';
import { Heart } from './Icons.jsx';

/** Feature 3 — A Little Extra Surprise: a gift box that opens into a message. */
export default function ExtraSurprise() {
  const [open, setOpen] = useState(false);
  const box = useRef(null);
  const reveal = () => {
    if (open) return;
    setOpen(true);
    setTimeout(() => burstFrom(box.current, { count: 60, spread: 1.2 }), 250);
  };

  return (
    <div className={`feature feature-gift ${open ? 'is-open' : ''}`}>
      <div className="gift" ref={box} aria-hidden="true">
        <div className="gift-lid"><span className="bow l" /><span className="bow r" /></div>
        <div className="gift-box" />
        <div className="gift-hearts">
          {[0, 1, 2, 3, 4].map((i) => <span key={i} style={{ '--i': i }}><Heart /></span>)}
        </div>
      </div>
      <div className="feature-body">
        {!open && (
          <button type="button" className="btn btn-gold" onClick={reveal}>One More Surprise ❤️</button>
        )}
        <div className={`extra-msg ${open ? 'show' : ''}`} role="status" aria-live="polite">
          {open && (
            <>
              <p>Someone as special as you deserves a universe full of happiness.</p>
              <p className="script gold-text extra-sign">Keep smiling, Anjali.</p>
              <p>The world needs your sparkle.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
