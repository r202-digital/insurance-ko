import { createStitches } from "@stitches/react";

export const { styled, css, getCssText } = createStitches({
  media: {
    sm: "(min-width: 0px)",
    md: "(min-width: 768px)",
    lg: "(min-width: 1024px)",
  },
});
