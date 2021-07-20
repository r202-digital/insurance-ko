import React from "react";
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
import { FiChevronRight } from 'react-icons/fi'
import theme from "lib/theme";
import { linkResolver } from "prismic-configuration";

const HighlightSectionBg = styled(SectionBg)`
  padding: 4em 0;
  text-align: initial;
`;

const HighlightList = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
`;

const HighlightItem = styled.li`
  list-style: none;
  flex-shrink: 0;
  width: calc((87.5% / 3) - 30px);
  height: 500px;
  margin-right: 45px;
  border-radius: 10px;
  background: #006700;
  transform-origin: center center;
  transform: scale(1);
  transition: transform 0.5s;
  position: relative;
  overflow: hidden;
  
  display: flex;
  flex-direction: column;

  &:first-child {
    margin-left: 6.25%;
  }
`;

const HighlightImage = styled.img`
  height: 44%;
  object-fit: cover
`

const HighlightContent = styled.div`
  padding: 30px 40px;
  color: white;

  p {
    font-size: 0.875rem;
    margin: 0;
    margin-bottom: 0.75rem;
    line-height: 1.35;
  }

  h3 {
    margin: 1rem 0;
  }
`;  

const HighlightLink = styled.a`
  color: white;
  display: flex;
  font-size: 0.875rem;
  text-decoration: none;
  align-items: center;
  font-weight: 700;
`;

const CarouselHeading = styled(SectionHeading)`
  margin-bottom: 2rem;
`

const myCustomLink = (type, element, content, children, index) => (
  <HighlightLink href={element.data.url}>{content} <FiChevronRight /></HighlightLink>
);

const HighlightCarousel = ({ slice }) => {
  const { primary, items } = slice;
  const title = extractText(primary.title);

  return (
    <HighlightSectionBg>
      <Container>
        <CarouselHeading as="h2" color="brand">
          {title}
        </CarouselHeading>
      </Container>
      <div>
        <HighlightList>
          {
            items.map((item) => {
              console.log(item);
              return (
                <HighlightItem key={JSON.stringify(item)}>
                  <HighlightImage src={item.image.url || ''} />
                  <HighlightContent>
                    <p>{RichText.asText(item.date)}</p>
                    <h3>{RichText.asText(item.highlight_title)}</h3>
                    <RichText render={item.content} linkResolver={linkResolver} />
                    <RichText
                      render={item.highlight_link}
                      serializeHyperlink={myCustomLink}
                    />
                  </HighlightContent>
                </HighlightItem>
              )
            })
          }
        </HighlightList>
      </div>
    </HighlightSectionBg>
  );
};

export default HighlightCarousel;
