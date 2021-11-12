import { BreakpointQuery } from "components/shared/breakpoints";
import React from "react";
import styled from "styled-components";
import CartList from "./list";

const GridLayout = styled.div`
  ${BreakpointQuery("lg")`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `}
`;

function CartGrid(props) {
  return (
    <GridLayout>
      <CartList />
    </GridLayout>
  );
}

export default CartGrid;
