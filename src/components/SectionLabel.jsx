/* Section header: mono index plus title. Hierarchy comes from contrast, not size. */
export default function SectionLabel({ id, index, title }) {
  return (
    <h2 id={id} className="label-mono px-6 pb-8 text-steel md:px-12" data-reveal>
      <span aria-hidden="true">{index} · </span>
      {title}
    </h2>
  );
}
