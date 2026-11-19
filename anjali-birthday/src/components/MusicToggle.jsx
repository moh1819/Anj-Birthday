import { useEffect, useRef, useState } from 'react';
import { Music, Pause } from './Icons.jsx';

const TRACK = '/music/birthday-music-box.mp3';

/** Music is OFF by default and only starts after an explicit tap (iOS Safari safe). */
export default function MusicToggle() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const a = audioRef.current;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    a.addEventListener('play', onPlay);
    a.addEventListener('pause', onPause);
    return () => { a.removeEventListener('play', onPlay); a.removeEventListener('pause', onPause); a.pause(); };
  }, []);

  const toggle = async () => {
    const a = audioRef.current;
    if (a.paused) {
      try {
        a.volume = 0.7;
        await a.play();
        setFailed(false);
      } catch {
        setFailed(true);
      }
    } else {
      a.pause();
    }
  };

  return (
    <div className="music">
      <audio ref={audioRef} src={TRACK} loop preload="none" playsInline />
      <button
        type="button"
        className={`music-btn ${playing ? 'is-playing' : ''}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? 'Pause music' : 'Play music'}
      >
        {playing ? <Pause width={16} height={16} /> : <Music width={16} height={16} />}
        <span className="music-label">{playing ? 'Playing' : 'Music'}</span>
        <span className="eq" aria-hidden="true"><i /><i /><i /></span>
      </button>
      {failed && <span className="music-hint" role="status">Tap again to play</span>}
    </div>
  );
}
