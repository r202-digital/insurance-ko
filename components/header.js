import React, { useEffect } from "react";
import { Container } from "components/shared/container";
import {
  Anchor,
  Box,
  Button,
  Header as GrommetHeader,
  Menu,
  Nav,
  ResponsiveContext,
} from "grommet";
import Link from "next/link";
import Router from "next/router";
import { FiSearch, FiShoppingCart, FiUser } from "react-icons/fi";
// import { GrMenu } from "react-icons/gr";
import styled from "styled-components";
import { Colors } from "./shared/colors";
import MobileMenu from "./menu";

const LogoContainer = styled(Box)`
  height: 56px;
`;

const Logo = styled.img`
  height: 100%;
`;

const StyledGrommetHeader = styled(GrommetHeader)`
  position: sticky;
  top: 0;
  box-shadow: 0px -4px 8px 0px #000000;
  z-index: 1;
  background-color: white;
  padding-left: 0;
  padding-right: 0;
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Anchor)`
  margin-bottom: 5px;
  font-weight: 600;
  font-size: 0.875rem;
`;

const StyledNav = styled(Nav)`
  margin-left: 2rem;
`;

const RightNav = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 0.5em;
  grid-row-gap: 0px;
`;

const NavCta = styled(Button)`
  padding: 0.5rem 1.5rem;
  color: ${Colors.lightYellow};
  border-radius: 1.5rem;
  font-size: 0.875rem;
`;

const ResponsiveDesktop = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: initial;
  }
`;

const ResponsiveMobile = styled.div`
  @media (min-width: 768px) {
    display: none;
  }
`;

const Header = ({ hasUser, user }) => {
  useEffect(() => {
    Router.prefetch("/admin");
    Router.prefetch("/profile");
    Router.prefetch("/login");
  }, []);

  const isAdmin = hasUser && user.role === "admin";

  return (
    <StyledGrommetHeader pad="small">
      <HeaderContainer>
        <Flex>
          <Link href="/">
            <Anchor>
              <LogoContainer>
                <Logo src="/logo/logo.svg" alt="InsuranceKo" />
              </LogoContainer>
            </Anchor>
          </Link>
          <ResponsiveDesktop>
            <StyledNav direction="row">
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
            </StyledNav>
          </ResponsiveDesktop>
        </Flex>
        <ResponsiveMobile>
          <MobileMenu hasUser={hasUser} isAdmin={isAdmin} />
        </ResponsiveMobile>
        <ResponsiveDesktop>
          <RightNav>
            <Button
              icon={<FiSearch size="16px" color={Colors.brand} />}
              onClick={() => {}}
            />
            <Button
              icon={<FiShoppingCart size="16px" color={Colors.brand} />}
              onClick={() => {}}
            />
            <Button
              icon={<FiUser size="16px" color={Colors.brand} />}
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
            <NavCta primary>Get Insured Now!</NavCta>
            {/* <Link href="/about">
                  <Anchor label="About" />
                </Link> */}

            {/* {!hasUser && (
                  <Link href="/login">
                    <Anchor label="Login" />
                  </Link>
                )}

                {hasUser && (
                  <Link href="/profile">
                    <Anchor label="Profile" />
                  </Link>
                )}
                {hasUser && (
                  <Anchor
                    onClick={(e) => {
                      e.preventDefault();
                      logout();
                    }}
                    label="Logout"
                  />
                )} */}
          </RightNav>
        </ResponsiveDesktop>
      </HeaderContainer>
    </StyledGrommetHeader>
  );
};

export default Header;
