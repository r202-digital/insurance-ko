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
import ProductDetailContext from "components/shared/context/product-detail";
import Cookies from "js-cookie";

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

const StyledTabs = styled(Tabs)`
  margin: 2em;

  &:before {
    content: "Customer Details";
    font-size: 1em;
    font-weight: 700;
    color: ${Colors.brand};
    width: 50%;

    ${BreakpointQuery("lg")`
      font-size: 1.5em;
      width: 70%;
    `}
  }
  & > div {
    &:first-of-type {
      margin-top: -2.5em;
      margin-bottom: 1em;
      align-self: flex-end;

      ${BreakpointQuery("lg")`
        margin-top: -2em;
      `}
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

const CustomerCard = styled(Card)`
  margin: 2em;
  ${BreakpointQuery("lg")`
    margin: 0;
  `}
`;

const CartHeading = styled(SectionHeading)`
  margin: 0;
`;

const PaymentContainer = styled.div`
  padding: 2em;
`;

function CartGrid() {
  const { contextProductDetail: product } = ProductDetailContext.useContainer();
  // console.log(product);
  // const option = Cookies.get("option");
  // console.log(product, option);
  return (
    <GridLayout>
      <CartList />
      <CardGrid>
        <CustomerCard>
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
        </CustomerCard>
        <Card>
          <PaymentContainer>
            <CartHeading>Payment Summary</CartHeading>
          </PaymentContainer>
        </Card>
      </CardGrid>
    </GridLayout>
  );
}

export default CartGrid;
