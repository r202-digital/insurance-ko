import { BreakpointQuery } from "components/shared/breakpoints";
import { Colors } from "components/shared/colors";
import React from "react";
import styled from "styled-components";
import CartList from "./list";

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

function CartGrid(props) {
  return (
    <GridLayout>
      <CartList />
      {/* <div>Sample</div> */}
    </GridLayout>
  );
}

export default CartGrid;
