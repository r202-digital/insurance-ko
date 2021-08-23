import React from "react";
import { RichText } from "prismic-reactjs";

const Quote = ({ slice }) => (
  <section className="content-section quote">
    <blockquote>{RichText.asText(slice.primary.quote_text)}</blockquote>
  </section>
);

export default Quote;
