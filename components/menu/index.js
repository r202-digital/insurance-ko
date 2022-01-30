import React, { useState } from "react";
import { Box, Nav, Layer, Anchor, Button } from "grommet";
import { Colors } from "components/shared/colors";
import Hamburger from "react-hamburgers";
import styled from "styled-components";
import Link from "next/link";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import Router from "next/router";

const HamburgerContainer = styled.div`
  .hamburger {
    padding: 5px;

    &.is-active {
      .hamburger-inner,
      .hamburger-inner:after,
      .hamburger-inner:before {
        background-color: ${Colors.brandDark};
      }

      .hamburger-inner {
        &:before {
          top: 10px;
        }

        &:after {
          top: 20px;
        }
      }
    }
  }

  .hamburger--slider .hamburger-inner {
    top: 8px;
    left: 7px;

    &:before {
      top: 9px;
    }

    &:after {
      top: 18px;
    }
  }

  .hamburger-inner,
  .hamburger-inner:after,
  .hamburger-inner:before {
    width: 25px;
    height: 3px;
    background-color: ${Colors.brandDark};
  }
`;

const StyledNav = styled(Nav)`
  height: calc(100% - 138px);
  justify-content: space-around;
`;

const NavLink = styled(Anchor)`
  padding-top: 1.25rem;
  padding-bottom: 1.25rem;
  font-weight: 600;
  font-size: 1.15rem;
  text-align: center;
`;

const BoxContainer = styled(Box)`
  justify-content: space-between;
  height: calc(100% - 66px);
  font-family: Montserrat;
`;

const BottomBox = styled.div`
  width: 100%;
  background-color: ${Colors.brandDark};
  display: flex;
`;

const BottomButton = styled(Button)`
  flex: 1;
  border-radius: 0;
  border: initial;
  padding: 1.5rem 0;
  color: white;
`;

const Divider = styled.div`
  width: 1px;
  height: calc(100% - 1.75em);
  margin-top: auto;
  margin-bottom: auto;
  background-color: ${Colors.yellowGreen};
`;

const NavCta = styled(Button)`
  padding: 1.25rem 3rem;
  color: ${Colors.lightYellow};
  border-radius: 3rem;
  font-weight: 600;
  font-size: 1rem;
  margin: 0 auto;
`;

const MobileMenu = ({ hasUser, isAdmin }) => {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);
  return (
    <>
      <HamburgerContainer>
        <Hamburger
          active={open}
          type="slider"
          onClick={(e) => {
            e.preventDefault();
            setOpen(!open);
          }}
        />
      </HamburgerContainer>

      {open && (
        <Layer full margin={{ top: "66px" }} position="right" onEsc={onClose}>
          <BoxContainer
            gap="small"
            width={{ min: "medium" }}
            height={{ min: "small" }}
            fill
          >
            <StyledNav direction="column">
              <Link href="/about">
                <NavLink label="About" />
              </Link>
              <Link href="/blog">
                <NavLink label="Blog" />
              </Link>
              <Link href="/claims">
                <NavLink label="Claims" />
              </Link>
              <Link href="/partners">
                <NavLink label="Partners" />
              </Link>
              <Link href="/contact">
                <NavLink label="Contact" />
              </Link>
              <NavCta primary>Get Insured Now!</NavCta>
            </StyledNav>
            <BottomBox>
              {/* <BottomButton
                icon={<FiShoppingCart size="24px" color={Colors.lightYellow} />}
                label="My Cart"
                onClick={() => {}}
              />
              <Divider /> */}
              <BottomButton
                icon={<FiUser size="24px" color={Colors.lightYellow} />}
                label="My Account"
                onClick={(e) => {
                  e.preventDefault();
                  if (hasUser) {
                    if (isAdmin) {
                      Router.push("/admin");
                    } else {
                      Router.push("/profile");
                    }
                  } else {
                    Router.push("/login");
                  }
                }}
              />
            </BottomBox>
          </BoxContainer>
        </Layer>
      )}
    </>
  );
};

export default MobileMenu;
