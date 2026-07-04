import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { personalInfo } from '../data/portfolioData';
import { useCut } from './CutProvider';
import { lockScroll, scrollToSection } from '../lib/scroll';
import useCopyEmail from '../lib/useCopyEmail';

const SECTIONS = [
  { id: 'record', label: 'GO TO RECORD' },
  { id: 'loadout', label: 'GO TO LOADOUT' },
  { id: 'player', label: 'GO TO THE PLAYER' },
  { id: 'challenge', label: 'GO TO CHALLENGE' },
];

/* Cmd+K / Ctrl+K. Ash surface, hairline border, mono text. */
export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [highlight, setHighlight] = useState(0);
  const inputRef = useRef(null);
  const returnFocusRef = useRef(null);
  const { cutNavigate } = useCut();
  const location = useLocation();
  const { copied, copy } = useCopyEmail();

  const close = useCallback(() => setOpen(false), []);

  const actions = useMemo(() => {
    const jumpTo = (id) => {
      /* Unlock before scrolling: lenis.start() resets in-flight scrolls. */
      lockScroll(false);
      close();
      if (location.pathname !== '/') cutNavigate(`/#${id}`);
      else scrollToSection(id);
    };
    const openLink = (href) => {
      window.open(href, '_blank', 'noopener');
      close();
    };
    return [
      ...SECTIONS.map((s) => ({ key: `go-${s.id}`, label: s.label, run: () => jumpTo(s.id) })),
      { key: 'copy-email', label: copied ? 'COPIED' : 'COPY EMAIL', run: copy },
      { key: 'github', label: 'OPEN GITHUB', run: () => openLink(personalInfo.github) },
      { key: 'resume', label: 'OPEN RESUME', run: () => openLink(personalInfo.resume) },
    ];
  }, [close, location.pathname, cutNavigate, copied, copy]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? actions.filter((a) => a.label.toLowerCase().includes(q)) : actions;
  }, [actions, query]);

  const highlightSafe = Math.min(highlight, Math.max(filtered.length - 1, 0));

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      returnFocusRef.current = document.activeElement;
      setQuery('');
      setHighlight(0);
      lockScroll(true);
      requestAnimationFrame(() => inputRef.current?.focus());
      return;
    }
    lockScroll(false);
    returnFocusRef.current?.focus?.();
  }, [open]);

  if (!open) return null;

  const onInputKey = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlight((h) => (h + 1) % Math.max(filtered.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlight((h) => (h - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filtered[highlightSafe]?.run();
    } else if (e.key === 'Tab') {
      /* The input is the palette's only tab stop. */
      e.preventDefault();
    }
  };

  return (
    <div role="dialog" aria-modal="true" aria-label="Command palette" className="fixed inset-0 z-50">
      <button
        type="button"
        aria-label="Close command palette"
        tabIndex={-1}
        className="absolute inset-0 cursor-default bg-ink/80"
        onClick={close}
      />
      <div className="absolute top-[18vh] left-1/2 w-[min(32rem,calc(100vw-3rem))] -translate-x-1/2 border border-hairline bg-ash">
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setHighlight(0);
          }}
          onKeyDown={onInputKey}
          placeholder="TYPE A COMMAND"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={filtered[highlightSafe] ? `palette-${filtered[highlightSafe].key}` : undefined}
          aria-label="Type a command"
          autoComplete="off"
          spellCheck="false"
          className="label-mono w-full border-b border-hairline bg-transparent px-5 py-4 text-bone outline-none placeholder:text-steel"
        />
        <ul id="palette-list" role="listbox" aria-label="Commands" className="max-h-72 overflow-y-auto py-2">
          {filtered.map((a, i) => (
            <li key={a.key} id={`palette-${a.key}`} role="option" aria-selected={i === highlightSafe}>
              <button
                type="button"
                tabIndex={-1}
                aria-live={a.key === 'copy-email' ? 'polite' : undefined}
                onMouseEnter={() => setHighlight(i)}
                onClick={a.run}
                className={`label-mono w-full cursor-pointer px-5 py-3 text-left transition-colors duration-(--t-fast) ease-settle ${
                  i === highlightSafe ? 'bg-ink text-bone' : 'text-steel'
                }`}
              >
                {a.label}
              </button>
            </li>
          ))}
          {!filtered.length && <li className="label-mono px-5 py-3 text-steel">NO MATCH</li>}
        </ul>
      </div>
    </div>
  );
}
