import React, { useState } from "react";
import styled from "styled-components";
import { Tab, Tabs, Box, Button, Text } from "grommet";
import { Container } from "components/shared/container";
import {
  SectionHeading,
  ParagraphText,
  SectionBg,
  YellowTextButton,
} from "components/shared/section";
import { RichText } from "prismic-reactjs";
import { extractText } from "lib/utils";
import { BreakpointQuery } from "components/shared/breakpoints";
import { Colors } from "components/shared/colors";

const MultitabSectionBg = styled(SectionBg)`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: top left;
  min-height: 100vh;
`;

const ShowcaseText = styled(Text)`
  display: block;
  margin-bottom: 1em;
`;

const SplitSection = styled(Container)`
  display: flex;
  flex-direction: column-reverse;
  margin-top: 1rem;
  ${BreakpointQuery("lg")`
    display: grid;
    grid-template-columns: 60% 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 60px;
    grid-row-gap: 0px;
  `}
`;

const ImageContainer = styled.div`
  display: flex;
`;

const Image = styled.img`
  width: 80%;
  margin: 0 auto;
`;

const SectionButtonContainer = styled.div`
  text-align: initial;
  p {
    margin: 0;
  }
  button {
    padding: 0.3rem 1.5rem;
    margin: 0rem;
    text-align: center;
    background-color: ${Colors.brand};
    color: white;
    border-radius: 1.5rem;
    min-width: 200px;
  }
`;

const SectionButton = styled(YellowTextButton)`
  margin: 20px 0;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  ${BreakpointQuery("lg")`
    align-items: flex-start;
  `}
`;

const ItemContent = styled.div`
  text-align: initial;
  font-size: 0.9rem;

  h4 {
    font-size: 1.25rem;
  }

  ul {
    padding-left: 1.375rem;

    li {
      padding-left: 0.625rem;
      list-style-image: url(check.svg);

      &::marker {
        line-height: 1;
      }
    }
  }
`;

const StyledTabs = styled(Tabs)`
  & > div {
    &:first-of-type {
      display: flex;
      overflow-x: auto;
      flex-wrap: nowrap;
      scroll-snap-type: x mandatory;
      scroll-behavior: smooth;
      -webkit-overflow-scrolling: touch;
      -ms-overflow-style: none;
      scrollbar-width: none;
      justify-content: flex-start;

      &::-webkit-scrollbar {
        display: none;
      }

      ${BreakpointQuery("lg")`
        justify-content: center;
      `}
    }
  }
`;

// const myCustomLink = (type, element, content, children, index) => (
//   <a href={element.data.url}>
//     <SectionButton primary label={content} />
//   </a>
// );

const Milestone = ({ slice }) => {
  const [index, setIndex] = useState(0);
  const onActive = (nextIndex) => setIndex(nextIndex);
  const { primary, items } = slice;
  const heading = extractText(primary.milestone_section_heading);
  const subheading = extractText(primary.milestone_section_subheading);

  return (
    <MultitabSectionBg image={primary?.milestone_background?.url || "/bg.png"}>
      <SectionHeading as="h2" color="brand">{heading}</SectionHeading>
      <ShowcaseText>{subheading}</ShowcaseText>

      {/* <StyledTabs activeIndex={index} onActive={onActive}>
        {items.map((item, index) => (
          <Tab
            key={`${JSON.stringify(item)}-${index}`}
            title={RichText.asText(item.milestone_year)}
          >
            <SplitSection>
              <ContentSection>
                {!!Object.keys(item.milestone_image).length && (
                  <ImageContainer>
                    <Image src={item.milestone_image.url} alt={item.milestone_image.alt} />
                  </ImageContainer>
                )}

                <ItemContent>
                  <ShowcaseText>{item.milestone_heading}</ShowcaseText>
                  <RichText render={item.milestone_body_text} />
                </ItemContent>

                <SectionButtonContainer>
                  <Button>
                    <RichText
                      render={item.tab_button}
                      serializeHyperlink={myCustomLink}
                    />
                  </Button>
                </SectionButtonContainer>
              </ContentSection>
            </SplitSection>
          </Tab>
        ))}
      </StyledTabs> */}
    </MultitabSectionBg>
  );
};

export default Milestone;
