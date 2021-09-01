import { DesktopContainer } from "components/shared/container";
import ProductContext from "components/shared/context/product";
import { Accordion, AccordionPanel, Box, Select } from "grommet";
import theme from "lib/theme";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";

const ProductList = styled.ul`
  margin: 0;
  margin-top: 1em;
  padding: 0;
  display: grid;
  list-style: none;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  ${breakpoint("lg")`
    margin-top: 0;
    grid-template-columns: repeat(4, 1fr);
  `}
`;

const ProductListItem = styled.li`
  position: relative;
  padding: 0.5em;
  background-color: white;
`;

const ProductListItemContainer = styled.div`
  padding: 0.5em;
  background-color: white;
`;

const ProductImage = styled.img`
  width: 100%;
`;

const ProductLink = styled.a`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  ${breakpoint("lg")`
    display: none;
  `}
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8125em;
`;

const TopTag = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;

const PromoTag = styled.span`
  display: block;
  padding: 0.5em;
  padding-left: 0.75em;
  padding-right: 1em;
  color: white;
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  background-color: ${({ color }) => {
    switch (color) {
      case "yellow":
        return theme.global.colors.tagYellow;
      case "red":
        return theme.global.colors.tagRed;
      default:
        return theme.global.colors.brand;
    }
  }};
`;

const BottomTag = styled.div`
  margin-top: -2.75em;
  margin-bottom: 1.25em;
  margin-left: 0.5em;
  font-size: 0.75em;

  span {
    background-color: #f4f4f4;
    padding: 0.25em 1em;
    border-radius: 20px;
  }
`;

const DesktopGrid = styled.div`
  margin-top: 1em;
  display: block;

  ${breakpoint("lg")`
    display: grid;
    grid-template-columns: 20% 80%;
    grid-template-rows: repeat(auto-fill, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  `}
`;

const StyledAccordion = styled(Accordion)`
  background-color: white;
`;

const StyledAccordionPanel = styled(AccordionPanel)`
  flex-direction: row-reverse;
  justify-content: flex-end;
`;

const AccordionContent = styled.div`
  padding: 10px;
`;

const DescriptionLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const FilterSection = () => {
  const refineOptions = ["Lorem", "Ipsum", "Sample", "Hello"];
  const [refineOption, setRefineOption] = useState(refineOptions[0]);
  return (
    <Box>
      <StyledAccordion multiple>
        <StyledAccordionPanel label="Refine by">
          <AccordionContent>
            <Select
              id="select"
              name="select"
              placeholder="Select"
              value={refineOption}
              options={refineOptions}
              onChange={({ option }) => setRefineOption(option)}
            />
          </AccordionContent>
        </StyledAccordionPanel>
        <StyledAccordionPanel label="Categories">
          <AccordionContent>Panel 2 contents</AccordionContent>
        </StyledAccordionPanel>
        <StyledAccordionPanel label="Price">
          <AccordionContent>Panel 3 contents</AccordionContent>
        </StyledAccordionPanel>
      </StyledAccordion>
    </Box>
  );
};

const Product = ({ image, name, price, promos, id }) => {
  return (
    <ProductListItem>
      <ProductLink href={`/product/${id}`} />
      <ProductListItemContainer>
        <TopTag>
          {promos.map((promo) => (
            <PromoTag color={promo.color}>{promo.name}</PromoTag>
          ))}
        </TopTag>
        {/* TODO: ADD IMAGE */}
        <ProductImage src="https://via.placeholder.com/200" />
        <BottomTag>
          <span>₱3M coverage</span>
        </BottomTag>
        <Description>
          <Link href={`/product/${id}`}>
            <DescriptionLink href={`/product/${id}`}>{name}</DescriptionLink>
          </Link>
          <strong>₱{price}</strong>
        </Description>
      </ProductListItemContainer>
    </ProductListItem>
  );
};

const ShopSection = () => {
  const productContainer = ProductContext.useContainer();
  const { contextProduct } = productContainer;
  console.log(contextProduct);
  return (
    <DesktopContainer>
      <DesktopGrid>
        <FilterSection />
        <ProductList>
          {contextProduct.map(({ uid, price, name, promos }, index) => (
            <Product
              id={uid}
              price={price}
              name={name}
              promos={promos}
              key={`product-${index}-${name}`}
            />
          ))}
        </ProductList>
      </DesktopGrid>
    </DesktopContainer>
  );
};

export default ShopSection;
