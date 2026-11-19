import Reveal from '../components/Reveal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import { Sparkle } from '../components/Icons.jsx';
import { heartWishes } from '../data/content.js';

/** SECTION 5 — Wishes From the Heart: one wish at a time, revealed as she scrolls. */
export default function Wishes() {
  return (
    <section className="section wishes" id="wishes">
      <SectionTitle eyebrow="Chapter three" title="Wishes From" script="the Heart" />
      <div className="wish-stream">
        {heartWishes.map((w, i) => (
          <Reveal key={w} className="wish" threshold={0.55}>
            <span className="wish-num">{String(i + 1).padStart(2, '0')}</span>
            <Sparkle size={14} className="wish-spark" />
            <p className="wish-text">{w}</p>
            <span className="wish-line" aria-hidden="true" />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
