import React from "react";
import styled from "styled-components";
import { Grid, Box, Text } from "grommet";
import { Container } from "components/shared/container";
import {
  SectionHeading,
  HandwrittenText,
  ParagraphText,
  SectionBg,
  YellowTextButton,
} from "components/shared/section";
import { RichText } from "prismic-reactjs";
import { extractText } from "lib/utils";
import { breakpoint } from "styled-components-breakpoint";
import theme from "lib/theme";

const ImageSectionBg = styled(SectionBg)`
  padding: ${({ isBig }) => (isBig ? "10em" : "4em")} 0;
`;

const ShowcaseText = styled(HandwrittenText)`
  margin-bottom: 0.5em;
  color: ${({ isBig }) =>
    isBig ? theme.global.colors.brand : theme.global.colors.green};
`;

const SplitSection = styled(Container)`
  display: initial;
  ${breakpoint("lg")`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: ${({ isBig }) => (isBig ? "150px" : "60px")};
    grid-row-gap: 0px;
  `}
`;

const ImageContainer = styled.div`
  height: 100px;

  ${breakpoint("lg")`
    height: auto;
  `}
`;

const Image = styled.img`
  width: 80%;
  margin-left: auto;
`;

const SectionButtonContainer = styled.div`
  p {
    margin: 0;
  }
`;

const SectionButton = styled(YellowTextButton)`
  margin: 20px 0;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: ${({ isBig }) => (isBig ? "left" : "center")};
`;

const myCustomLink = (type, element, content, children, index) => (
  <a href={element.data.url}>
    <SectionButton primary label={content} />
  </a>
);

const ImageSection = ({ slice }) => {
  const { primary } = slice;
  const { paragraph, image_highlight, big_version } = primary;
  const heading = extractText(primary.heading);
  const subheading = extractText(primary.subheading);

  return (
    <ImageSectionBg
      image={primary.background.url || "/bg.png"}
      isBig={big_version}
    >
      <SplitSection isBig={big_version}>
        <ImageContainer background={primary.background.url || "/bg.png"}>
          {image_highlight && !!Object.keys(image_highlight).length && (
            <Image src={image_highlight.url} alt={image_highlight.alt} />
          )}
        </ImageContainer>
        <ContentSection isBig={big_version}>
          <SectionHeading as="h2" color="green">
            {heading}
          </SectionHeading>
          <ShowcaseText as="h3" isBig={big_version}>
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
        </ContentSection>
      </SplitSection>
    </ImageSectionBg>
  );
};

export default ImageSection;
