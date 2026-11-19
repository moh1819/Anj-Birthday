import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, X } from './Icons.jsx';
import { lockScroll, unlockScroll } from './motion.js';

/** Full-screen photo viewer with swipe, arrow keys and Escape. */
export default function Lightbox({ photos, index, onClose, onIndex }) {
  const [dx, setDx] = useState(0);
  const start = useRef(null);
  const closeRef = useRef(null);
  const count = photos.length;
  const photo = photos[index];

  const go = useCallback((d) => onIndex((index + d + count) % count), [index, count, onIndex]);

  useEffect(() => {
    lockScroll();
    const prev = document.activeElement;
    closeRef.current?.focus();
    return () => { unlockScroll(); prev?.focus?.({ preventScroll: true }); };
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') go(1);
      if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  // preload neighbours for instant swiping
  useEffect(() => {
    [1, -1].forEach((d) => { const im = new Image(); im.src = photos[(index + d + count) % count].src; });
  }, [index, photos, count]);

  const onTouchStart = (e) => { start.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
  const onTouchMove = (e) => {
    if (!start.current) return;
    const mx = e.touches[0].clientX - start.current.x;
    const my = e.touches[0].clientY - start.current.y;
    if (Math.abs(mx) > Math.abs(my)) setDx(mx);
  };
  const onTouchEnd = () => {
    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
    setDx(0); start.current = null;
  };

  return createPortal(
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Photo ${index + 1} of ${count}`} onClick={onClose}>
      <div className="lb-top" onClick={(e) => e.stopPropagation()}>
        <span className="lb-count">{String(index + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
        <button ref={closeRef} type="button" className="icon-btn" onClick={onClose} aria-label="Close photo">
          <X />
        </button>
      </div>

      <div
        className="lb-stage"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <figure
          key={photo.src}
          className="lb-figure"
          style={{ transform: `translateX(${dx}px)`, transition: dx ? 'none' : undefined }}
          onClick={(e) => e.stopPropagation()}
        >
          <img src={photo.src} alt={photo.alt} decoding="async" />
          <figcaption className="script">{photo.caption}</figcaption>
        </figure>
      </div>

      <div className="lb-nav" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="icon-btn" onClick={() => go(-1)} aria-label="Previous photo"><ChevronLeft /></button>
        <span className="lb-swipe">Swipe to explore</span>
        <button type="button" className="icon-btn" onClick={() => go(1)} aria-label="Next photo"><ChevronRight /></button>
      </div>
    </div>,
    document.body
  );
}
