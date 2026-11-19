import { useEffect, useRef } from 'react';
import Floral from '../components/Floral.jsx';
import FloatingHearts from '../components/FloatingHearts.jsx';
import Reveal from '../components/Reveal.jsx';
import useInView from '../components/useInView.js';
import { Heart, RotateCcw } from '../components/Icons.jsx';
import { prefersReducedMotion } from '../components/motion.js';
import photos from '../data/photos.js';

const COLORS = ['#f3d79b', '#fff1d0', '#f4c2c9', '#e88ba0', '#e8c98a'];

function Fireworks({ active }) {
  const ref = useRef(null);
  const on = useRef(active);
  on.current = active;
  useEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const c = ref.current, ctx = c.getContext('2d');
    let w, h, raf, last = 0, next = 0, parts = [];
    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = c.clientWidth; h = c.clientHeight; c.width = w * dpr; c.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const boom = () => {
      const x = w * (0.2 + Math.random() * 0.6), y = h * (0.12 + Math.random() * 0.3);
      const col = COLORS[(Math.random() * COLORS.length) | 0], n = 44;
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2, v = 1.4 + Math.random() * 1.6;
        parts.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, life: 1, col });
      }
    };
    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (!on.current || document.hidden || t - last < 30) return;
      last = t;
      if (t > next) { boom(); next = t + 1300 + Math.random() * 1200; }
      ctx.clearRect(0, 0, w, h);
      ctx.globalCompositeOperation = 'lighter';
      parts = parts.filter((p) => p.life > 0);
      for (const p of parts) {
        p.x += p.vx; p.y += p.vy; p.vy += 0.025; p.vx *= 0.985; p.vy *= 0.985; p.life -= 0.012;
        ctx.globalAlpha = Math.max(0, p.life) * 0.9;
        ctx.fillStyle = p.col; ctx.beginPath(); ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
    };
    size(); raf = requestAnimationFrame(loop);
    window.addEventListener('resize', size);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', size); };
  }, []);
  return <canvas ref={ref} className="fireworks" aria-hidden="true" />;
}

/** SECTION 8 — The Grand Finale */
export default function Finale({ onReplay }) {
  const ref = useRef(null);
  const inView = useInView(ref, '100px');
  return (
    <section className={`finale ${inView ? 'in-view' : ''}`} id="finale" ref={ref}>
      <Fireworks active={inView} />
      <div className="finale-glow" aria-hidden="true" />
      <FloatingHearts count={16} seed={31} />
      <Floral className="finale-floral l" />
      <Floral className="finale-floral r" flip />

      <div className="finale-content">
        <Reveal className="finale-portrait">
          <img src={photos[0].thumb} alt="Anjali" loading="lazy" decoding="async" width="160" height="160" style={{ objectPosition: photos[0].focus }} />
        </Reveal>
        <Reveal as="h2" className="finale-title" delay={100}>
          <span className="finale-hb">HAPPY BIRTHDAY<br />ONCE AGAIN,</span>
          <span className="script finale-name">Anjali!</span>
          <Heart className="finale-heart" />
        </Reveal>
        <Reveal as="p" className="hero-date" delay={200}><span className="line" /> November 19, 1999 <span className="line" /></Reveal>
        <Reveal as="p" className="finale-text" delay={300}>
          May your days be bright, your heart be happy, and your future be filled with beautiful possibilities.
        </Reveal>
        <Reveal as="p" className="finale-mantra" delay={400}>Keep smiling. Keep shining. Keep being you.</Reveal>
        <Reveal as="p" className="finale-love script" delay={500}>
          With lots of love and the warmest birthday wishes. <Heart className="heart-inline" />
        </Reveal>
        <Reveal delay={600}>
          <button type="button" className="btn btn-ghost" onClick={onReplay}>
            <RotateCcw width={16} height={16} /> Replay Your Birthday Surprise
          </button>
        </Reveal>
      </div>
      <footer className="footer">Made with love, just for Anjali · November 19</footer>
    </section>
  );
}
