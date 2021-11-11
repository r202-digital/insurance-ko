import React from "react";
import { Carousel, Image } from "grommet";
import { Container } from "components/shared/container";
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
} from "components/shared/section";
import { RichText } from "prismic-reactjs";
import { extractText } from "lib/utils";
import { CgChevronDownO } from "react-icons/cg";
import styled from "styled-components";
import { Colors } from "components/shared/colors";

const DownIcon = styled(CgChevronDownO)`
  margin-top: 20px;
`;

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
        <DownIcon size={30} color={Colors.brand} />
      </SectionContainer>
    </Container>
  );
};

export default SectionParagraph;
