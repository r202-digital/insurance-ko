import React from "react";
import { Carousel, Image } from "grommet";
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
} from "components/shared/section";

const CarouselImageGrid = ({ slice }) => {
  const { items, primary } = slice;
  return (
    <Container>
      <CarouselGrid>
        <CarouselContainer>
          <Carousel fill play="4000">
            {items.map((item) => (
              <Image fit="cover" src={item?.carousel_item?.url || ""} />
            ))}
          </Carousel>
        </CarouselContainer>
        {primary.top_image && (
          <TopRightImage>
            <GridImage fit="cover" src={primary?.top_image?.url || ""} />
          </TopRightImage>
        )}
        <BottomRightImage>
          <GridImage fit="cover" src="/img/carousel-3.png" />
        </BottomRightImage>
      </CarouselGrid>
    </Container>
  );
};

export default CarouselImageGrid;
