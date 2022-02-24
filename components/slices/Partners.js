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

const ShowcaseImage = styled.img`
  width: 100%;
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
    justify-content: center;
    grid-template-columns: repeat(5, minmax(auto, 1fr));
  `}
`;

const ShowcaseText = styled(Text)`
  display: block;
  margin-bottom: 1em;
`;

const Partners = ({ slice }) => {
  const { items, primary } = slice;
  const heading = extractText(primary.partner_heading);
  const subheading = extractText(primary.partner_subheading);

  return (
    <SectionBg>
      <Container>
        <SectionHeading as="h2" color="brand">{heading}</SectionHeading>
        <ShowcaseText>{subheading}</ShowcaseText>
        <GridContainer>
          {items.map((item, index) => {
            const { logo } = item;

            return (
              <Box key={`${JSON.stringify(item)}-${index}`}>
                <ShowcaseImageContainer>
                  <ShowcaseImage src={logo.url} />
                </ShowcaseImageContainer>
              </Box>
            );
          })}
        </GridContainer>
      </Container>
    </SectionBg>
  );
};

export default Partners;