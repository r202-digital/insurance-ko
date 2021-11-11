import { BreakpointQuery } from "components/shared/breakpoints";
import { Colors } from "components/shared/colors";
import { Container } from "components/shared/container";
import { SectionBg, SectionHeading } from "components/shared/section";
import { extractText } from "lib/utils";
import { linkResolver } from "prismic-configuration";
import { RichText } from "prismic-reactjs";
import React from "react";
import { FiChevronRight } from "react-icons/fi";
import styled from "styled-components";

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
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const HighlightItem = styled.li`
  list-style: none;
  flex-shrink: 0;
  width: 75%;
  height: 500px;
  margin-right: 15px;
  border-radius: 10px;
  background: ${Colors.brandDark};
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

  ${BreakpointQuery("lg")`
    width: calc((87.5% / 3) - 30px);
    margin-right: 45px;

  `}
`;

const HighlightImage = styled.img`
  height: 44%;
  object-fit: cover;
`;

const HighlightContent = styled.div`
  padding: 1em 1.5em;
  color: white;

  p {
    font-size: 0.75rem;
    margin: 0;
    margin-bottom: 0.75rem;
    line-height: 1.35;
  }

  h3 {
    margin: 0.5em 0;
    font-size: 1em;
  }

  ${BreakpointQuery("lg")`
    padding: 30px 40px;

    p {
    font-size: 0.875rem;
    margin: 0;
    margin-bottom: 0.75rem;
    line-height: 1.35;
  }

    h3 {
      font-size: initial;
      margin: 1em 0;
    }
  `}
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
`;

const myCustomLink = (type, element, content, children, index) => (
  <HighlightLink href={element.data.url}>
    {content} <FiChevronRight />
  </HighlightLink>
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
          {items.map((item, index) => {
            return (
              <HighlightItem key={`${JSON.stringify(item)}-${index}`}>
                <HighlightImage src={item.image.url || ""} />
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
            );
          })}
        </HighlightList>
      </div>
    </HighlightSectionBg>
  );
};

export default HighlightCarousel;
