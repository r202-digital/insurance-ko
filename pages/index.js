import React from "react";
import DefaultLayout from "layouts";
import { SliceZone } from "components";
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
        <div className="homepage">
          <SliceZone sliceZone={doc.data.page_content} />
        </div>
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
