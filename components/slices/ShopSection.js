import Product from "components/product/item";
import { Colors } from "components/shared/colors";
import { DesktopContainer } from "components/shared/container";
import ProductContext from "components/shared/context/product";
import { Accordion, AccordionPanel, Box, Select } from "grommet";
import React, { useState } from "react";
import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";
import { BreakpointQuery } from "components/shared/breakpoints";

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

  ${BreakpointQuery("lg")`
    margin-top: 0;
    grid-template-columns: repeat(4, 1fr);
  `}
`;

const DesktopGrid = styled.div`
  margin-top: 1em;
  display: block;

  ${BreakpointQuery("lg")`
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

const ShopSection = () => {
  const productContainer = ProductContext.useContainer();
  const { contextProduct } = productContainer;
  return (
    <DesktopContainer>
      <DesktopGrid>
        <FilterSection />
        <ProductList>
          {contextProduct.map(({ uid, price, name, promos, tag }, index) => (
            <Product
              id={uid}
              price={price}
              name={name}
              promos={promos}
              tag={tag}
              key={`product-${index}-${name}`}
            />
          ))}
        </ProductList>
      </DesktopGrid>
    </DesktopContainer>
  );
};

export default ShopSection;
