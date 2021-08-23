import React from "react";
import styled from "styled-components";
import { Grid, Box, Text } from "grommet";
import Container from "components/shared/container";
import {
  SectionHeading,
  HandwrittenText,
  ParagraphText,
  SectionBg,
  YellowTextButton,
  SectionContainer,
} from "components/shared/section";
import { RichText } from "prismic-reactjs";
import { extractText } from "lib/utils";
import { breakpoint } from "styled-components-breakpoint";
import theme from "lib/theme";

const HighlightSectionBg = styled(SectionContainer)`
  padding: 0;

  ${breakpoint("lg")`
    background-image: url(${({ image }) => image});
    background-size: 100% 100%;
    margin: 0;
    max-width: initial;
    padding: 10em 0;
  `};
`;

const ShowcaseText = styled(HandwrittenText)`
  margin-bottom: 0.5em;
  color: ${theme.global.colors.brand};
`;

const SplitSection = styled(Container)`
  display: initial;
  ${breakpoint("lg")`
    display: flex;
    justify-content: flex-end;
  `}
`;

const Image = styled.img`
  height: 25rem;
  width: 100%;
  margin-left: auto;
  object-fit: cover;
  object-position: left top;

  ${breakpoint("lg")`
    display: none;
  `}
`;

const SectionButtonContainer = styled.div`
  p {
    margin: 0;
  }
`;

const SectionButton = styled(YellowTextButton)`
  margin-top: 2em;
  margin-bottom: 2.5em;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;

  ${breakpoint("lg")`
    width: 40%;
  `}
`;

const HighlightContainer = styled.div`
  background: linear-gradient(
    180deg,
    rgba(127, 198, 34, 1) 0%,
    rgba(244, 240, 51, 1) 100%
  );
`;

const myCustomLink = (type, element, content) => (
  <a href={element.data.url}>
    <SectionButton primary label={content} />
  </a>
);

const HighlightSection = ({ slice }) => {
  const { primary } = slice;
  const { paragraph } = primary;
  const heading = extractText(primary.heading);

  return (
    <HighlightContainer>
      <div>
        <Image
          src={primary.background.url || "/bg.png"}
          alt={primary.background.alt}
        />
      </div>
      <HighlightSectionBg image={primary.background.url || "/bg.png"}>
        <SplitSection>
          <ContentSection>
            <ShowcaseText as="h3">{heading}</ShowcaseText>
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
      </HighlightSectionBg>
    </HighlightContainer>
  );
};

export default HighlightSection;
