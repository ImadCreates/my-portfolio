/* Section header: mono index above a display-face title. */
export default function SectionLabel({ id, index, title }) {
  return (
    <div className="px-6 pb-10 md:px-12" data-reveal>
      <p aria-hidden="true" className="label-mono text-steel">
        {index}
      </p>
      <h2 id={id} className="display-face mt-2 text-heading text-bone">
        {title}
      </h2>
    </div>
  );
}
