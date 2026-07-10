import { useEffect } from 'react';

/*
  P6: per-page title and description. An SPA can only patch the live
  document; crawlers that run JS pick these up, everything else gets
  the static defaults in index.html.
*/
export default function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    }
  }, [title, description]);
}
