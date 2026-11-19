import { useEffect, useRef, useState } from 'react';
import FloatingHearts from '../components/FloatingHearts.jsx';
import { Heart, Sparkle } from '../components/Icons.jsx';
import { confetti } from '../components/effects.js';
import { prefersReducedMotion } from '../components/motion.js';

/** SECTION 1 — The Grand Surprise. phases: closed → opening → open → leaving */
export default function Envelope({ onEnter }) {
  const [phase, setPhase] = useState('closed');
  const timers = useRef([]);
  const enterBtn = useRef(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  useEffect(() => { if (phase === 'open') enterBtn.current?.focus({ preventScroll: true }); }, [phase]);

  const later = (fn, ms) => timers.current.push(setTimeout(fn, prefersReducedMotion() ? 0 : ms));

  const open = () => {
    if (phase !== 'closed') return;
    setPhase('opening');
    later(() => confetti({ count: 140, originY: 0.32 }), 900);
    later(() => setPhase('open'), 1700);
  };

  const enter = () => {
    if (phase === 'leaving') return;
    setPhase('leaving');
    later(onEnter, 900);
  };

  return (
    <section className={`envelope-screen phase-${phase}`} aria-label="Your birthday surprise">
      <div className="env-aura" aria-hidden="true" />
      <FloatingHearts count={12} seed={3} />

      <header className="env-intro">
        <p className="script env-hey">
          Hey Anjali… <Heart className="heart-inline" />
        </p>
        <p className="env-line">There's a little surprise waiting just for you.</p>
      </header>

      <div className="envelope-wrap">
        <div className="envelope" onClick={open} role="presentation">
          <div className="env-back" />
          <div className="env-card" aria-live="polite">
            <span className="env-card-eyebrow">Today, the universe celebrates you</span>
            <span className="script env-card-hb">Happy Birthday,</span>
            <span className="env-card-name">ANJALI <Heart className="heart-inline" /></span>
          </div>
          <div className="env-front">
            <span className="env-to">for</span>
            <span className="script env-name">Anjali</span>
          </div>
          <div className="env-flap" />
          <span className="env-seal" aria-hidden="true"><Heart /></span>
        </div>
        <div className="env-shadow" aria-hidden="true" />
      </div>

      <div className="env-actions">
        {phase === 'closed' || phase === 'opening' ? (
          <button type="button" className="btn btn-gold" onClick={open} disabled={phase !== 'closed'}>
            <Sparkle size={14} /> Open Your Birthday Surprise
          </button>
        ) : (
          <button ref={enterBtn} type="button" className="btn btn-gold btn-enter" onClick={enter}>
            Step Into Your Universe <Sparkle size={14} />
          </button>
        )}
        <p className="env-hint">A Little Universe Called Anjali</p>
      </div>
    </section>
  );
}
