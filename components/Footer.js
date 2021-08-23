import React from "react";
import styled from "styled-components";
import theme from "lib/theme";
import { breakpoint } from "styled-components-breakpoint";
import { Anchor } from "grommet";
import Link from "next/link";

const Logo = styled.img`
  height: 100%;
`;

const LogoContainer = styled.div`
  height: 80px;
  margin-bottom: 2rem;

  ${breakpoint("lg")`
    height: 56px;
  `}
`;

const FooterContainer = styled.footer`
  background-color: ${theme.global.colors.brandDarkTwo};
  padding: 1.5rem 3rem;
  color: white;

  ${breakpoint("lg")`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 0px;
  `}
`;

const HalfDivider = styled.div`
  display: initial;
  ${breakpoint("lg")`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  `}
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-bottom: 2em;
`;

const DesktopOnly = styled.div`
  display: none;
  ${breakpoint("lg")`
        display: initial;
    `}
`;

const Footer = () => (
  <FooterContainer>
    <div>
      <Link href="/">
        <Anchor>
          <LogoContainer>
            <Logo src="/logo/logo-white.svg" alt="InsuranceKo" />
          </LogoContainer>
        </Anchor>
      </Link>
      <DesktopOnly>
        <p>Privacy Policy | Website Policy</p>
        <p>© 2021 InsuranceKo | All rights reserved</p>
      </DesktopOnly>
    </div>
    <DesktopOnly>
      <HalfDivider>
        <div>NAVIGATION</div>
        <div>
          <List>
            <li>Homepage</li>
            <li>Homepage</li>
            <li>Homepage</li>
            <li>Homepage</li>
            <li>Homepage</li>
          </List>
        </div>
      </HalfDivider>
    </DesktopOnly>
    <HalfDivider>
      <DesktopOnly>
        <div>CONTACT US</div>
      </DesktopOnly>
      <div>
        <List>
          <li>+63 921 123 434</li>
          <li>insuranceko@gmail.com</li>
          <li>Something Street, Manila</li>
          <li>Philippines 1000</li>
        </List>
      </div>
    </HalfDivider>
    <List>
      <li>Questions? Comments?</li>
      <li>Email us at info@insuranceko.com</li>
    </List>
    <div>Back to top</div>
  </FooterContainer>
);

export default Footer;
