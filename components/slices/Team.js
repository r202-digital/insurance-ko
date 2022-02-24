import { Breakpoint, BreakpointQuery } from "components/shared/breakpoints";
import { Container } from "components/shared/container";
import {
  SectionBg,
  SectionHeading,
} from "components/shared/section";
import { Box, Text } from "grommet";
import { extractText } from "lib/utils";
import React from "react";
import styled from "styled-components";

const TeamSectionBg = styled(SectionBg)`
  background: green;
`;

const ShowcaseImage = styled.img`
  width: 60%;
`;

const ShowcaseImageContainer = styled(Box)`
  align-items: center;
`;

const GridContainer = styled(Box)`
  text-align: center;

  & > div {
    padding: 0 2rem;
  }

  ${BreakpointQuery("md")`
    margin: 0;
    display: grid;
    box-sizing: border-box;
    grid-auto-columns: 25%;
    grid-auto-flow: column;
    justify-content: center;
  `}
`;

const Heading = styled(SectionHeading)`
  color: white;
  margin-bottom: 2em;
`;

const ItemHeading = styled(Text)`
  text-transform: uppercase;
  color: yellow;
  margin: 0.5em 0 0 0;
`;

const ItemSubheading = styled(Text)`
  text-transform: uppercase;
  color: white;
  margin: 0 0 1em 0;
`;

const ItemParagraph = styled(Text)`
  line-height: 1.75;
  color: white;
`;

const Team = ({ slice }) => {
  const { items, primary } = slice;
  const heading = extractText(primary.team_name);

  return (
    <TeamSectionBg>
      <Container>
        <Heading as="h1">
          {heading}
        </Heading>
        <GridContainer>
          {items.map((item, index) => {
            const { member_image } = item;
            const itemHeading = extractText(item.member_name);
            const itemSubheading = extractText(item.member_position);
            const itemParagraph = extractText(item.member_description);

            return (
              <Box key={`${JSON.stringify(item)}-${index}`}>
                <ShowcaseImageContainer>
                  <ShowcaseImage src={member_image.url} />
                </ShowcaseImageContainer>
                <ItemHeading as="h3">
                  {itemHeading}
                </ItemHeading>
                <ItemSubheading as="h5">
                  {itemSubheading}
                </ItemSubheading>
                <ItemParagraph size="small">
                  {itemParagraph}
                </ItemParagraph>
              </Box>
            );
          })}
        </GridContainer>
      </Container>
    </TeamSectionBg>
  );
};

export default Team;