/*
  Geometry for the cut: one diagonal, top-right to bottom-left.
  Shared by the loading sequence, route transitions, and the mobile menu.
*/

export const POLY = {
  /* The two halves of the screen, split along the diagonal. */
  upper: 'polygon(0% 0%, 100% 0%, 0% 100%)',
  lower: 'polygon(100% 0%, 100% 100%, 0% 100%)',
  /* Full coverage and its collapsed-onto-the-diagonal counterpart.
     Same vertex count and order, so clip-path interpolates cleanly. */
  full: 'polygon(100% 0%, 100% 100%, 0% 100%, 0% 0%)',
  diagonal: 'polygon(100% 0%, 100% 0%, 0% 100%, 0% 100%)',
};

/* How far each half must travel along the diagonal's normal to clear the
   viewport completely. */
export function halfShifts() {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const hyp = Math.hypot(w, h);
  const dist = (w * h) / hyp + 2;
  const x = (h / hyp) * dist;
  const y = (w / hyp) * dist;
  return {
    upper: { x: -x, y: -y },
    lower: { x, y },
  };
}
