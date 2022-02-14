import { Alert, Modal, Typography } from "@material-ui/core";
import { BreakpointQuery } from "components/shared/breakpoints";
import { Colors } from "components/shared/colors";
import { Flex } from "components/shared/container";
import ProductDetailContext from "components/shared/context/product-detail";
import {
  PrimaryYellowGreenButton,
  SecondaryYellowGreenButton,
} from "components/shared/section";
import { convertToHtml } from "components/shared/serializer";
import { Anchor, Button, Select } from "grommet";
import Cookies from "js-cookie";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import NextImage from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { fadeIn } from "react-animations";
import { IoIosArrowDropleft } from "react-icons/io";
import { RiHeart3Line } from "react-icons/ri";
import styled, { keyframes } from "styled-components";
import VariantContext from "./context";

const HeroContainer = styled.div`
  background-color: white;
  display: block;
  ${BreakpointQuery("lg")`
    padding: 10px;
    margin-top: 1em;
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

  ${BreakpointQuery("lg")`
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

  ${BreakpointQuery("lg")`
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

  ${BreakpointQuery("lg")`
    display: none;
  `}
`;

const Selection = styled.div`
  display: none;
  ${BreakpointQuery("lg")`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-column-gap: 0;
    grid-row-gap: 10px;
  `}
`;

const ShopLink = styled.a`
  display: none;

  ${BreakpointQuery("lg")`
    display: flex;
    align-items: center;
    color: ${Colors.brand};
    text-transform: uppercase;
    text-decoration: none;
    padding: 0.5em 1em;
    margin-top: 1.33em;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 20px;
    font-size: 0.75em;

    span {
      margin-left: 0.5em;
    }
  `}
`;

const Description = styled.div`
  padding: 1em;
`;

const ProductName = styled.h1`
  font-size: 1.375em;
  color: ${Colors.titleGray};
  margin: 0;
  padding: 0;
`;

const Price = styled.h3`
  font-size: 1.8125em;
  margin: 1em 0;
  margin-bottom: 0.5em;

  ${BreakpointQuery("lg")`
    margin: 0;
  `}
`;

const StatusTag = styled.p`
  color: ${Colors.brand};
  margin: 0.5em 0;
`;

const PlanSelection = styled.div`
  margin-top: 1em;

  button {
    width: 100%;

    input {
      padding-left: 1.25em;
      padding-right: 1em;
      color: ${Colors.titleGray};
    }
  }

  ${BreakpointQuery("lg")`
    display: flex;
    align-items: center;
    width: 70%;

    label {
      margin-right: 1em;
      flex: 1 0 1;
    }

    button {
      flex: 1;
    }
  `}
`;

const ButtonRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 1fr;
  grid-column-gap: 1em;
  grid-row-gap: 0px;
`;

const ActionSection = styled.div`
  display: block;
  ${BreakpointQuery("lg")`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1em;
    padding: 2em 0;
    padding-right: 3em;
    border: 1px solid ${Colors.borderGray};
    border-radius: 20px;
  `}
`;

const fadeInAnimation = keyframes`${fadeIn}`;

const ModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: white;
  box-shadow: 0px 11px 15px -7px rgb(0 0 0 / 20%),
    0px 24px 38px 3px rgb(0 0 0 / 14%), 0px 9px 46px 8px rgb(0 0 0 / 12%);
  padding: 32px;
  border-radius: 20px;
  overflow: hidden;
`;

const ModalContainer = styled.div`
  animation: 1s ${fadeInAnimation};
`;

const TermsModal = ({ terms, setModalOption }) => (
  <>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Terms & Conditions
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {convertToHtml(terms)}
    </Typography>
    <ButtonRow>
      <SecondaryYellowGreenButton
        label="Go Back"
        onClick={() => {
          console.log("sample");
        }}
      />
      <PrimaryYellowGreenButton
        label="Agree"
        onClick={() => {
          setModalOption(1);
        }}
      />
    </ButtonRow>
  </>
);

const DataPrivacyModal = ({ terms, setModalOption }) => (
  <>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Data Privacy
    </Typography>
    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
      {convertToHtml(terms)}
    </Typography>
    <ButtonRow>
      <SecondaryYellowGreenButton
        label="Go Back"
        onClick={() => {
          setModalOption(0);
        }}
      />
      <PrimaryYellowGreenButton
        label="Agree"
        onClick={() => {
          console.log("sample");
        }}
      />
    </ButtonRow>
  </>
);

const ProductHero = () => {
  // const { mutate } = useSWRConfig();
  // const userHook = useUser();
  const variantContext = VariantContext.useContainer();
  const { contextProductDetail: product } = ProductDetailContext.useContainer();
  const { price, planOptions, terms = [] } = product;
  const mapOptions = planOptions.map((option) => option.name);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [success, setSuccess] = useState("");
  const [sliderRef] = useKeenSlider({
    initial: 0,
    slideChanged: (s) => {
      setCurrentSlide(s.details().relativeSlide);
    },
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [modalOption, setModalOption] = useState(0);

  const ModalContent = [
    <TermsModal terms={terms} setModalOption={setModalOption} />,
    <DataPrivacyModal terms={terms} setModalOption={setModalOption} />,
  ];

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
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalBody>
          <ModalContainer>{ModalContent[modalOption]}</ModalContainer>
        </ModalBody>
      </Modal>
      <Flex>
        <Link href="/shop">
          <ShopLink href="/shop">
            <IoIosArrowDropleft size="20px" color={Colors.brand} />
            <span>Back to Shop</span>
          </ShopLink>
        </Link>
      </Flex>
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
        <Description>
          <ProductName>{product.name}</ProductName>
          <StatusTag>Available</StatusTag>
          {success && <Alert severity="success">{success}</Alert>}

          <PlanSelection>
            <label>Plan options:</label>
            <Select
              name="plan-select"
              placeholder="Select"
              value={mapOptions[variantContext.contextVariant]}
              options={mapOptions}
              onChange={({ option }) => {
                variantContext.setContextVariant(mapOptions.indexOf(option));
              }}
            />
          </PlanSelection>
          <ActionSection>
            <Price>₱{price}</Price>
            {/* <ButtonRow> */}
            {/* <SecondaryYellowGreenButton
                label="Add to Cart"
                onClick={async () => {
                  const { user } = userHook;
                  if (user) {
                    setSuccess("Added to cart!");
                    const obj = {
                      ...user,
                      cart: [
                        ...(user.cart || []),
                        {
                          product: product,
                        },
                      ],
                    };
                    mutate("/api/profile", () => ({
                      hasUser: true,
                      user: obj,
                      done: true,
                    }));
                    await axios.post("/api/cart-add", obj);

                    setTimeout(() => {
                      setSuccess("");
                    }, 3000);
                  }
                }}
              /> */}
            <PrimaryYellowGreenButton
              label="Purchase"
              onClick={() => {
                const option = mapOptions[variantContext.contextVariant];
                Cookies.set("option", option);

                handleOpen();
                // Router.push(`/buy/${product.uid}`);
              }}
            />
            {/* </ButtonRow> */}
          </ActionSection>
          <p>
            Notes: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
            diam nonumy eirmod tempor invidunt ut labore et dolore magna
            <Anchor href="#">View more</Anchor>
          </p>
          <p>
            Payment:
            {/* TODO: Add payment icons */}
            <span>{` `}Something here...</span>
          </p>
        </Description>
      </HeroContainer>
    </>
  );
};

export default ProductHero;
