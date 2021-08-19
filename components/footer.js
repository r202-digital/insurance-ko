import React from "react";
import styled from "styled-components";
import theme from "lib/theme";
import { up } from "styled-breakpoints";

const FooterContainer = styled.footer`
  background-color: ${theme.global.colors.brandDark};
  padding: 1.5rem 3rem;
  color: white;

  ${up("md")`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 0px;
  `}
`;

const HalfDivider = styled.div`
  display: initial;
  ${up("md")`
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
`;

const DesktopOnly = styled.div`
  display: none;
  ${up("md")`
        display: initial;
    `}
`;

const Footer = () => (
  <FooterContainer>
    <div>
      <div>IK LOGO</div>
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
          <li>Something Street, Manila, Philippines</li>
        </List>
      </div>
    </HalfDivider>
    <div>Questions? Comments? Email us at info@insuranceko.com</div>
    <div>Back to top</div>
  </FooterContainer>
);

export default Footer;
