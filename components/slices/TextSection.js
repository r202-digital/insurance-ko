import React from "react";
import { RichText } from "prismic-reactjs";

import { linkResolver } from "prismic-configuration";
import { customLink } from "utils/prismicHelpers";

const TextSection = ({ slice }) => {
  const sectionClass = slice.slice_label
    ? `text-section-${slice.slice_label}`
    : "text-section-1col";

  return (
    <section className={`content-section ${sectionClass}`}>
      <RichText
        render={slice.primary.rich_text}
        linkResolver={linkResolver}
        serializeHyperlink={customLink}
      />
    </section>
  );
};

export default TextSection;
