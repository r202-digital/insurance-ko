import React, { useEffect } from "react";
import DefaultLayout from "layouts";
import { Client } from "utils/prismicHelpers";
import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";
import {
  HandwrittenText,
  SectionContainer,
  SectionHeading,
} from "components/shared/section";
import theme from "lib/theme";
import { SocialIcons } from "components/shared/icons";
import MetadataContext from "components/shared/context/metadata";

const ContactBg = styled(SectionContainer)`
  flex: 1;
  background-image: url("/contact-bg.png");
  background-size: 100% 100%;
  margin: 0;
  padding: 1.5em;
  max-width: initial;
`;

const ContactGradient = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: linear-gradient(
    180deg,
    rgba(127, 198, 34, 1) 0%,
    rgba(244, 240, 51, 1) 100%
  );
  margin: 0;
  padding: 0;
  max-width: initial;
`;

const ContactBubble = styled.div`
  background-color: white;
  padding: 1.5em;
  border-radius: 1em;

  ${breakpoint("lg")`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  `}
`;

const ShowcaseText = styled(HandwrittenText)`
  margin-bottom: 0.5em;
  color: ${theme.global.colors.brand};
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-bottom: 2em;
`;

const MapSection = styled.div`
  text-align: left;
`;

const ParagraphHeading = styled.h4`
  color: ${theme.global.colors.brandDark};
  margin: 0;
  padding: 0;
`;

const Page = ({ metadata }) => {
  const metadataContext = MetadataContext.useContainer();

  useEffect(() => {
    metadataContext.setContextMetadata(metadata.data);
  }, []);

  return (
    <DefaultLayout>
      <ContactGradient>
        <ContactBg>
          <ContactBubble>
            <form>
              <SectionHeading as="h3">A nice section heading</SectionHeading>
              <ShowcaseText>Goes here</ShowcaseText>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
              </p>
            </form>
            <MapSection>
              <p>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
              </p>
              <ParagraphHeading>Contact Us</ParagraphHeading>
              <List>
                <li>+63 921 123 434</li>
                <li>insuranceko@gmail.com</li>
                <li>Something Street, Manila</li>
                <li>Philippines 1000</li>
              </List>
              <ParagraphHeading>Follow our socials</ParagraphHeading>
              <SocialIcons color={theme.global.colors.brandLight} />
            </MapSection>
          </ContactBubble>
        </ContactBg>
      </ContactGradient>
    </DefaultLayout>
  );
};

export async function getStaticProps({ preview = null, previewData = {} }) {
  const { ref } = previewData;

  const client = Client();

  const metadata =
    (await client.getSingle("metadata", ref ? { ref } : null)) || {};

  return {
    props: {
      metadata,
      preview,
    },
  };
}

export default Page;
