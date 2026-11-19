import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Starfield from './Starfield.jsx';
import FloatingHearts from './FloatingHearts.jsx';
import { X } from './Icons.jsx';
import { lockScroll, unlockScroll } from './motion.js';

/** Feature 2 — full-screen magical night sky with hundreds of stars & shooting stars. */
export default function WishSky({ onClose }) {
  const btn = useRef(null);
  useEffect(() => {
    lockScroll();
    const prev = document.activeElement;
    btn.current?.focus({ preventScroll: true });
    const onKey = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => { unlockScroll(); window.removeEventListener('keydown', onKey); prev?.focus?.({ preventScroll: true }); };
  }, [onClose]);

  return createPortal(
    <div className="wish-sky" role="dialog" aria-modal="true" aria-label="Make a birthday wish">
      <Starfield density={7} shooting className="wish-canvas" />
      <div className="wish-horizon" aria-hidden="true" />
      <FloatingHearts count={10} seed={21} />
      <div className="wish-sky-content">
        <p className="ws-line ws-1">Close your eyes,</p>
        <p className="ws-line ws-2">make a wish,</p>
        <p className="ws-line ws-3">and let the universe hear it.</p>
        <p className="ws-line ws-4 script gold-text">May every beautiful dream find its way to you.</p>
      </div>
      <button ref={btn} type="button" className="btn btn-ghost ws-close" onClick={onClose}>
        <X width={16} height={16} /> Back to the celebration
      </button>
    </div>,
    document.body
  );
}
