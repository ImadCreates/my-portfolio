import { useCallback, useEffect, useRef, useState } from 'react';
import { personalInfo } from '../data/portfolioData';

/* Copies the email and reports "copied" for 1.2s. No toast. */
export default function useCopyEmail() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(() => {
    navigator.clipboard?.writeText(personalInfo.email);
    setCopied(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setCopied(false), 1200);
  }, []);

  return { copied, copy };
}
