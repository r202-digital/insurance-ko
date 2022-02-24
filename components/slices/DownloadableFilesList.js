import React from "react";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";
import { linkResolver } from "prismic-configuration";
import { customLink } from "utils/prismicHelpers";

const DownloadableFilesList = ({ slice }) => {
  const sectionClass = slice.slice_label
    ? `text-section-${slice.slice_label}`
    : "text-section-1col";

  const RichTextContainer = styled.div`
    padding: 3rem;
  `;

  return (
    <RichTextContainer>
      <section className={`content-section ${sectionClass}`}>
        <RichText
          render={slice.primary.rich_text}
          linkResolver={linkResolver}
          serializeHyperlink={customLink}
        />
      </section>
    </RichTextContainer>
  );
};

export default DownloadableFilesList;
