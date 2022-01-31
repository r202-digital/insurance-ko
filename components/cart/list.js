import React from "react";
import { SectionHeading } from "components/shared/section";
import styled from "styled-components";
import { useUser } from "lib/hooks";
import Link from "next/link";
import { IoIosArrowDropleft } from "react-icons/io";
import { BreakpointQuery } from "components/shared/breakpoints";
import { Colors } from "components/shared/colors";
import { Flex } from "components/shared/container";
import { Card } from "grommet";
import ProductDetailContext from "components/shared/context/product-detail";
import Cookies from "js-cookie";
import {
  MdHighlightOff,
  MdCheckCircleOutline,
  MdCheckCircle,
} from "react-icons/md";
import { Box } from "@material-ui/system";
import { Modal, Typography } from "@material-ui/core";

const CartContainer = styled.div`
  padding: 2em;
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
  margin-bottom: 0.5em;
`;

const PaymentContainer = styled.div`
  padding: 2em;
  display: flex;
  flex-direction: column;
`;

const PaymentCard = styled(Card)`
  margin-top: 2em;
  box-shadow: initial;
  background-color: ${Colors.white};
`;

const Checklist = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 0.5em;
`;

const ChecklistItem = styled(({ children, ...props }) => (
  <li>
    <button {...props}>
      {props.done ? (
        <MdCheckCircle size="25px" />
      ) : (
        <MdHighlightOff size="25px" />
      )}
      {children}
    </button>
  </li>
))`
  margin: 1em 0;
  border: 1px solid
    ${({ done = false }) => (done ? Colors.brand : Colors.tagRed)};
  color: ${({ done = false }) => (done ? Colors.brand : Colors.tagRed)};
  padding: 1em;
  border-radius: 20px;
  display: flex;
  width: 100%;
  background: transparent;
  align-items: center;
  font-family: Open Sans;
  cursor: pointer;
  transition: 0.15s all;

  &:hover {
    font-weight: 700;
    background: ${({ done = false }) =>
      done ? Colors.brandGreen[100] : Colors.red[100]};
  }

  & > svg {
    margin-right: 0.5em;
  }
`;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  boxShadow: 24,
  p: 4,
};

function CheckoutProduct() {
  const { contextProductDetail: product } = ProductDetailContext.useContainer();
  const { name } = product;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const option = Cookies.get("option");
  console.log(product, option);

  return (
    <CartContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Terms & Conditions
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
      <ShopFlex>
        <Link href="/shop">
          <ShopLink href="/shop">
            <IoIosArrowDropleft size="20px" color={Colors.brand} />
            <span>Back to Shop</span>
          </ShopLink>
        </Link>
      </ShopFlex>
      <PaymentCard>
        <PaymentContainer>
          <CartHeading>{name}</CartHeading>
          <span>Plan Option: {option}</span>
          <Checklist>
            <ChecklistItem
              onClick={() => {
                handleOpen();
                console.log("sample");
              }}
            >
              Terms & Conditions
            </ChecklistItem>
            <ChecklistItem
              done
              onClick={() => {
                handleOpen();
                console.log("sample");
              }}
            >
              Data Privacy Clause
            </ChecklistItem>
            <ChecklistItem
              onClick={() => {
                handleOpen();
                console.log("sample");
              }}
            >
              Principal
            </ChecklistItem>
            <ChecklistItem
              onClick={() => {
                handleOpen();
                console.log("sample");
              }}
            >
              Dependents
            </ChecklistItem>
          </Checklist>
        </PaymentContainer>
      </PaymentCard>
      {/* <CartListContainer>
        {user &&
          cart.map(() => (
            <CartItem>
              <p>Sample</p>
            </CartItem>
          ))}
      </CartListContainer> */}
    </CartContainer>
  );
}

export default CheckoutProduct;
