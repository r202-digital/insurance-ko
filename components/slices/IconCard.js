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
  width: auto;
`;

const ShowcaseImageContainer = styled(Box)`
  align-items: center;
`;

const GridContainer = styled(Box)`
  text-align: center;

  & > div {
    padding: 10rem;
  }

  ${BreakpointQuery("md")`
    margin: 0;
    display: grid;
    box-sizing: border-box;
    grid-template-columns: repeat(2, minmax(auto, 1fr));
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

const IconCard = ({ slice }) => {
  const { items, primary } = slice;
  const heading = extractText(primary.heading);
  const subheading = extractText(primary.subheading);

  return (
    <GridContainer>
      {items.map((item, index) => {
        const { card_image } = item;
        const itemHeading = extractText(item.card_title);
        const itemSubheading = extractText(item.card_subheading);
        const itemParagraph = extractText(item.card_body_text);

        return (
          <Box key={`${JSON.stringify(item)}-${index}`}>
            <ShowcaseImageContainer>
              <ShowcaseImage src={card_image.url} />
            </ShowcaseImageContainer>
            <ItemHeading as="h3" margin="0.5em 0">
              {itemHeading}
            </ItemHeading>
            <ItemHeading as="h5" margin="0.5em 0">
              {itemSubheading}
            </ItemHeading>
            <ItemParagraph size="small">
              {itemParagraph}
            </ItemParagraph>
          </Box>
        );
      })}
    </GridContainer>
  );
};

export default IconCard;