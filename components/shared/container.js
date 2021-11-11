import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";
import { BreakpointQuery } from "components/shared/breakpoints";

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

export default Container;
