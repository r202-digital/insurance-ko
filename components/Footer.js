import React from "react";
import styled from "styled-components";
import theme from "lib/theme";
import { breakpoint } from "styled-components-breakpoint";
import { Anchor } from "grommet";
import Link from "next/link";
import { SocialIcons } from "./shared/icons";
import MetadataContext from "./shared/context/metadata";
import { extractText } from "lib/utils";
import { RichText } from "prismic-reactjs";
import { Colors } from "./shared/colors";
import { Breakpoint, BreakpointQuery } from "./shared/breakpoints";

const Logo = styled.img`
  height: 100%;
`;

const LogoContainer = styled.div`
  height: 80px;
  margin-bottom: 2rem;

  ${BreakpointQuery("lg")`
    height: 56px;
  `}
`;

const FooterContainer = styled.footer`
  background-color: ${Colors.brandDarkTwo};
  padding: 1.5rem 3rem;
  color: white;

  ${BreakpointQuery("lg")`
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 0px;
  `}
`;

const HalfDivider = styled.div`
  display: initial;
  ${BreakpointQuery("lg")`
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
  ${BreakpointQuery("lg")`
    display: initial;
  `}
`;

const AddressContainer = styled.li`
  p {
    margin: 0;
  }
`;

const Footer = () => {
  const metadataContainer = MetadataContext.useContainer();
  const { contextMetadata } = metadataContainer;
  const { email, contact_number, address } = contextMetadata;
  const emailContext = extractText(email);
  const numberContext = extractText(contact_number);
  return (
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
            <li>{numberContext}</li>
            <li>{emailContext}</li>
            <AddressContainer>
              <RichText render={address} />
            </AddressContainer>
          </List>
        </div>
      </HalfDivider>
      <List>
        <li>Questions? Comments?</li>
        <li>Email us at info@insuranceko.com</li>
        <li>
          <SocialIcons color="white" />
        </li>
      </List>
      <div>Back to top</div>
    </FooterContainer>
  );
};

export default Footer;
