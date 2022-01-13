import React, { useEffect } from "react";
import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";
import {
  HandwrittenText,
  SectionContainer,
  SectionHeading,
} from "components/shared/section";
import theme from "lib/theme";
import { SocialIcons } from "components/shared/icons";
import MapComponent from "components/map";
import ContactUsForm from "components/forms/contact-us";
import { Colors } from "components/shared/colors";
import MetadataContext from "components/shared/context/metadata";
import { extractText } from "lib/utils";
import { BreakpointQuery } from "components/shared/breakpoints";
import { RichText } from "prismic-reactjs";

const ContactBg = styled(SectionContainer)`
  flex: 1;
  background-image: url("/contact-bg.png");
  background-size: 100% 100%;
  margin: 0;
  padding: 1.5rem;
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
  padding: 1.5rem;
  border-radius: 1rem;

  ${BreakpointQuery("lg")`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    padding: 5rem;
  `}
`;

const ShowcaseText = styled(HandwrittenText)`
  margin-bottom: 0.5rem;
  color: ${Colors.brand};
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  padding-bottom: 2rem;
`;

const MapSection = styled.div`
  text-align: left;
`;

const ParagraphHeading = styled.h4`
  color: ${Colors.brandDark};
  margin: 0;
  margin-bottom: 1rem;
  padding: 0;
  text-transform: uppercase;
`;

const MapContainer = styled.div`
  height: 300px;
  margin-bottom: 2rem;

  ${BreakpointQuery("lg")`
    height: 425px;
  `}
`;

const FormSection = styled.div`
  ${BreakpointQuery("lg")`
    max-width: 60%;
  `}
`;

const MapBottom = styled.div`
  ${BreakpointQuery("lg")`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  `}
`;

const ContactDetails = styled.div`
  ${BreakpointQuery("lg")`
    max-width: 50%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  `}
`;

const ContactForm = ({ slice: { primary } }) => {
  const metadataContainer = MetadataContext.useContainer();
  const { contextMetadata } = metadataContainer;
  const { contact_number, email, address } = contextMetadata;
  const { heading, subheading, description, map_description } = primary;
  return (
    <ContactGradient>
      <ContactBg>
        <ContactBubble>
          <FormSection>
            <SectionHeading as="h3">{extractText(heading)}</SectionHeading>
            <ShowcaseText>{extractText(subheading)}</ShowcaseText>
            <RichText render={description} />
            <ContactUsForm />
          </FormSection>
          <MapSection>
            <RichText render={map_description} />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1960.079570107004!2d122.55920000594072!3d10.722206142358322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33aee51f5475f7d1%3A0x8f27a9ae66d11eb9!2sMicroensure%20Insurance%20Brokers%20Philippines%20Incorporated!5e0!3m2!1sen!2sau!4v1642078579323!5m2!1sen!2sau"
              width="600"
              height="450"
              style={{ border: "0" }}
              allowfullscreen=""
              loading="lazy"
            ></iframe>
            <MapBottom>
              <ContactDetails>
                <ParagraphHeading>Contact Us</ParagraphHeading>
                <List>
                  <li>{extractText(contact_number)}</li>
                  <li>{extractText(email)}</li>
                  {address && address.length
                    ? address.map((item) => <li>{item.text}</li>)
                    : ""}
                </List>
              </ContactDetails>
              <div>
                <ParagraphHeading>Follow our socials</ParagraphHeading>
                <SocialIcons color={Colors.brandLight} />
              </div>
            </MapBottom>
          </MapSection>
        </ContactBubble>
      </ContactBg>
    </ContactGradient>
  );
};

export default ContactForm;
