import { useRef } from 'react';
import useLineReveal from '../lib/useLineReveal';

/* Section header lockup: mono index top-left of a display-face title.
   The index keeps the block rise; the title reveals through a line
   mask (P3). The ghost numeral behind is unchanged. */
export default function SectionLabel({ id, index, title }) {
  const titleRef = useRef(null);
  useLineReveal(titleRef);

  return (
    <div className="px-6 pb-8 md:px-12">
      <p aria-hidden="true" className="label-mono text-steel" data-reveal>
        {index}
      </p>
      <h2 id={id} ref={titleRef} className="display-face mt-2 text-section text-bone">
        {title}
      </h2>
    </div>
  );
}
