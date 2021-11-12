import React from "react";
import { SectionHeading } from "components/shared/section";
import styled from "styled-components";
import { useUser } from "lib/hooks";

const CartContainer = styled.div`
  padding: 1em;
`;

const CartListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CartItem = styled.li``;

function CartList() {
  const { user } = useUser();
  const { cart = [] } = user;
  return (
    <CartContainer>
      <SectionHeading>My Orders</SectionHeading>
      <CartListContainer>
        {user &&
          cart.map(() => (
            <CartItem>
              <p>Sample</p>
            </CartItem>
          ))}
      </CartListContainer>
    </CartContainer>
  );
}

export default CartList;
