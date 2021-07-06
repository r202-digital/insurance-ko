import React from "react";
import { Carousel, Image } from "grommet";
import Container from "../shared/container";
import {
  CarouselContainer,
  CarouselGrid,
  TopRightImage,
  BottomRightImage,
  GridImage,
  SectionContainer,
  SectionHeading,
  HandwrittenText,
  ParagraphText,
} from "../shared/section";
import { RichText } from "prismic-reactjs";
import { extractText } from "lib/utils";

const SectionParagraph = ({ slice }) => {
  const { primary } = slice;
  const { paragraph } = primary;
  const heading = extractText(primary.heading);
  const subheading = extractText(primary.subheading);
  return (
    <Container>
      <SectionContainer>
        <SectionHeading as="h1">{heading}</SectionHeading>
        <HandwrittenText as="h2">{subheading}</HandwrittenText>
        <ParagraphText>
          <RichText render={paragraph} />
        </ParagraphText>
      </SectionContainer>
    </Container>
  );
};

export default SectionParagraph;
