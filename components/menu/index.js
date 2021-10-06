import React, { useState } from "react";
import { Box, Nav, Layer, Anchor } from "grommet";
import { Colors } from "components/shared/colors";
import Hamburger from "react-hamburgers";
import styled from "styled-components";
import Link from "next/link";

const HamburgerContainer = styled.div`
  .hamburger {
    padding: 5px;

    &.is-active {
      .hamburger-inner,
      .hamburger-inner:after,
      .hamburger-inner:before {
        background-color: ${Colors.brandDark};
      }
    }
  }

  .hamburger--slider .hamburger-inner {
    top: 6px;
    left: 5px;
  }

  .hamburger-inner,
  .hamburger-inner:after,
  .hamburger-inner:before {
    width: 28px;
    height: 3px;
    background-color: ${Colors.brandDark};
  }
`;

const NavLink = styled(Anchor)`
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  font-weight: 600;
  font-size: 1.15rem;
  text-align: center;
`;

const MobileMenu = () => {
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
        <Layer full margin={{ top: "68px" }} position="right" onEsc={onClose}>
          <Box
            pad="large"
            gap="small"
            width={{ min: "medium" }}
            height={{ min: "small" }}
            fill
          >
            <Nav direction="column">
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
            </Nav>
          </Box>
        </Layer>
      )}
    </>
  );
};

export default MobileMenu;
