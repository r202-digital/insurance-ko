import React from "react";
import styled from "styled-components";
import { Text } from "grommet";
import Container from "components/shared/container";
import { HandwrittenText, SectionBg } from "components/shared/section";
import { RichText } from "prismic-reactjs";
import { extractText } from "lib/utils";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

const ShowcaseText = styled(HandwrittenText)`
  margin-bottom: 0.1em;
  color: white;
`;

const Slide = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`;

const Avatar = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 50%;
`;

const CarouselContainer = styled.div`
  width: 40%;
  position: relative;
  margin: auto;
  margin-top: 20px;
`;

const Arrow = styled.svg`
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  -webkit-transform: translateY(-50%);
  fill: #fff;
  cursor: pointer;
`;

const ArrowLeftSvg = styled(Arrow)`
  left: -10px;
`;

const ArrowRightSvg = styled(Arrow)`
  left: auto;
  right: -10px;
`;

const Slider = styled.div`
  .active {
    ${Avatar} {
      transform: scale(1.65);
      transition: 0.3s;
    }
  }
`;

const ArrowLeft = (props) => {
  return (
    <ArrowLeftSvg
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    </ArrowLeftSvg>
  );
};

const ArrowRight = (props) => {
  return (
    <ArrowRightSvg
      onClick={props.onClick}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </ArrowRightSvg>
  );
};

const Testimonials = ({ slice }) => {
  const { items, primary } = slice;
  const title = extractText(primary.title);
  const subtitle = extractText(primary.subtitle);
  const [currentSlide, setCurrentSlide] = React.useState(items.length - 1);

  const convertToActiveIndex = (slideIndex, arrLength) =>
    slideIndex < arrLength * 2 - 1 ? slideIndex + 1 : 0;

  const convertToItemIndex = (slideIndex, arrLength) =>
    slideIndex < arrLength ? slideIndex : slideIndex - arrLength;
  const [sliderRef, slider] = useKeenSlider({
    slidesPerView: 3,
    mode: "free-snap",
    spacing: 15,
    loop: true,
    initial: items.length - 1,
    slideChanged: (s) => {
      const slideIndex = convertToActiveIndex(
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
  const activeIndex = convertToItemIndex(currentSlide, items.length);
  const activeItem = items[activeIndex];
  const { review, name, position } = activeItem;

  return (
    <SectionBg image={primary.background.url || "/section-bg.png"}>
      <Container>
        <ShowcaseText as="h2" color="white">
          {title}
        </ShowcaseText>
        <Text color="white">{subtitle}</Text>
        <CarouselContainer>
          <Slider ref={sliderRef} className="keen-slider">
            {items.map((item, index) => {
              return (
                <div className="keen-slider__slide">
                  <Slide>
                    <Avatar src={item.avatar.url} />
                  </Slide>
                </div>
              );
            })}
            {items.map((item, index) => {
              return (
                <div className="keen-slider__slide">
                  <Slide>
                    <Avatar src={item.avatar.url} />
                  </Slide>
                </div>
              );
            })}
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
        <div>
          <RichText render={review} />
          <h3>{RichText.asText(name)}</h3>
          <p>{RichText.asText(position)}</p>
        </div>
      </Container>
    </SectionBg>
  );
};

export default Testimonials;
