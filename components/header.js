import { logout } from "utils/auth";
import {
  Anchor,
  Box,
  Header as GrommetHeader,
  Nav,
  Menu,
  ResponsiveContext,
} from "grommet";
import { GrMenu } from "react-icons/gr";
import Link from "next/link";
import styled from "styled-components";
import Container from "components/shared/container";

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
`;

const HeaderContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Header = ({ hasUser }) => (
  <StyledGrommetHeader pad="small">
    <HeaderContainer>
      <Link href="/">
        <Anchor>
          <LogoContainer>
            <Logo src="/logo/logo.svg" alt="InsuranceKo" />
          </LogoContainer>
        </Anchor>
      </Link>
      <ResponsiveContext.Consumer>
        {(responsive) =>
          responsive === "small" ? (
            <Menu
              a11yTitle="Navigation Menu"
              dropProps={{ align: { top: "bottom", right: "right" } }}
              icon={<GrMenu />}
              items={[
                { label: "About", href: "/about" },
                { label: "Login", href: "/login" },
                { label: "Signup", href: "/signup" },
                { label: "Profile", href: "/profile" },
              ]}
            />
          ) : (
            <Nav direction="row">
              <Link href="/about">
                <Anchor label="About" />
              </Link>

              {!hasUser && (
                <Link href="/login">
                  <Anchor label="Login" />
                </Link>
              )}

              {!hasUser && (
                <Link href="/signup">
                  <Anchor label="Signup" />
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
              )}
            </Nav>
          )
        }
      </ResponsiveContext.Consumer>
    </HeaderContainer>
  </StyledGrommetHeader>
);

export default Header;
