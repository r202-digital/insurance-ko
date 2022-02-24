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
import { CgChevronDownO } from "react-icons/cg";
import React from "react";
import styled from "styled-components";

const ImageSectionBg = styled(SectionBg)`
  background-image: url("/image-bg.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: 100% 0;
  
  ${({ image }) => {
    return BreakpointQuery("lg")(`background-image: url(${image})`);
  }};
`;

const ShowcaseText = styled(HandwrittenText)`
  margin-bottom: 0.5em;
  margin-top: -0.35em;
  color: ${Colors.lightYellow};
  font-size: 2.5em;
  text-align: ${({ isBig }) => (isBig ? "center" : "left")};

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
  text-align: center;
  text-align: ${({ isBig }) => (isBig ? "center" : "left")};

  ${BreakpointQuery("lg")(`
    color: ${Colors.brand};
  `)}
`;

const SplitSection = styled(Container)`
  display: initial;
  max-width: 100%;

  ${BreakpointQuery("lg")(`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: 1fr;
    grid-row-gap: 0px;
  `)}
`;

const ImageContainer = styled.div`
  height: auto;
  width: 100%;

  ${BreakpointQuery("lg")`
    height: auto;
    width: auto;
    padding: 0;
  `}
`;

const Image = styled.img`
  height: auto;
  width: 70%;
  position: absolute;
  bottom: -5em;
  right: 0;
`;

const SectionButton = styled(YellowTextButton)`
  margin: 20px 0;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: ${({ isBig }) => (isBig ? "center" : "left")};
  padding: 0 0 0 6rem;
`;

const StyledParagraph = styled(ParagraphText)`
  color: white;
  p {
    margin-bottom: 1rem;
  }

  ${BreakpointQuery("lg")`
    color: initial;
  `}
`;

const myCustomLink = (type, element, content, children, index) => (
  <a href={element.data.url}>
    <SectionButton primary label={content} />
  </a>
);

const DownIcon = styled(CgChevronDownO)`
  margin-top: 20px;
`;

const AboutHero = ({ slice }) => {
  const { primary } = slice;
  const { hero_body_text, hero_image } = primary;
  const headingTop = extractText(primary.hero_heading_1);
  const headingBottom = extractText(primary.hero_heading_2);

  return (
    <ImageSectionBg
      image={primary.hero_background_image.url || "/bg.png"}
    >
      <SplitSection>
        <ContentSection>
          <StyledHeading as="h3">{headingTop}</StyledHeading>
          <ShowcaseText as="h1">
            {headingBottom}
          </ShowcaseText>
          <StyledParagraph>
            <RichText render={hero_body_text} />
          </StyledParagraph>
          <DownIcon size={30} color={Colors.brand} />
        </ContentSection>

        <ImageContainer>
          {hero_image && !!Object.keys(hero_image).length && (
            <Image src={hero_image.url} alt={hero_image.alt} />
          )}
        </ImageContainer>
      </SplitSection>
    </ImageSectionBg>
  );
};

export default AboutHero;
