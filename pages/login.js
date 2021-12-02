import LoginForm from "components/forms/login";
import SignupForm from "components/forms/signup";
import { BreakpointQuery } from "components/shared/breakpoints";
import { Colors } from "components/shared/colors";
import MetadataContext from "components/shared/context/metadata";
import { CarouselContainer, SectionHeading } from "components/shared/section";
import { Box, Carousel, Grommet, Tab, Tabs, Text } from "grommet";
import { grommet } from "grommet/themes";
import { deepMerge } from "grommet/utils";
import DefaultLayout from "layouts";
import NextImage from "next/image";
import Router from "next/router";
import { useEffect } from "react";
import styled, { css } from "styled-components";
import { Client } from "utils/prismicHelpers";

const customTheme = {
  global: {
    font: {
      family: "Open Sans",
      size: "16px",
    },
    input: {
      weight: 400,
    },
    colors: Colors,
  },
  tabs: {
    header: {
      extend: ({ theme }) => css`
        justify-content: flex-start;
        border-radius: 20px;
        padding: 2px;
        border: 1px solid ${Colors.borderGray};
        color: ${Colors.titleGray};
      `,
    },
  },
  tab: {
    active: {
      background: Colors.lightgreen,
      color: "accent-1",
    },
    border: undefined,
    color: "white",
    hover: {
      background: "dark-1",
    },
    margin: undefined,
    pad: {
      bottom: undefined,
      horizontal: "small",
    },
    extend: () => css`
      border-radius: 20px;
      transition: 0.3s;

      &:hover {
        background: ${Colors.brand};
      }
    `,
  },
  formField: {
    label: {
      color: "dark-3",
      size: "small",
      margin: "xsmall",
      weight: 600,
    },
    disabled: {
      background: {
        color: "status-disabled",
        opacity: true,
      },
    },
    border: undefined,
    content: {
      pad: "small",
    },
    error: {
      background: {
        color: "status-critical",
        opacity: "weak",
      },
    },
    margin: "none",
    extend: ({ theme }) => css`
      input {
        border-radius: 20px;
        background-color: white;
      }
    `,
  },
};

const RichTabTitle = ({ label }) => (
  <Box direction="row" align="center" gap="xsmall" margin="xsmall">
    <Text size="small">
      <strong>{label}</strong>
    </Text>
  </Box>
);

const StyledGrommet = styled(Grommet)`
  height: auto !important;
  width: auto !important;
  background-color: ${Colors.brandDark};
  display: flex;
`;

const FormContainer = styled.div`
  border-radius: 20px;
  background-color: white;
  padding: 3em;

  & > div {
    align-items: flex-start;
  }
  ${BreakpointQuery("lg")`
      margin: 2.5em 4em;
      flex: 1;
  `}
`;

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

const DarkHeading = styled(SectionHeading)`
  color: ${Colors.brandDark};
  font-size: 1.75em;
  margin-top: 1.5em;
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
        <StyledGrommet theme={deepMerge(grommet, customTheme)}>
          <FormContainer>
            <Tabs>
              <Tab title={<RichTabTitle label="Sign in" />}>
                <DarkHeading as="h2">Lorem Ipsum Dolor!</DarkHeading>
                <Text size="small">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod.
                </Text>
                <LoginForm />
              </Tab>
              <Tab title={<RichTabTitle label="Sign up" />}>
                <SignupForm />
              </Tab>
            </Tabs>
          </FormContainer>
        </StyledGrommet>
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
