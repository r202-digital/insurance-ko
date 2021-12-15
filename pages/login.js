import { BreakpointQuery } from "components/shared/breakpoints";
import { Colors } from "components/shared/colors";
import MetadataContext from "components/shared/context/metadata";
import { CarouselContainer } from "components/shared/section";
import { Carousel } from "grommet";
import DefaultLayout from "layouts";
import NextImage from "next/image";
import Router from "next/router";
import { useEffect } from "react";
import styled from "styled-components";
import { Client } from "utils/prismicHelpers";
import dynamic from "next/dynamic";
const LoginContainer = dynamic(() =>
  import("components/forms/login-container")
);

const SplitContainer = styled.div`
  background-color: ${Colors.brandDarkTwo};
  flex: 1;
  ${BreakpointQuery("lg")`
    display: grid;
    grid-template-columns: 55% 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  `}
`;

const StyledImage = styled(NextImage)`
  object-fit: cover;
`;

const Login = ({ metadata }) => {
  const metadataContext = MetadataContext.useContainer();

  useEffect(() => {
    metadataContext.setContextMetadata(metadata.data);
    Router.prefetch("/admin");
    Router.prefetch("/profile");
  }, []);

  return (
    <DefaultLayout>
      <SplitContainer>
        <div>
          <CarouselContainer>
            <Carousel fill play={4000}>
              <StyledImage src="/img/carousel-4.png" layout="fill" />
              <StyledImage src="/img/carousel-4.png" layout="fill" />
              <StyledImage src="/img/carousel-4.png" layout="fill" />
            </Carousel>
          </CarouselContainer>
        </div>
        <LoginContainer />
      </SplitContainer>
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

export default Login;
