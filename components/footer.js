import { Anchor } from "grommet";
import { extractText } from "lib/utils";
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import React from "react";
import styled from "styled-components";
import { BreakpointQuery } from "./shared/breakpoints";
import { Colors } from "./shared/colors";
import MetadataContext from "./shared/context/metadata";
import { SocialIcons } from "./shared/icons";
import { AiOutlineArrowUp } from "react-icons/ai";
import Scroll from "react-scroll";
import { Flex } from "./shared/container";

const scroll = Scroll.animateScroll;

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
  font-size: 0.875rem;

  ${BreakpointQuery("lg")`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 10%;
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 0px;
  `}
`;

const HalfDivider = styled.div`
  display: initial;
  ${BreakpointQuery("lg")`
    display: grid;
    grid-template-columns: 1fr 65%;
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

const FooterLink = styled.a`
  color: white;
  text-decoration: initial;

  &:hover {
    text-decoration: underline;
  }
`;

const TopButton = styled.button`
  background-color: white;
  border: none;
  box-shadow: none;
  outline: none;
  border-radius: 50%;
  height: 40px;
  width: 40px;

  &:hover {
    cursor: pointer;

    svg {
      transition: all 0.3s ease;
      transform: translate(0, -3px);
    }
  }
`;

const BackFlex = styled(Flex)`
  align-items: center;
  justify-content: space-between;
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
              <li>
                <Link href="/">
                  <FooterLink href="/">Homepage</FooterLink>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <FooterLink href="/about">About Us</FooterLink>
                </Link>
              </li>
              <li>
                <Link href="/shop">
                  <FooterLink href="/shop">Our Shop</FooterLink>
                </Link>
              </li>
              <li>
                <Link href="/claims">
                  <FooterLink href="/claims">Claims & Support</FooterLink>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <FooterLink href="/blog">Our Blog</FooterLink>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <FooterLink href="/contact">Contact Us</FooterLink>
                </Link>
              </li>
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
        <li>
          Email us at{" "}
          <FooterLink href={`mailto:${emailContext}`}>
            <u>{emailContext}</u>
          </FooterLink>
        </li>
        <li>
          <SocialIcons color="white" />
        </li>
      </List>
      <div>
        <BackFlex>
          Back to top
          <TopButton
            onClick={(e) => {
              e.preventDefault();
              scroll.scrollToTop();
            }}
          >
            <AiOutlineArrowUp size="20px" />
          </TopButton>
        </BackFlex>
      </div>
    </FooterContainer>
  );
};

export default Footer;
