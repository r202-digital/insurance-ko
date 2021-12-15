import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";
import { BreakpointQuery } from "components/shared/breakpoints";
import { Colors } from "./colors";
import { Button } from "grommet";

export const Container = styled.div`
  max-width: 87.5%;
  width: 100%;
  margin: 0 auto;
  p, h1: {
    word-break: break-all;
  }
`;

export const DesktopContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  p, h1: {
    word-break: break-all;
  }

  ${BreakpointQuery("lg")`
    max-width: 87.5%;
  `}
`;

export const Flex = styled.div`
  display: flex;
`;

export const MobileOnly = styled.div`
  ${BreakpointQuery("lg")`
    display: none;
  `}
`;

export const DesktopOnly = styled.div`
  display: none;

  ${BreakpointQuery("lg")`
    display: initial;
  `}
`;

export const SubmitButton = styled(Button)`
  padding: 0.75em 2.5em;
  border-radius: 2em;
  background-color: ${Colors.yellowGreen};
`;

export default Container;
