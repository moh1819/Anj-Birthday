import { useCallback, useEffect, useState } from 'react';
import Starfield from './components/Starfield.jsx';
import MusicToggle from './components/MusicToggle.jsx';
import Envelope from './sections/Envelope.jsx';
import Hero from './sections/Hero.jsx';
import Celebration from './sections/Celebration.jsx';
import Gallery from './sections/Gallery.jsx';
import Wishes from './sections/Wishes.jsx';
import Letter from './sections/Letter.jsx';
import Interactive from './sections/Interactive.jsx';
import Finale from './sections/Finale.jsx';

export default function App() {
  const [stage, setStage] = useState('envelope'); // 'envelope' | 'main'
  const [run, setRun] = useState(0);

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('on-envelope', stage === 'envelope');
    window.scrollTo(0, 0);
  }, [stage, run]);

  const enter = useCallback(() => setStage('main'), []);
  const replay = useCallback(() => {
    setStage('envelope');
    setRun((r) => r + 1);
  }, []);

  return (
    <>
      <div className="nebula" aria-hidden="true" />
      <Starfield />
      <MusicToggle />
      {stage === 'envelope' ? (
        <Envelope key={`env-${run}`} onEnter={enter} />
      ) : (
        <main key={`main-${run}`} className="experience">
          <Hero />
          <Celebration />
          <Gallery />
          <Wishes />
          <Letter />
          <Interactive />
          <Finale onReplay={replay} />
        </main>
      )}
    </>
  );
}
