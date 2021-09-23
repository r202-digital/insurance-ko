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

  ${breakpoint("lg")`
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

  ${breakpoint("lg")`
    height: 425px;
  `}
`;

const FormSection = styled.div`
  ${breakpoint("lg")`
    max-width: 60%;
  `}
`;

const MapBottom = styled.div`
  ${breakpoint("lg")`
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  `}
`;

const ContactDetails = styled.div`
  ${breakpoint("lg")`
    max-width: 50%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  `}
`;

const ContactForm = () => {
  const metadataContainer = MetadataContext.useContainer();
  const { contextMetadata } = metadataContainer;
  const { contact_number, email, address } = contextMetadata;
  return (
    <ContactGradient>
      <ContactBg>
        <ContactBubble>
          <FormSection>
            <SectionHeading as="h3">A nice section heading</SectionHeading>
            <ShowcaseText>Goes here</ShowcaseText>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</p>
            <ContactUsForm />
          </FormSection>
          <MapSection>
            <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed</p>
            <MapComponent
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<MapContainer />}
              mapElement={<div style={{ height: `100%` }} />}
            />
            <MapBottom>
              <ContactDetails>
                <ParagraphHeading>Contact Us</ParagraphHeading>
                <List>
                  <li>{extractText(contact_number)}</li>
                  <li>{extractText(email)}</li>
                  {address.map((item) => (
                    <li>{item.text}</li>
                  ))}
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
