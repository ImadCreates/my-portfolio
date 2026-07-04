import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import RecordSection from '../components/RecordSection';
import LoadoutSection from '../components/LoadoutSection';
import PlayerSection from '../components/PlayerSection';
import ChallengeSection from '../components/ChallengeSection';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (!hash) return;
    document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <>
      <Hero />
      <RecordSection />
      <LoadoutSection />
      <PlayerSection />
      <ChallengeSection />
    </>
  );
}
