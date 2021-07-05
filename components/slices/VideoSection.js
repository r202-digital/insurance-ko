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
  YellowTextButton,
} from "components/shared/section";
import { RichText } from "prismic-reactjs";
import { extractText } from "lib/utils";
import parse from "react-html-parser";

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

const SplitSection = styled(Container)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 60px;
  grid-row-gap: 0px;
`;

const VideoContainer = styled.div`
  iframe {
    width: 100%;
    height: 100%;
  }
`;

const SectionButtonContainer = styled.div`
  p {
    margin: 0;
  }
`;

const SectionButton = styled(YellowTextButton)`
  margin: 20px 0;
`;

const myCustomLink = (type, element, content, children, index) => (
  <a href={element.data.url}>
    <SectionButton primary label={content} />
  </a>
);

const VideoSection = ({ slice }) => {
  const { items, primary } = slice;
  const { paragraph, video } = primary;
  const heading = extractText(primary.heading);
  const subheading = extractText(primary.subheading);

  console.log(primary);

  return (
    <SectionBg image={primary.background.url || "/bg.png"}>
      <SplitSection>
        <VideoContainer>{parse(video.html)}</VideoContainer>
        <div>
          <SectionHeading as="h2" color="green">
            {heading}
          </SectionHeading>
          <ShowcaseText as="h3" color="brand">
            {subheading}
          </ShowcaseText>
          <ParagraphText>
            <RichText render={paragraph} />
          </ParagraphText>
          <SectionButtonContainer>
            <RichText
              render={primary.button}
              serializeHyperlink={myCustomLink}
            />
          </SectionButtonContainer>
        </div>
      </SplitSection>
    </SectionBg>
  );
};

export default VideoSection;
