export default function Footer() {
  return (
    <footer className="mt-12 border-t border-hairline">
      <div className="flex flex-col justify-between gap-2 px-6 py-6 md:flex-row md:items-center md:px-12">
        <p className="label-mono text-steel">IMAD.A / TORONTO / 2026</p>
        <p className="label-mono text-steel">
          BUILT WITH REACT + GSAP ·{' '}
          <a
            href="https://github.com/ImadCreates/my-portfolio"
            target="_blank"
            rel="noreferrer"
            className="text-bone underline underline-offset-4 transition-colors duration-(--t-fast) ease-settle hover:text-seal"
          >
            SOURCE
          </a>
        </p>
      </div>
    </footer>
  );
}
