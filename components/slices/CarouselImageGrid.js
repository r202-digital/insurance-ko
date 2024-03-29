import React from "react";
import { Carousel, Image } from "grommet";
import { DesktopContainer } from "components/shared/container";
import {
  CarouselContainer,
  CarouselGrid,
  TopRightImage,
  BottomRightImage,
  GridImage,
} from "components/shared/section";
import NextImage from "next/image";
import styled from "styled-components";

const StyledImage = styled(NextImage)`
  object-fit: cover;
`;

const CarouselImageGrid = ({ slice }) => {
  const { items, primary } = slice;
  return (
    <DesktopContainer>
      <CarouselGrid>
        <CarouselContainer>
          <Carousel fill play={4000}>
            {items.map((item, index) => (
              <StyledImage
                key={`${JSON.stringify(item)}-${index}`}
                src={item?.carousel_item?.url || ""}
                layout="fill"
              />
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
    </DesktopContainer>
  );
};

export default CarouselImageGrid;
