import { Anchor } from "grommet";
import { extractLink } from "lib/utils";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import styled from "styled-components";
import MetadataContext from "./context/metadata";

const IconContainer = styled.div`
  display: flex;
  width: 175px;
  justify-content: space-between;
  margin: 1em 0;
`;

export const SocialIcons = ({ color = "black" }) => {
  const metadataContainer = MetadataContext.useContainer();
  const { contextMetadata } = metadataContainer;
  const { facebook, linkedin, instagram } = contextMetadata;
  const facebookLink = extractLink(facebook);
  const linkedinLink = extractLink(linkedin);
  const instagramLink = extractLink(instagram);
  return (
    <IconContainer>
      <Anchor href={facebookLink}>
        <FaFacebookF size="1.75em" color={color} />
      </Anchor>
      <Anchor href={linkedinLink}>
        <FaLinkedinIn size="1.75em" color={color} />
      </Anchor>
      <Anchor href={instagramLink}>
        <FaInstagram size="1.75em" color={color} />
      </Anchor>
    </IconContainer>
  );
};
