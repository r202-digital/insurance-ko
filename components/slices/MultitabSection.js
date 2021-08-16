import React, { useState } from "react";
import styled from "styled-components";
import { Tab, Tabs, Box, Text } from "grommet";
import Container from "components/shared/container";
import {
  SectionHeading,
  ParagraphText,
  SectionBg,
  YellowTextButton,
} from "components/shared/section";
import { RichText } from "prismic-reactjs";
import { extractText } from "lib/utils";

const MultitabSectionBg = styled(SectionBg)`
  padding: 4em 0;
`;

const ShowcaseText = styled(Text)`
  display: block;
  margin-bottom: 1em;
`;

const SplitSection = styled(Container)`
  display: grid;
  grid-template-columns: 60% 1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 60px;
  grid-row-gap: 0px;
  margin-top: 1rem;
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
`;

const SectionButton = styled(YellowTextButton)`
  margin: 20px 0;
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
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

const myCustomLink = (type, element, content, children, index) => (
  <a href={element.data.url}>
    <SectionButton primary label={content} />
  </a>
);

const MultitabSection = ({ slice }) => {
  const [index, setIndex] = useState(0);
  const onActive = (nextIndex) => setIndex(nextIndex);
  const { primary, items } = slice;
  const heading = extractText(primary.heading);
  const subheading = extractText(primary.subheading);

  return (
    <MultitabSectionBg image={primary?.background?.url || "/bg.png"}>
      <SectionHeading as="h2" color="brand">
        {heading}
      </SectionHeading>
      <ShowcaseText>{subheading}</ShowcaseText>

      <Tabs activeIndex={index} onActive={onActive}>
        {items.map((item, index) => (
          <Tab
            key={`${JSON.stringify(item)}-${index}`}
            title={RichText.asText(item.tab_label)}
          >
            <SplitSection>
              <ContentSection>
                <ItemContent>
                  <RichText render={item.tab_content} />
                </ItemContent>
                <SectionButtonContainer>
                  <RichText
                    render={item.tab_button}
                    serializeHyperlink={myCustomLink}
                  />
                </SectionButtonContainer>
              </ContentSection>
              {!!Object.keys(item.tab_image).length && (
                <ImageContainer>
                  <Image src={item.tab_image.url} alt={item.tab_image.alt} />
                </ImageContainer>
              )}
            </SplitSection>
          </Tab>
        ))}
      </Tabs>
    </MultitabSectionBg>
  );
};

export default MultitabSection;
