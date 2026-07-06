/*
  B1: the blade layer's event bus. SlashCanvas emits committed cuts in
  client coordinates; the hero shear, combos, sliceables, and sound all
  subscribe here instead of threading props through routes.
*/
const cutListeners = new Set();

export function onCut(fn) {
  cutListeners.add(fn);
  return () => cutListeners.delete(fn);
}

export function emitCut(line) {
  for (const fn of cutListeners) fn(line);
}
