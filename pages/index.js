import React from "react";

import DefaultLayout from "layouts";
import { HomeBanner, SliceZone } from "components";
import { Carousel, Image, Grid, Box, Text } from "grommet";
import Container from "components/shared/container";
import {
  CarouselContainer,
  CarouselGrid,
  TopRightImage,
  BottomRightImage,
  GridImage,
  SectionContainer,
  SectionHeading,
  HandwrittenText,
  ParagraphText,
  SectionBg,
} from "components/shared/section";

import { Client } from "utils/prismicHelpers";

const HomePage = ({ doc, menu }) => {
  if (doc && doc.data) {
    return (
      <DefaultLayout>
        <Container>
          <CarouselGrid>
            <CarouselContainer>
              <Carousel fill>
                <Image fit="cover" src="/img/carousel-1.png" />
                <Image fit="cover" src="/img/carousel-2.png" />
                <Image fit="cover" src="/img/carousel-3.png" />
              </Carousel>
            </CarouselContainer>
            <TopRightImage>
              <GridImage fit="cover" src="/img/carousel-2.png" />
            </TopRightImage>
            <BottomRightImage>
              <GridImage fit="cover" src="/img/carousel-3.png" />
            </BottomRightImage>
          </CarouselGrid>
          <SectionContainer>
            <SectionHeading as="h1">A nice section heading</SectionHeading>
            <HandwrittenText as="h2">Goes here</HandwrittenText>
            <ParagraphText>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet
            </ParagraphText>
          </SectionContainer>
        </Container>
        <SectionBg image="/section-bg.png" padding="4em 0">
          <Container>
            <SectionHeading as="h2" color="white">
              Reason-To-Believe Section
            </SectionHeading>
            <HandwrittenText as="h3" color="yellow">
              Goes here
            </HandwrittenText>
            <Grid
              columns={{
                count: 3,
                size: "auto",
              }}
              gap="large"
            >
              <Box>
                <Box height="200px" background="brand" />
                <Text as="h3" color="yellow" margin="0.5em 0">
                  ALL-IN-ONE
                </Text>
                <Text size="small">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
              <Box>
                <Box height="200px" background="brand" />
                <Text as="h3" color="yellow" margin="0.5em 0">
                  POCKET-FRIENDLY
                </Text>
                <Text size="small">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
              <Box>
                <Box height="200px" background="brand" />
                <Text as="h3" color="yellow" margin="0.5em 0">
                  FAST
                </Text>
                <Text size="small">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </Box>
            </Grid>
          </Container>
        </SectionBg>
        <SectionBg image="/bg.png">
          <Container>
            <SectionHeading as="h2" color="white">
              Reason-To-Believe Section
            </SectionHeading>
            <HandwrittenText as="h3" color="yellow">
              Goes here
            </HandwrittenText>
            <ParagraphText>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam voluptua. At vero eos et accusam et justo duo
              dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
              sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
              amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
              invidunt ut labore et dolore magna aliquyam erat, sed diam
              voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
              Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
              dolor sit amet
            </ParagraphText>
          </Container>
        </SectionBg>
        <div className="homepage">
          <HomeBanner banner={doc.data.homepage_banner[0]} />
          <SliceZone sliceZone={doc.data.page_content} />
        </div>
      </DefaultLayout>
    );
  }

  // Call the standard error page if the document was not found
  return null;
};

export async function getStaticProps({ preview = null, previewData = {} }) {
  const { ref } = previewData;

  const client = Client();

  const doc = (await client.getSingle("homepage", ref ? { ref } : null)) || {};
  const menu = (await client.getSingle("menu", ref ? { ref } : null)) || {};

  return {
    props: {
      doc,
      menu,
      preview,
    },
  };
}

export default HomePage;
