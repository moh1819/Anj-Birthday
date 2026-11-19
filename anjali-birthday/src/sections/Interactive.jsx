import { useCallback, useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import Reveal from '../components/Reveal.jsx';
import Cake from '../components/Cake.jsx';
import WishSky from '../components/WishSky.jsx';
import ExtraSurprise from '../components/ExtraSurprise.jsx';
import { Sparkle } from '../components/Icons.jsx';

/** SECTION 7 — Interactive Birthday Surprise */
export default function Interactive() {
  const [sky, setSky] = useState(false);
  const close = useCallback(() => setSky(false), []);
  return (
    <section className="section interactive" id="surprise">
      <SectionTitle eyebrow="Chapter five" title="A Little" script="Magic For You" />

      <Reveal><Cake /></Reveal>

      <Reveal className="feature feature-wish">
        <div className="wish-orb" aria-hidden="true"><Sparkle size={34} /></div>
        <div className="feature-body">
          <h3 className="feature-title">Every star is <span className="script gold-text">listening</span></h3>
          <button type="button" className="btn btn-gold" onClick={() => setSky(true)}>Make a Birthday Wish ✨</button>
        </div>
      </Reveal>

      <Reveal><ExtraSurprise /></Reveal>

      {sky && <WishSky onClose={close} />}
    </section>
  );
}
