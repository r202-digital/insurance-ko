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
  font-size: 0.75rem;

  ${BreakpointQuery("lg")`
    display: grid;
    grid-template-columns: 1fr 1fr 1.5fr 1fr;
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
  a {
    color: white;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
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
  justify-content: center;
  button {
    margin-left: 1rem;
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
          <p><a href="https://insuranceko.box.com/s/209kalgaxb9xy04o9scpfvmxuowoy4ew" target="_blank">Website Terms & Conditions</a></p>
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
                  <FooterLink href="/">About Us</FooterLink>
                </Link>
              </li>
              <li>
                <Link href="/shop">
                  <FooterLink href="/">Our Shop</FooterLink>
                </Link>
              </li>
              <li>
                <Link href="/claims">
                  <FooterLink href="/">Claims & Support</FooterLink>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <FooterLink href="/">Our Blog</FooterLink>
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
          <SocialIcons color="white" />
        </div>
      </HalfDivider>
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
