import React from "react";
import { SectionHeading } from "components/shared/section";
import styled from "styled-components";

const CartContainer = styled.div`
  padding: 1em;
`;

const CartListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CartItem = styled.li``;

function CartList(props) {
  return (
    <CartContainer>
      <SectionHeading>My Orders</SectionHeading>
      <CartListContainer>
        <CartItem>
          <p>Sample</p>
        </CartItem>
      </CartListContainer>
    </CartContainer>
  );
}

export default CartList;
