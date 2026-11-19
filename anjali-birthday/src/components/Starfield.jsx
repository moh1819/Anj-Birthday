import { useEffect, useRef } from 'react';
import { prefersReducedMotion, seeded } from './motion.js';

/**
 * Full-viewport twinkling star canvas with slowly rising golden dust.
 * `density` = stars per 10,000 px². Pauses when the tab is hidden or the canvas is inactive.
 */
export default function Starfield({ density = 2.2, gold = true, shooting = false, active = true, className = 'starfield' }) {
  const ref = useRef(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduced = prefersReducedMotion();
    let w = 0, h = 0, dpr = 1, raf = 0, last = 0;
    let stars = [], dust = [], meteors = [], nextMeteor = 1200;

    const build = () => {
      const rand = seeded(42);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(900, Math.round(((w * h) / 10000) * density));
      stars = Array.from({ length: count }, () => ({
        x: rand(), y: rand(),
        r: rand() < 0.08 ? 1.1 + rand() * 0.9 : 0.35 + rand() * 0.75,
        p: rand() * Math.PI * 2, s: 0.4 + rand() * 1.6,
        hue: rand() < 0.18 ? 'gold' : rand() < 0.3 ? 'pink' : 'white',
      }));
      dust = gold ? Array.from({ length: Math.round(count / 14) + 6 }, () => ({
        x: rand(), y: rand(), r: 0.6 + rand() * 1.6, v: 0.004 + rand() * 0.012, d: rand() * 2 - 1, p: rand() * 6,
      })) : [];
    };

    const color = (s, a) =>
      s.hue === 'gold' ? `rgba(240,212,150,${a})` : s.hue === 'pink' ? `rgba(248,196,210,${a})` : `rgba(255,248,240,${a})`;

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        const a = reduced ? 0.7 : 0.35 + 0.65 * Math.abs(Math.sin(s.p + t * 0.001 * s.s));
        ctx.beginPath(); ctx.fillStyle = color(s, a);
        ctx.arc(s.x * w, s.y * h, s.r, 0, Math.PI * 2); ctx.fill();
        if (s.r > 1.3) {
          ctx.fillStyle = color(s, a * 0.18);
          ctx.beginPath(); ctx.arc(s.x * w, s.y * h, s.r * 3.2, 0, Math.PI * 2); ctx.fill();
        }
      }
      for (const d of dust) {
        if (!reduced) { d.y -= d.v * 0.016; d.x += Math.sin(t * 0.0006 + d.p) * 0.00012; if (d.y < -0.02) { d.y = 1.02; d.x = Math.random(); } }
        const a = 0.25 + 0.35 * Math.abs(Math.sin(t * 0.0012 + d.p));
        const g = ctx.createRadialGradient(d.x * w, d.y * h, 0, d.x * w, d.y * h, d.r * 4);
        g.addColorStop(0, `rgba(246,221,160,${a})`); g.addColorStop(1, 'rgba(246,221,160,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(d.x * w, d.y * h, d.r * 4, 0, Math.PI * 2); ctx.fill();
      }
      if (shooting && !reduced) {
        if (t > nextMeteor) {
          const R = Math.random;
          meteors.push({ x: 0.3 + R() * 0.7, y: R() * 0.45, life: 0, len: 90 + R() * 120, sp: 0.9 + R() * 0.6 });
          nextMeteor = t + 1600 + R() * 2400;
        }
        meteors = meteors.filter((m) => m.life < 1);
        for (const m of meteors) {
          m.life += 0.012 * m.sp;
          const x = m.x * w - m.life * w * 0.55, y = m.y * h + m.life * w * 0.32;
          const a = Math.sin(m.life * Math.PI);
          const g = ctx.createLinearGradient(x, y, x + m.len, y - m.len * 0.58);
          g.addColorStop(0, `rgba(255,244,220,${a})`); g.addColorStop(1, 'rgba(255,244,220,0)');
          ctx.strokeStyle = g; ctx.lineWidth = 1.6; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + m.len, y - m.len * 0.58); ctx.stroke();
        }
      }
    };

    const loop = (t) => {
      raf = requestAnimationFrame(loop);
      if (!activeRef.current || document.hidden) return;
      if (t - last < 33) return; // ~30fps keeps battery happy
      last = t; draw(t);
    };

    build(); draw(0);
    if (!reduced) raf = requestAnimationFrame(loop);
    let rt;
    // iOS fires resize when the toolbar shows/hides — only rebuild on real size changes.
    const onResize = () => {
      clearTimeout(rt);
      rt = setTimeout(() => {
        if (Math.abs(canvas.clientWidth - w) > 2 || Math.abs(canvas.clientHeight - h) > 140) { build(); draw(performance.now()); }
      }, 150);
    };
    window.addEventListener('resize', onResize);
    return () => { cancelAnimationFrame(raf); clearTimeout(rt); window.removeEventListener('resize', onResize); };
  }, [density, gold, shooting]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
