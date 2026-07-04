import { personalInfo, hero } from './data/portfolioData';

/* Phase 1 placeholder. Proves the token layer renders. Replaced in phase 2. */
export default function App() {
  return (
    <main className="flex min-h-screen items-center bg-ink px-6 text-bone">
      <div>
        <p className="label-mono text-steel">{hero.eyebrow.join(' / ')}</p>
        <h1 className="display-face mt-4 text-hero">{personalInfo.name}</h1>
        <p className="mt-6 max-w-xl text-body text-steel">{personalInfo.positioning}</p>
      </div>
    </main>
  );
}
