import React from "react";
import styled from "styled-components";
import { Carousel, Image, Grid, Box, Text } from "grommet";
import Container from "components/shared/container";
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
  SectionBg,
} from "components/shared/section";
import { RichText } from "prismic-reactjs";
import { extractText } from "lib/utils";

const ShowcaseImage = styled.img`
  height: 100%;
`;

const ShowcaseImageContainer = styled(Box)`
  align-items: center;
  height: 190px;
  margin-bottom: 0.5em;
`;

const ShowcaseText = styled(HandwrittenText)`
  margin-bottom: 0.5em;
`;

const GridContainer = styled(Grid)`
  margin: 0 6em;
`;

const ItemHeading = styled(Text)`
  text-transform: uppercase;
  color: yellow;
  margin: 0.35em 0;
  margin-bottom: 0.6em;
`;

const ItemParagraph = styled(Text)`
  line-height: 1.75;
`;

const VideoSection = ({ slice }) => {
  const { items, primary } = slice;
  const { paragraph } = primary;
  const heading = extractText(primary.heading);
  const subheading = extractText(primary.subheading);

  return (
    <SectionBg image={primary.background.url || "/bg.png"}>
      <Container>
        <SectionHeading as="h2" color="white">
          {heading}
        </SectionHeading>
        <ShowcaseText as="h3" color="yellow">
          {subheading}
        </ShowcaseText>
        <ParagraphText>
          <RichText render={paragraph} />
        </ParagraphText>
      </Container>
    </SectionBg>
  );
};

export default VideoSection;
