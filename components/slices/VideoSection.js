import React from "react";
import styled from "styled-components";
import { Carousel, Image, Grid, Box, Text } from "grommet";
import {
  Container,
  MobileOnly,
  DesktopOnly,
} from "components/shared/container";
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
import { BreakpointQuery } from "components/shared/breakpoints";
import { Colors } from "components/shared/colors";

const ShowcaseText = styled(HandwrittenText)`
  margin-bottom: 0.5em;
`;

const MobileShowcaseText = styled(HandwrittenText)`
  margin-bottom: 1em;
  margin-top: -0.25em;
  font-size: 2rem;
`;

const SplitSection = styled(Container)`
  ${BreakpointQuery("lg")`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 60px;
    grid-row-gap: 0px;
  `}
`;

const VideoContainer = styled.div`
  margin-bottom: 1em;
  iframe {
    min-height: 200px;
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

const SectionText = styled(ParagraphText)`
  color: white;

  ${BreakpointQuery("lg")`
    color: ${Colors.text.light};
  `}
`;

const myCustomLink = (type, element, content, children, index) => (
  <a href={element.data.url}>
    <SectionButton primary label={content} />
  </a>
);

const VideoSection = ({ slice }) => {
  const { primary } = slice;
  const { paragraph, video } = primary;
  const heading = extractText(primary.heading);
  const subheading = extractText(primary.subheading);

  return (
    <SectionBg
      mobileBg={Colors.brandDarkThree}
      image={primary.background.url || "/bg.png"}
    >
      <MobileOnly>
        <SectionHeading as="h2" color="white">
          {heading}
        </SectionHeading>
        <MobileShowcaseText as="h3" color="yellow">
          {subheading}
        </MobileShowcaseText>
      </MobileOnly>
      <SplitSection>
        <VideoContainer>{parse(video.html)}</VideoContainer>
        <div>
          <DesktopOnly>
            <SectionHeading as="h2" color="green">
              {heading}
            </SectionHeading>
            <ShowcaseText as="h3" color="brand">
              {subheading}
            </ShowcaseText>
          </DesktopOnly>
          <SectionText>
            <RichText render={paragraph} />
          </SectionText>
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
