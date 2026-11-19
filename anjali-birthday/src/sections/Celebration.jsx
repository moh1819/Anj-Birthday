import Reveal from '../components/Reveal.jsx';
import SectionTitle from '../components/SectionTitle.jsx';
import Floral from '../components/Floral.jsx';
import { Heart, Sparkle } from '../components/Icons.jsx';
import { celebrationWishes, celebrationFinale } from '../data/content.js';

const ornaments = ['✦', '☾', '❀', '✧'];
const numerals = ['I', 'II', 'III', 'IV'];

/** SECTION 3 — A Little Celebration of Anjali */
export default function Celebration() {
  return (
    <section className="section celebration" id="celebration">
      <Floral className="floral-corner tl" />
      <SectionTitle eyebrow="Chapter one" title="A Little Celebration of" script="Anjali" />

      <ol className="cele-list">
        {celebrationWishes.map((w, i) => (
          <Reveal as="li" key={w} className="cele-item" delay={i * 80}>
            <span className="cele-orn" aria-hidden="true">
              <span className="cele-glyph">{ornaments[i]}</span>
              <span className="cele-num">{numerals[i]}</span>
            </span>
            <p>{w}</p>
          </Reveal>
        ))}
      </ol>

      <Reveal className="cele-finale">
        <Sparkle size={16} className="gold-text" />
        <p className="cele-quote">
          Never stop shining, <span className="script gold-text">Anjali.</span>
          <br />
          <em>{celebrationFinale.replace('Never stop shining, Anjali. ', '')}</em>
        </p>
        <Heart className="cele-heart" />
      </Reveal>
      <Floral className="floral-corner br" flip />
    </section>
  );
}
