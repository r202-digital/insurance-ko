import React, { useMemo, useCallback } from "react";
import styled from "styled-components";
import { Text } from "grommet";
import { Container } from "components/shared/container";
import {
  HandwrittenText,
  SectionBg,
  SectionContainer,
} from "components/shared/section";
import { RichText } from "prismic-reactjs";
import { extractText } from "lib/utils";
import { useKeenSlider } from "keen-slider/react";
import NextImage from "next/image";
import "keen-slider/keen-slider.min.css";
import { FaChevronCircleRight, FaChevronCircleLeft } from "react-icons/fa";

const ShowcaseText = styled(HandwrittenText)`
  margin-bottom: 0.1em;
  color: white;
`;

const Slide = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`;

const AvatarContainer = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
`;

const CarouselContainer = styled.div`
  width: 40%;
  position: relative;
  margin: auto;
  margin-top: 20px;
`;

const ArrowButton = styled.button`
  border: none;
  background-color: initial;
  padding: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`;

const ArrowLeftButton = styled(ArrowButton)`
  left: -25px;
`;

const ArrowRightButton = styled(ArrowButton)`
  right: -25px;
`;

const Slider = styled.div`
  .active {
    ${AvatarContainer} {
      transform: scale(1.65);
      transition: 0.3s;
    }
  }
`;

const Dots = styled.div`
  display: flex;
  padding: 10px 0;
  justify-content: center;
`;

const Dot = styled.button`
  border: none;
  width: 10px;
  height: 10px;
  background: white;
  opacity: 50%;
  border-radius: 50%;
  margin: 0 5px;
  padding: 5px;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &.active {
    opacity: 100%;
  }
`;

const TestimonialContainer = styled(SectionContainer)`
  padding: 0;
  color: white;
  width: 60%;

  p:first-of-type {
    margin-bottom: 2rem;
  }
`;

const Name = styled.h3`
  margin: 0;
  padding: 0;
  font-size: 1.5rem;
  margin-bottom: 0.25rem;
`;

const Position = styled.p`
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const ArrowLeft = (props) => {
  return (
    <ArrowLeftButton onClick={props.onClick}>
      <FaChevronCircleLeft size="25px" color="white" />
    </ArrowLeftButton>
  );
};

const ArrowRight = (props) => {
  return (
    <ArrowRightButton onClick={props.onClick}>
      <FaChevronCircleRight size="25px" color="white" />
    </ArrowRightButton>
  );
};

const List = React.memo(({ items }) =>
  items.map((item, index) => {
    return (
      <div
        className="keen-slider__slide"
        key={`${JSON.stringify(item)}-${index}`}
      >
        <Slide>
          <AvatarContainer>
            <NextImage
              src={item?.avatar?.url || ""}
              layout="fill"
              blur="true"
            />
          </AvatarContainer>
        </Slide>
      </div>
    );
  })
);

const Testimonials = ({ slice }) => {
  const { items, primary } = useMemo(() => slice, [slice]);
  const title = extractText(primary.title);
  const subtitle = extractText(primary.subtitle);
  const [currentSlide, setCurrentSlide] = React.useState(items.length - 1);

  const convertToActiveIndex = (slideIndex, arrLength) =>
    slideIndex < arrLength * 2 - 1 ? slideIndex + 1 : 0;
  const memoConvertToActiveIndex = useCallback(convertToActiveIndex, []);

  const convertToItemIndex = (slideIndex, arrLength) =>
    slideIndex < arrLength ? slideIndex : slideIndex - arrLength;
  const memoConvertToItemIndex = useCallback(convertToItemIndex, []);

  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: 3,
    mode: "free-snap",
    spacing: 15,
    loop: true,
    initial: items.length - 1,
    slideChanged: (s) => {
      const slideIndex = memoConvertToActiveIndex(
        s.details().relativeSlide,
        items.length
      );
      const currentSlide = sliderRef.current.childNodes[slideIndex];
      const activeSlide = sliderRef.current.querySelector(".active");
      currentSlide.classList.add("active");
      if (activeSlide) {
        activeSlide.classList.remove("active");
      }
      setCurrentSlide(slideIndex);
    },
  });
  const activeIndex = memoConvertToItemIndex(currentSlide, items.length);
  const activeItem = useMemo(() => items[activeIndex], [items, activeIndex]);
  const { review, name, position } = activeItem;

  const itemKeys = Object.keys(items);
  const dotsArray = [
    ...itemKeys.slice(-1),
    ...itemKeys.slice(0, items.length - 1),
  ].map((it) => parseInt(it));

  return (
    <SectionBg image={primary.background.url || "/section-bg.png"}>
      <Container>
        <ShowcaseText as="h2" color="white">
          {title}
        </ShowcaseText>
        <Text color="white">{subtitle}</Text>
        <CarouselContainer>
          <Slider ref={sliderRef} className="keen-slider">
            <List items={items} />
            <List items={items} />
          </Slider>
          {slider && (
            <>
              <ArrowLeft
                onClick={(e) => e.stopPropagation() || slider.prev()}
                disabled={currentSlide === 0}
              />
              <ArrowRight
                onClick={(e) => e.stopPropagation() || slider.next()}
                disabled={currentSlide === slider.details().size - 1}
              />
            </>
          )}
        </CarouselContainer>
        <TestimonialContainer>
          <RichText render={review} />
          <Name>{RichText.asText(name)}</Name>
          <Position>{RichText.asText(position)}</Position>
        </TestimonialContainer>
        {slider && (
          <Dots>
            {dotsArray.map((item, index) => {
              return (
                <Dot
                  key={`${JSON.stringify(item)}-${index}`}
                  onClick={() => {
                    slider.moveToSlide(item);
                  }}
                  className={index === activeIndex ? " active" : ""}
                />
              );
            })}
          </Dots>
        )}
      </Container>
    </SectionBg>
  );
};

export default Testimonials;
