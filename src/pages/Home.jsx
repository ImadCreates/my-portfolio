import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import RecordSection from '../components/RecordSection';
import LoadoutSection from '../components/LoadoutSection';
import PlayerSection from '../components/PlayerSection';
import ChallengeSection from '../components/ChallengeSection';
import useReveals from '../lib/useReveals';
import usePageMeta from '../lib/usePageMeta';
import { scrollToSection } from '../lib/scroll';

export default function Home() {
  const { hash } = useLocation();

  useReveals();
  usePageMeta(
    'Imaduddin Ahmed · Software Engineer',
    'Imaduddin Ahmed. Software engineer, security specialization. Founder of Routy. Toronto.',
  );

  useEffect(() => {
    if (!hash) return;
    scrollToSection(hash.slice(1), { immediate: true });
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
