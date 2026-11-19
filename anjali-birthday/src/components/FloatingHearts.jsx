import { useMemo } from 'react';
import { seeded } from './motion.js';
import { Heart, Sparkle } from './Icons.jsx';

/** Decorative hearts & sparkles drifting upward. Pure CSS animation. */
export default function FloatingHearts({ count = 10, seed = 7, sparkles = true }) {
  const items = useMemo(() => {
    const r = seeded(seed);
    return Array.from({ length: count }, (_, i) => ({
      left: `${r() * 100}%`,
      size: 8 + r() * 14,
      dur: 11 + r() * 10,
      delay: -r() * 20,
      drift: `${(r() * 2 - 1) * 40}px`,
      sparkle: sparkles && i % 3 === 0,
      tone: r() < 0.5 ? 'rose' : r() < 0.75 ? 'gold' : 'blush',
    }));
  }, [count, seed, sparkles]);

  return (
    <div className="floaters" aria-hidden="true">
      {items.map((it, i) => (
        <span
          key={i}
          className={`floater tone-${it.tone}`}
          style={{ left: it.left, fontSize: it.size, animationDuration: `${it.dur}s`, animationDelay: `${it.delay}s`, '--drift': it.drift }}
        >
          {it.sparkle ? <Sparkle size="1em" /> : <Heart size="1em" />}
        </span>
      ))}
    </div>
  );
}
