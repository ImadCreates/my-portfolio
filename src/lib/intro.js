/*
  P3: intro-completion signal. The record strip roll-in and the hero
  name reveal wait for the first-visit loading sequence; on repeat
  visits CutProvider resolves this immediately on mount.
*/
let resolved = false;
const listeners = new Set();

export function introDone() {
  if (resolved) return;
  resolved = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

/* Runs fn once the intro has finished; immediately if it already has.
   Returns an unsubscribe. */
export function onIntroDone(fn) {
  if (resolved) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
