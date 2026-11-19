import { useEffect, useRef, useState } from 'react';
import SectionTitle from '../components/SectionTitle.jsx';
import Lightbox from '../components/Lightbox.jsx';
import Floral from '../components/Floral.jsx';
import Reveal from '../components/Reveal.jsx';
import { ChevronLeft, ChevronRight } from '../components/Icons.jsx';
import photos from '../data/photos.js';

const tilts = [-3, 2.5, -1.5, 3, -2.5, 1.8, -2, 2.8, -1.2];

/** SECTION 4 — A Beautiful Birthday Gallery (swipeable polaroids + lightbox) */
export default function Gallery() {
  const [open, setOpen] = useState(null);
  const [active, setActive] = useState(0);
  const track = useRef(null);

  useEffect(() => {
    const el = track.current;
    if (!el) return undefined;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = [...el.children];
        const mid = el.scrollLeft + el.clientWidth / 2;
        let best = 0, bd = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - mid);
          if (d < bd) { bd = d; best = i; }
        });
        setActive(best);
      });
    };
    el.addEventListener('scroll', onScroll, { passive: true });
    return () => { el.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  const scrollTo = (i) => {
    const el = track.current;
    const c = el?.children[Math.max(0, Math.min(photos.length - 1, i))];
    if (c) el.scrollTo({ left: c.offsetLeft - (el.clientWidth - c.offsetWidth) / 2, behavior: 'smooth' });
  };

  return (
    <section className="section gallery" id="gallery">
      <Floral className="floral-corner tr" flip />
      <SectionTitle eyebrow="Chapter two" title="A Beautiful" script="Birthday Gallery" />
      <Reveal as="p" className="section-lead">Tap any photo to see it up close.</Reveal>

      <div className="polaroid-track" ref={track} role="list">
        {photos.map((p, i) => (
          <div className="polaroid-slot" role="listitem" key={p.file}>
            <button
              type="button"
              className={`polaroid ${active === i ? 'is-active' : ''}`}
              style={{ '--tilt': `${tilts[i % tilts.length]}deg`, '--bob': `${(i % 3) * 0.9}s` }}
              onClick={() => setOpen(i)}
              aria-label={`Open photo: ${p.caption}`}
            >
              <span className="polaroid-tape" aria-hidden="true" />
              <span className="polaroid-img">
                <img
                  src={p.thumb}
                  alt={p.alt}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  width="640"
                  height="800"
                  style={{ objectPosition: p.focus }}
                  ref={(el) => { if (el && el.complete && el.naturalWidth) el.classList.add('loaded'); }}
                  onLoad={(e) => e.currentTarget.classList.add('loaded')}
                />
              </span>
              <span className="polaroid-cap script">{p.caption}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="gallery-controls">
        <button type="button" className="icon-btn" onClick={() => scrollTo(active - 1)} aria-label="Previous photos" disabled={active === 0}>
          <ChevronLeft />
        </button>
        <div className="dots" aria-hidden="true">
          {photos.map((p, i) => <span key={p.file} className={i === active ? 'on' : ''} />)}
        </div>
        <button type="button" className="icon-btn" onClick={() => scrollTo(active + 1)} aria-label="Next photos" disabled={active === photos.length - 1}>
          <ChevronRight />
        </button>
      </div>

      {open !== null && (
        <Lightbox photos={photos} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </section>
  );
}
