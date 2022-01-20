import React from "react";
import { SectionHeading } from "components/shared/section";
import styled from "styled-components";
import { useUser } from "lib/hooks";
import Link from "next/link";
import { IoIosArrowDropleft } from "react-icons/io";
import { BreakpointQuery } from "components/shared/breakpoints";
import { Colors } from "components/shared/colors";
import { Flex } from "components/shared/container";

const CartContainer = styled.div`
  padding: 2em;
`;

const CartListContainer = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ShopLink = styled.a`
  display: none;

  ${BreakpointQuery("lg")`
    display: flex;
    align-items: center;
    color: ${Colors.brand};
    text-transform: uppercase;
    text-decoration: none;
    padding: 0.5em 1em;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 20px;
    font-size: 0.75em;

    span {
      margin-left: 0.5em;
    }
  `}
`;

const ShopFlex = styled(Flex)`
  align-items: center;
`;

const CartHeading = styled(SectionHeading)`
  margin: 0;
  margin-left: 0.75em;
`;

const CartItem = styled.li``;

function CartList() {
  const { user = {} } = useUser();
  console.log(user);
  const { cart = [] } = user;
  return (
    <CartContainer>
      <ShopFlex>
        <Link href="/shop">
          <ShopLink href="/shop">
            <IoIosArrowDropleft size="20px" color={Colors.brand} />
            <span>Back to Shop</span>
          </ShopLink>
        </Link>
        <CartHeading>My Orders</CartHeading>
      </ShopFlex>
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
