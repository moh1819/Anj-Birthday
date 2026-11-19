import { prefersReducedMotion } from './motion.js';

const GOLD = ['#f3d79b', '#e8c98a', '#caa25c', '#fff1d0', '#f4c2c9', '#e88ba0'];

/** Spawns a temporary full-screen canvas and runs particles on it. */
function runCanvas(particles, step, duration) {
  const c = document.createElement('canvas');
  c.className = 'fx-canvas';
  c.setAttribute('aria-hidden', 'true');
  document.body.appendChild(c);
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth, h = window.innerHeight;
  c.width = w * dpr; c.height = h * dpr;
  const ctx = c.getContext('2d');
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const start = performance.now();
  const frame = (t) => {
    const k = (t - start) / duration;
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => step(ctx, p, k));
    if (k < 1) requestAnimationFrame(frame);
    else c.remove();
  };
  requestAnimationFrame(frame);
}

function drawStar(ctx, x, y, r) {
  ctx.beginPath();
  ctx.moveTo(x, y - r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.quadraticCurveTo(x, y, x, y + r);
  ctx.quadraticCurveTo(x, y, x - r, y);
  ctx.quadraticCurveTo(x, y, x, y - r);
  ctx.fill();
}

/** Gentle golden confetti falling from the top / a point. */
export function confetti({ count = 120, originY = 0.35 } = {}) {
  if (prefersReducedMotion()) return;
  const w = window.innerWidth, h = window.innerHeight;
  const ps = Array.from({ length: count }, () => ({
    x: w / 2 + (Math.random() - 0.5) * w * 0.3,
    y: h * originY,
    vx: (Math.random() - 0.5) * 9,
    vy: -6 - Math.random() * 9,
    rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.3,
    size: 4 + Math.random() * 6,
    color: GOLD[(Math.random() * GOLD.length) | 0],
    shape: Math.random() < 0.25 ? 'star' : Math.random() < 0.5 ? 'dot' : 'rect',
  }));
  runCanvas(ps, (ctx, p, k) => {
    p.vy += 0.22; p.vx *= 0.985; p.vy *= 0.985;
    p.x += p.vx; p.y += p.vy; p.rot += p.vr;
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, k - 0.6) / 0.4);
    ctx.fillStyle = p.color;
    ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
    if (p.shape === 'rect') ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2.2);
    else if (p.shape === 'dot') { ctx.beginPath(); ctx.arc(0, 0, p.size / 3, 0, Math.PI * 2); ctx.fill(); }
    else drawStar(ctx, 0, 0, p.size * 0.7);
    ctx.restore();
  }, 3600);
}

/** Radial sparkle burst from a screen point (e.g. a button or the cake). */
export function sparkleBurst(x, y, { count = 46, spread = 1 } = {}) {
  if (prefersReducedMotion()) return;
  const ps = Array.from({ length: count }, () => {
    const a = Math.random() * Math.PI * 2, v = (1.5 + Math.random() * 5) * spread;
    return { x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v - 1, r: 2 + Math.random() * 5, color: GOLD[(Math.random() * GOLD.length) | 0], tw: Math.random() * 6 };
  });
  runCanvas(ps, (ctx, p, k) => {
    p.x += p.vx; p.y += p.vy; p.vx *= 0.95; p.vy = p.vy * 0.95 + 0.04;
    ctx.globalAlpha = Math.max(0, (1 - k) * (0.6 + 0.4 * Math.sin(p.tw + k * 30)));
    ctx.fillStyle = p.color;
    drawStar(ctx, p.x, p.y, p.r * (1 - k * 0.5));
  }, 1600);
}

export function burstFrom(el, opts) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  sparkleBurst(r.left + r.width / 2, r.top + r.height / 2, opts);
}
