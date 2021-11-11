import { Breakpoint, BreakpointQuery } from "components/shared/breakpoints";
import { Container } from "components/shared/container";
import {
  HandwrittenText,
  SectionBg,
  SectionHeading,
} from "components/shared/section";
import { Box, Grid, Text } from "grommet";
import { extractText } from "lib/utils";
import React from "react";
import styled from "styled-components";

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

const GridContainer = styled(Box)`
  & > div {
    margin-bottom: 3em;
  }

  ${BreakpointQuery("md")`
    margin: 0 6em;
    margin-bottom: 0;
    display: grid;
    box-sizing: border-box;
    grid-template-columns: repeat(3, minmax(auto, 1fr));
    grid-gap: 48px 48px;
  `}
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

const ShowcaseGrid = ({ slice }) => {
  const { items, primary } = slice;
  const heading = extractText(primary.heading);
  const subheading = extractText(primary.subheading);

  return (
    <SectionBg image={primary.background.url || "/section-bg.png"}>
      <Container>
        <SectionHeading as="h2" color="white">
          {heading}
        </SectionHeading>
        <ShowcaseText as="h3" color="yellow">
          {subheading}
        </ShowcaseText>
        <GridContainer>
          {items.map((item, index) => {
            const { image } = item;
            const itemHeading = extractText(item.item_heading);
            const itemParagraph = extractText(item.item_paragraph);

            return (
              <Box key={`${JSON.stringify(item)}-${index}`}>
                <ShowcaseImageContainer>
                  <ShowcaseImage src={image.url} />
                </ShowcaseImageContainer>
                <ItemHeading as="h3" margin="0.5em 0">
                  {itemHeading}
                </ItemHeading>
                <ItemParagraph size="small" color="white">
                  {itemParagraph}
                </ItemParagraph>
              </Box>
            );
          })}
        </GridContainer>
      </Container>
    </SectionBg>
  );
};

export default ShowcaseGrid;
