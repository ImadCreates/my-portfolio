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

/* B2 geometry. Lines are client-coordinate segments {x1,y1,x2,y2}. */

function orient(ax, ay, bx, by, cx, cy) {
  return Math.sign((bx - ax) * (cy - ay) - (by - ay) * (cx - ax));
}

function segmentsCross(a, b, c, d, p, q, r, s) {
  const o1 = orient(a, b, c, d, p, q);
  const o2 = orient(a, b, c, d, r, s);
  const o3 = orient(p, q, r, s, a, b);
  const o4 = orient(p, q, r, s, c, d);
  return o1 !== o2 && o3 !== o4;
}

export function segmentIntersectsRect(line, rect) {
  const { x1, y1, x2, y2 } = line;
  const inside = (x, y) => x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  if (inside(x1, y1) || inside(x2, y2)) return true;
  const edges = [
    [rect.left, rect.top, rect.right, rect.top],
    [rect.right, rect.top, rect.right, rect.bottom],
    [rect.right, rect.bottom, rect.left, rect.bottom],
    [rect.left, rect.bottom, rect.left, rect.top],
  ];
  return edges.some(([a, b, c, d]) => segmentsCross(x1, y1, x2, y2, a, b, c, d));
}

/* Two half-plane clip polygons along the cut, in element-local px,
   plus the cut's unit normal for the split translation. Works at any
   angle: a huge quad on each side of the line. */
export function splitClipPaths(line, rect) {
  const px = line.x1 - rect.left;
  const py = line.y1 - rect.top;
  const dx = line.x2 - line.x1;
  const dy = line.y2 - line.y1;
  const len = Math.hypot(dx, dy) || 1;
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy;
  const ny = ux;
  const R = 8000;
  const ax = px - ux * R;
  const ay = py - uy * R;
  const bx = px + ux * R;
  const by = py + uy * R;
  const quad = (s) =>
    `polygon(${ax}px ${ay}px, ${bx}px ${by}px, ${bx + s * nx * R}px ${by + s * ny * R}px, ${ax + s * nx * R}px ${ay + s * ny * R}px)`;
  return { a: quad(1), b: quad(-1), nx, ny };
}
