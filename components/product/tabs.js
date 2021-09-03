import React from "react";
import styled, { css } from "styled-components";

import { Box, Grommet, FormField, Tab, Tabs, Text, TextInput } from "grommet";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import { Colors } from "components/shared/colors";
import VariantContext from "./context";

const RichTabTitle = ({ icon, label }) => (
  <Box direction="row" align="center" gap="xsmall" margin="xsmall">
    {icon}
    <Text size="small">
      <strong>{label}</strong>
    </Text>
  </Box>
);

const customTheme = deepMerge(grommet, {
  global: {
    edgeSize: {
      small: "10px",
    },
    elevation: {
      light: {
        small: "0px 1px 5px rgba(0, 0, 0, 0.50)",
        medium: "0px 3px 8px rgba(0, 0, 0, 0.50)",
      },
    },
    font: {
      family: "Open Sans",
      size: "16px",
    },
  },
  tab: {
    active: {
      background: "white",
    },
    background: "white",
    border: undefined,
    // color: "#259D01",
    hover: {
      background: "white",
      color: "#259D01",
    },
    margin: undefined,
    pad: {
      top: "1em",
      bottom: "1em",
      horizontal: "1.5em",
    },
  },
  tabs: {
    background: "transparent",
    gap: "medium",
    header: {
      background: "white",
      extend: ({ theme }) => css`
        justify-content: flex-start;
        margin-bottom: 1em;
        flex-wrap: nowrap;
        overflow-x: scroll;
        scroll-snap-type: x mandatory;
        scroll-behavior: smooth;
        -webkit-overflow-scrolling: touch;
        -ms-overflow-style: none;
        scrollbar-width: none;

        &::-webkit-scrollbar {
          display: none;
        }

        & > div {
          display: none;
        }

        & > button {
          div {
            margin: 0;
          }
          strong {
            font-size: 1.25em;
            font-weight: normal;
          }
        }

        & > button[aria-expanded="true"] {
          position: relative;
          &:before {
            content: "";
            position: absolute;
            width: 10px;
            height: 5px;
            background-color: ${Colors.brandLight};
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border-top-left-radius: 6px;
            border-top-right-radius: 6px;
          }
          div {
            color: ${Colors.brandDarkTwo};

            strong {
              font-weight: bold;
            }
          }
        }
      `,
    },
    panel: {
      extend: ({ theme }) => css`
        padding: 48px;
        background-color: white;
      `,
    },
  },
});

const StyledGrommet = styled(Grommet)`
  margin-top: 1em;
  background-color: transparent;
`;

const ProductTabs = ({ product }) => {
  // console.log(product)
  const variantContext = VariantContext.useContainer();
  const { planOptions } = product;
  const onActive = (nextIndex) => {
    variantContext.setContextVariant(nextIndex);
  };
  return (
    <StyledGrommet theme={customTheme}>
      <Tabs
        activeIndex={variantContext.contextVariant}
        onActive={onActive}
        flex
      >
        {planOptions.map((option) => {
          return (
            <Tab title={<RichTabTitle label={option.name} />}>
              {option.description}
            </Tab>
          );
        })}
      </Tabs>
    </StyledGrommet>
  );
};

export default ProductTabs;
