import theme from "lib/theme";

export const Breakpoint = theme.breakpoints;

export const BreakpointQuery = (breakpoint) => (query) =>
  `@media (min-width: ${Breakpoint[breakpoint]}px) {
    ${query}
  }`;
