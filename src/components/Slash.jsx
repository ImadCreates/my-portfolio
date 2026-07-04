/*
  Concept doc section 8: text plus a small diagonal tick. On hover the
  tick extends into a short slash. Parent supplies the group class.
*/
export default function Slash() {
  return (
    <span aria-hidden="true" className="relative inline-block h-3 w-3.5 shrink-0">
      <span className="absolute top-1/2 left-0 h-px w-2 origin-left -translate-y-1/2 -rotate-45 bg-current transition-[width] duration-(--t-fast) ease-cut group-hover:w-3.5 group-focus-visible:w-3.5" />
    </span>
  );
}
