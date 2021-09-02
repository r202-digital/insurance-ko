import React from "react";
import NextImage from "next/image";
import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { Box, Button } from "grommet";
import { RiHeart3Line } from "react-icons/ri";
import { Colors } from "components/shared/colors";

const HeroContainer = styled.div`
  display: initial;
  ${breakpoint("lg")`
    display: grid;
    grid-template-columns: 10% 40% 50%;
    grid-template-rows: 1fr;
    grid-column-gap: 10px;
    grid-row-gap: 0px;
  `}
`;

const ImageContainer = styled.div`
  height: 13.6875em;
  width: 100%;
  position: relative;

  ${breakpoint("lg")`
    height: calc(87.5vw * 0.4);

    img {
      object-fit: cover;
    }
  `}
`;

const SelectionSlide = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  object-fit: cover;
  img {
    object-fit: cover;
  }
`;

const CarouselContainer = styled.div`
  position: relative;
`;

const Carousel = styled.div`
  position: relative;
`;

const LikeButton = styled.span`
  position: absolute;
  bottom: 0.5em;
  left: 1em;
  background-color: white;
  border-radius: 50%;
  border: 1px solid ${Colors.borderGray};

  ${breakpoint("lg")`
    display: none;
  `}
`;

const SlideTag = styled.span`
  position: absolute;
  bottom: 1.35em;
  right: 1.33em;
  background-color: white;
  padding: 0 1em;
  border-radius: 10px;
  font-size: 0.75em;

  ${breakpoint("lg")`
    display: none;
  `}
`;

const Selection = styled.div`
  display: none;
  ${breakpoint("lg")`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 10px;
  `}
`;

const ProductHero = ({ product }) => {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [sliderRef] = useKeenSlider({
    initial: 0,
    slideChanged: (s) => {
      setCurrentSlide(s.details().relativeSlide);
    },
  });

  //TODO: link to imagekit
  const items = [
    {
      carousel_item: {
        url: "https://images.prismic.io/insuranceko/1a598552-585c-4f87-ad9a-461b2bcf3e1f_carousel-1.png?auto=compress,format",
      },
    },
    {
      carousel_item: {
        url: "https://images.prismic.io/insuranceko/9aa2ae7e-c7d5-46ec-9e9a-69ab4ebeba5c_carousel-2.png?auto=compress,format",
      },
    },
    {
      carousel_item: {
        url: "https://images.prismic.io/insuranceko/d16e10b3-8848-4d3c-bdde-bc92c28f15cc_carousel-3.png?auto=compress,format",
      },
    },
  ];

  return (
    <HeroContainer>
      <Selection>
        {items.map((item, index) => (
          <SelectionSlide key={`${JSON.stringify(item)}-${index}`}>
            <NextImage src={item?.carousel_item?.url || ""} layout="fill" />
          </SelectionSlide>
        ))}
      </Selection>
      <CarouselContainer>
        <Carousel ref={sliderRef} className="keen-slider">
          {items.map((item, index) => (
            <ImageContainer
              className="keen-slider__slide"
              key={`${JSON.stringify(item)}-${index}`}
            >
              <NextImage src={item?.carousel_item?.url || ""} layout="fill" />
            </ImageContainer>
          ))}
        </Carousel>
        <LikeButton>
          <Button icon={<RiHeart3Line />} />
        </LikeButton>
        <SlideTag>
          {currentSlide + 1}/{items.length}
        </SlideTag>
      </CarouselContainer>
      <div>This is a {product.name} page</div>
    </HeroContainer>
  );
};

export default ProductHero;
