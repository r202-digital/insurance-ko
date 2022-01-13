import { Box, Image, Text, Button } from "grommet";
import styled from "styled-components";
import theme from "lib/theme";
import { breakpoint } from "styled-components-breakpoint";
import { Colors } from "./colors";
import { Typography } from "@material-ui/core";
import { BreakpointQuery } from "components/shared/breakpoints";

export const CarouselContainer = styled(Box)`
  height: 13.6875em;
  width: 100%;

  ${BreakpointQuery("lg")`
    height: 100%;
    overflow: hidden;
    grid-area: 1 / 1 / 3 / 3;
  `}
`;

export const CarouselGrid = styled.div`
  margin-top: 0;
  ${BreakpointQuery("lg")`
    margin-top: 1em;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(2, 21vh);
    grid-column-gap: 12px;
    grid-row-gap: 12px;
  `}
`;

export const TopRightImage = styled.div`
  display: none;
  ${BreakpointQuery("lg")`
    display: initial;
    grid-area: 1 / 3 / 2 / 4;
  `}
`;

export const BottomRightImage = styled.div`
  display: none;
  ${BreakpointQuery("lg")`
  display: initial;
  grid-area: 2 / 3 / 3 / 4;
`}
`;

export const GridImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

export const SectionContainer = styled.div`
  padding: ${({ padding }) => padding || `2.5em 0`};
  text-align: center;
  max-width: 75%;
  margin: 0 auto;
`;

export const SectionHeading = styled(Text)`
  font-size: 1.5em;
  color: ${({ color }) => (color === "white" ? Colors.white : Colors.brand)};
  line-height: 1;
  margin: 0.5em 0;
  margin-top: 0;
  font-weight: bold;
`;

export const HandwrittenText = styled(Text)`
  font-family: RedRock;
  font-size: 4em;
  font-weight: 400;
  color: ${({ color }) =>
    color === "yellow" ? Colors.yellow : Colors.lightgreen};
  line-height: 1;
  margin: 0.2em 0;
`;

export const ParagraphText = styled(Text)`
  font-family: Montserrat;
  font-size: 0.875em;
  line-height: 1;
  margin: 0;

  p {
    font-family: Montserrat;
    font-size: 1em;
    line-height: 24px;
    margin: 0;
  }
`;

export const SectionBg = styled(SectionContainer)`
  margin: 0;
  padding: 5.5em 0;
  max-width: initial;
  ${({ mobileBg, image }) =>
    mobileBg
      ? `
      background: ${mobileBg};

      ${BreakpointQuery("lg")`
      background-image: url(${image});
      background-size: 100% 100%;
      `}
  `
      : `
    background-image: url(${image});
    background-size: 100% 100%;
  `}
`;

export const YellowTextButton = styled(Button)`
  color: yellow;
`;

const BiggerButton = styled(Button)`
  padding: 0.5em 1em;
  border-radius: 1.5em;
  font-weight: bold;
`;

export const PrimaryYellowGreenButton = styled((props) => (
  <BiggerButton primary {...props} />
))`
  background-color: ${Colors.yellowGreen};
  border-color: ${Colors.yellowGreen};
`;

export const SecondaryYellowGreenButton = styled((props) => (
  <BiggerButton secondary {...props} />
))`
  border-color: ${Colors.yellowGreen};
  color: ${Colors.yellowGreen};
`;

export const ModalHeading = styled(Typography)`
  margin-top: ${({ hasMarginTop }) => (hasMarginTop ? "1em" : "")};
  margin-bottom: 1em;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
`;
