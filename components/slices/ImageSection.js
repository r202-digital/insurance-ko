import { BreakpointQuery } from "components/shared/breakpoints";
import { Colors } from "components/shared/colors";
import { Container } from "components/shared/container";
import {
  HandwrittenText,
  ParagraphText,
  SectionBg,
  SectionHeading,
  YellowTextButton,
} from "components/shared/section";
import { extractText } from "lib/utils";
import { RichText } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";

const ImageSectionBg = styled(SectionBg)`
  background-image: url("/image-bg.png");
  padding: ${({ isBig }) => (isBig ? "10em" : "4em")} 0;

  ${({ image }) => {
    return BreakpointQuery("lg")(`background-image: url(${image})`);
  }};
`;

const ShowcaseText = styled(HandwrittenText)`
  margin-bottom: 0.5em;
  margin-top: -0.35em;
  color: ${Colors.lightYellow};
  font-size: 2.5em;

  ${({ isBig }) => {
    const color = isBig ? Colors.brand : Colors.lightgreen;

    return BreakpointQuery("lg")(`
    margin-top: 0;
    font-size: 4em;
    color: ${color};
  `);
  }}
`;

const StyledHeading = styled(SectionHeading)`
  color: white;

  ${BreakpointQuery("lg")(`
    color: ${Colors.brand};
  `)}
`;

const SplitSection = styled(Container)`
  display: initial;
  ${BreakpointQuery("lg")(`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: ${({ isBig }) => (isBig ? "150px" : "60px")};
    grid-row-gap: 0px;
  `)}
`;

const ImageContainer = styled.div`
  height: auto;
  width: 100%;
  padding: 1em;

  ${BreakpointQuery("lg")`
    height: auto;
    width: auto;
    padding: 0;
  `}
`;

const Image = styled.img`
  height: 100%;
  width: 100%;

  ${BreakpointQuery("lg")`
    width: 80%;
    margin-left: auto;
  `}
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

const StyledParagraph = styled(ParagraphText)`
  padding: 0 1em;
  color: white;

  ${BreakpointQuery("lg")`
    color: initial;
  `}
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
          <StyledHeading as="h2">{heading}</StyledHeading>
          <ShowcaseText as="h3" isBig={big_version}>
            {subheading}
          </ShowcaseText>
          <StyledParagraph>
            <RichText render={paragraph} />
          </StyledParagraph>
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
