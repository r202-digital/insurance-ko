import LoginForm from "components/forms/login";
import SignupForm from "components/forms/signup";
import { BreakpointQuery } from "components/shared/breakpoints";
import { Colors } from "components/shared/colors";
import { SectionHeading } from "components/shared/section";
import { Box, Grommet, Tab, Tabs, Text } from "grommet";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import React from "react";
import styled from "styled-components";
import CartList from "./list";

const customTheme = {
  global: {
    font: {
      family: "Open Sans",
      size: "16px",
    },
    input: {
      weight: 400,
    },
    colors: Colors,
  },
  tabs: {
    header: {
      extend: () => `
        justify-content: flex-start;
        border-radius: 20px;
        padding: 2px;
        border: 1px solid ${Colors.borderGray};
        color: ${Colors.titleGray};
      `,
    },
  },
  tab: {
    active: {
      background: Colors.lightgreen,
      color: "accent-1",
    },
    border: undefined,
    color: "white",
    hover: {
      background: "dark-1",
    },
    margin: undefined,
    pad: {
      bottom: undefined,
      horizontal: "small",
    },
    extend: () => `
      border-radius: 20px;
      transition: 0.3s;

      &:hover {
        background: ${Colors.brand};
      }
    `,
  },
  formField: {
    label: {
      color: "dark-3",
      size: "small",
      margin: "xsmall",
      weight: 600,
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: true,
      },
    },
    border: undefined,
    content: {
      pad: "small",
    },
    error: {
      background: {
        color: "status-critical",
        opacity: "weak",
      },
    },
    margin: "none",
    extend: () => `
      input {
        border-radius: 20px;
        background-color: white;
      }
    `,
  },
};

const GridLayout = styled.div`
  flex: 1;

  & > div {
    &:first-of-type {
      border-right: 1px solid ${Colors.borderGray};
    }
  }
  ${BreakpointQuery("lg")`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `}
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-row-gap: 1.5em;
  ${BreakpointQuery("lg")`
    padding: 2em;
  `}
`;

const Card = styled.div`
  border-radius: 1em;
  background-color: white;
`;

const DarkHeading = styled(SectionHeading, {
  color: Colors.brandDark,
  fontSize: "1.75em",
  marginTop: "1.5em",
});

const StyledTabs = styled(Tabs)`
  margin: 2em;

  &:before {
    content: "Customer Details";
    font-size: 1.5em;
    font-weight: 700;
    color: ${Colors.brand};
  }
  & > div {
    &:first-of-type {
      margin-top: -2em;
      margin-bottom: 1em;
      align-self: flex-end;
    }
  }
`;

const RichTabTitle = ({ label }) => (
  <Box direction="row" align="center" gap="xsmall" margin="xsmall">
    <Text size="small">
      <strong>{label}</strong>
    </Text>
  </Box>
);

function CartGrid(props) {
  return (
    <GridLayout>
      <CartList />
      <CardGrid>
        <Card>
          <Grommet theme={deepMerge(grommet, customTheme)}>
            <StyledTabs>
              <Tab title={<RichTabTitle label="Sign in" />}>
                {/* <DarkHeading as="h2">Lorem Ipsum Dolor!</DarkHeading>
                <Text size="small">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod.
                </Text> */}
                <LoginForm />
              </Tab>
              <Tab title={<RichTabTitle label="Sign up" />}>
                <SignupForm />
              </Tab>
            </StyledTabs>
          </Grommet>
        </Card>
        <Card>
          <h1>Payment Summary</h1>
        </Card>
      </CardGrid>
    </GridLayout>
  );
}

export default CartGrid;
