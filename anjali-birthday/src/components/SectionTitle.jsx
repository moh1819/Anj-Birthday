import Reveal from './Reveal.jsx';
import { Sparkle } from './Icons.jsx';

export default function SectionTitle({ eyebrow, title, script }) {
  return (
    <Reveal className="section-title">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>
        {title} {script && <span className="script gold-text">{script}</span>}
      </h2>
      <div className="divider" aria-hidden="true"><span /><Sparkle size={12} /><span /></div>
    </Reveal>
  );
}
