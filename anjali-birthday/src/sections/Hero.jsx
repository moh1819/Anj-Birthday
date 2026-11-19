import FloatingHearts from '../components/FloatingHearts.jsx';
import { ChevronDown, Heart, Sparkle } from '../components/Icons.jsx';

/** SECTION 2 — The Birthday Hero */
export default function Hero() {
  return (
    <section className="hero" id="top" aria-label="Happy birthday Anjali">
      <div className="hero-sky" aria-hidden="true">
        <div className="hero-moon" />
        <svg className="hero-orbits" viewBox="0 0 400 400">
          <circle cx="200" cy="200" r="150" />
          <circle cx="200" cy="200" r="185" className="o2" />
          <circle cx="200" cy="200" r="120" className="o3" />
          <g className="orbit-dot"><circle cx="200" cy="50" r="3" /></g>
          <g className="orbit-dot d2"><circle cx="200" cy="15" r="2.2" /></g>
        </svg>
        <div className="hero-rays" />
      </div>
      <FloatingHearts count={14} seed={11} />

      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">
          <Sparkle size={10} /> A Little Universe Called Anjali <Sparkle size={10} />
        </p>
        <h1 className="hero-title" aria-label="Happy Birthday, Anjali!">
          <span className="hero-hb" aria-hidden="true">HAPPY BIRTHDAY,</span>
          <span className="hero-name script" aria-hidden="true">Anjali!</span>
          <Heart className="hero-heart" />
        </h1>
        <p className="hero-date">
          <span className="line" /> November 19, 1999 <span className="line" />
        </p>
        <p className="hero-sub">
          Today, the world celebrates you. May your life always shine as beautifully as your smile.
        </p>
      </div>

      <a className="scroll-cue" href="#celebration" aria-label="Scroll to explore your surprise">
        <span>Explore your surprise</span>
        <ChevronDown width={18} height={18} />
      </a>
    </section>
  );
}
