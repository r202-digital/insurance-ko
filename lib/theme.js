import { css } from "styled-components";
import { CaretRightFill, CaretDownFill } from "grommet-icons";

const theme = {
  name: "insuranceko-theme",
  rounding: 4,
  spacing: 24,
  defaultMode: "light",
  breakpoints: {
    sm: 0,
    md: 768,
    lg: 1024,
  },
  global: {
    colors: {
      brand: "#259D01",
      brandDark: "#006700",
      brandDarkTwo: "#00790B",
      brandLight: "#7FC622",
      lightGray: "#F5F5F5",
      white: "#FFF",
      yellow: "#ECC31F",
      lightgreen: "#7FC622",
      tagYellow: "#FFB11A",
      tagRed: "#EF4317",
      background: {
        dark: "#111111",
        light: "#FFFFFF",
      },
      "background-back": {
        dark: "#111111",
        light: "#EEEEEE",
      },
      "background-front": {
        dark: "#222222",
        light: "#FFFFFF",
      },
      "background-contrast": {
        dark: "#FFFFFF11",
        light: "#11111111",
      },
      text: {
        dark: "#EEEEEE",
        light: "#333333",
      },
      "text-strong": {
        dark: "#FFFFFF",
        light: "#000000",
      },
      "text-weak": {
        dark: "#CCCCCC",
        light: "#444444",
      },
      "text-xweak": {
        dark: "#999999",
        light: "#666666",
      },
      border: {
        dark: "#444444",
        light: "#CCCCCC",
      },
      control: "brand",
      "active-background": "background-contrast",
      "active-text": "text-strong",
      "selected-background": "brand",
      "selected-text": "text-strong",
      "status-critical": "#FF4040",
      "status-warning": "#FFAA15",
      "status-ok": "#00C781",
      "status-unknown": "#CCCCCC",
      "status-disabled": "#CCCCCC",
      "graph-0": "brand",
      "graph-1": "status-warning",
      focus: "#259D01",
    },
    font: {
      family: "Open Sans",
      size: "16px",
    },
    active: {
      background: "active-background",
      color: "active-text",
    },
    hover: {
      background: "active-background",
      color: "active-text",
    },
    selected: {
      background: "selected-background",
      color: "selected-text",
    },
  },
  tab: {
    active: {
      background: "brand",
      color: "white",
    },
    color: "brand",
    hover: {
      background: "brand",
      color: "white",
    },
    margin: {
      horizontal: "5px",
    },
    pad: {
      top: "8px",
      bottom: "8px",
      horizontal: "small",
    },
    extend: ({ theme }) => css`
      border: 1px solid ${theme.global.colors.brand};
      border-radius: 30px;
      min-width: 150px;
      span {
        font-size: 1rem;
      }
    `,
  },
  formField: {
    border: {
      color: "transparent",
    },
  },
  chart: {},
  diagram: {
    line: {},
  },
  meter: {},
  accordion: {
    icons: {
      collapse: CaretDownFill,
      expand: CaretRightFill,
      color: "#303030",
    },
    border: {
      color: "#fafafa",
      size: "1px",
      style: "solid",
    },
  },
};

export default theme;
