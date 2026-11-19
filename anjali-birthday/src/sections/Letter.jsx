import { useEffect, useRef, useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import Reveal from '../components/Reveal.jsx';
import { Heart } from '../components/Icons.jsx';
import { burstFrom } from '../components/effects.js';
import { prefersReducedMotion } from '../components/motion.js';
import { letter } from '../data/content.js';

/** SECTION 6 — A Special Birthday Letter. phases: sealed → breaking → open */
export default function Letter() {
  const [phase, setPhase] = useState('sealed');
  const seal = useRef(null);
  const paper = useRef(null);
  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const read = () => {
    if (phase !== 'sealed') return;
    burstFrom(seal.current, { count: 36 });
    setPhase('breaking');
    const ms = prefersReducedMotion() ? 0 : 1300;
    timers.current.push(setTimeout(() => {
      setPhase('open');
      timers.current.push(setTimeout(() => paper.current?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' }), 120));
    }, ms));
  };

  const all = [letter.greeting, ...letter.paragraphs, letter.closing, letter.postscript];

  return (
    <section className={`section letter phase-${phase}`} id="letter">
      <SectionTitle eyebrow="Chapter four" title="A Little Letter For You," script="Anjali" />

      {phase !== 'open' ? (
        <Reveal className="letter-envelope-wrap">
          <div className="letter-envelope" onClick={read} role="presentation">
            <div className="le-back" />
            <div className="le-paper-peek" />
            <div className="le-front"><span className="script">For Anjali</span></div>
            <div className="le-flap" />
            <span className="le-seal" ref={seal} aria-hidden="true">
              <span className="le-seal-half l" /><span className="le-seal-half r" />
              <Heart />
            </span>
          </div>
          <button type="button" className="btn btn-gold" onClick={read} disabled={phase !== 'sealed'}>
            Read Your Birthday Letter
          </button>
        </Reveal>
      ) : (
        <article className="paper" ref={paper} aria-label="Birthday letter">
          <div className="paper-inner">
            <span className="paper-stamp" aria-hidden="true"><Heart /></span>
            {all.map((line, i) => {
              const style = { '--i': i };
              if (i === 0) return <h3 key={i} className="paper-greeting script" style={style}>{line}</h3>;
              if (line === letter.closing)
                return (
                  <p key={i} className="paper-closing script" style={style}>
                    {line} <Heart className="heart-inline" />
                  </p>
                );
              if (line === letter.postscript) return <p key={i} className="paper-ps" style={style}>{line}</p>;
              return <p key={i} className={i === 1 ? 'paper-lead' : ''} style={style}>{line}</p>;
            })}
          </div>
        </article>
      )}
    </section>
  );
}
