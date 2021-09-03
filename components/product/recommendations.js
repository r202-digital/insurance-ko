import React, { useEffect, useState } from "react";
import axios from "axios";
import { Colors } from "components/shared/colors";
import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";
import Product from "./item";

const RecommendationHeading = styled.h2`
  font-size: 1em;
  color: ${Colors.titleGray};
  padding: 0 1em;

  ${breakpoint("lg")`
    font-size: 1.5em;
    padding: 0;
  `}
`;

const ProductList = styled.ul`
  margin: 0;
  padding: 0;
  margin-bottom: 2em;
  display: grid;
  list-style: none;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(auto-fill, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 10px;

  ${breakpoint("lg")`
    grid-template-columns: repeat(6, 1fr);
  `}
`;

const RecoContainer = styled.div`
  margin-top: 2em;
`;

const Recommendations = ({ product }) => {
  const [allProducts, setAllProducts] = useState([]);
  const [recoLoading, setRecoLoading] = useState(true);
  // console.log(product)
  const { planOptions } = product;
  useEffect(async () => {
    try {
      const { data } = await axios.get("/api/get-product");
      setAllProducts(data.products || []);
      setRecoLoading(false);
    } catch (e) {
      console.log(e);
    }
  }, []);

  return (
    <RecoContainer>
      <div>
        <RecommendationHeading>Similar Products</RecommendationHeading>
        <ProductList>
          {recoLoading ? (
            <>
              <Product loading />
              <Product loading />
              <Product loading />
              <Product loading />
            </>
          ) : (
            <>
              {/* TODO: Fix recommendations */}
              {allProducts
                .slice(0, 5)
                .map(({ uid, price, name, promos, tag }, index) => (
                  <Product
                    id={uid}
                    price={price}
                    name={name}
                    promos={promos}
                    tag={tag}
                    key={`product-${index}-${name}`}
                  />
                ))}
            </>
          )}
        </ProductList>
      </div>
      <div>
        <RecommendationHeading>Suggested Products</RecommendationHeading>
        <ProductList>
          {recoLoading ? (
            <>
              <Product loading />
              <Product loading />
              <Product loading />
              <Product loading />
            </>
          ) : (
            <>
              {/* TODO: Fix recommendations */}
              {allProducts
                .slice(0, 5)
                .map(({ uid, price, name, promos, tag }, index) => (
                  <Product
                    id={uid}
                    price={price}
                    name={name}
                    promos={promos}
                    tag={tag}
                    key={`product-${index}-${name}`}
                  />
                ))}
            </>
          )}
        </ProductList>
      </div>
    </RecoContainer>
  );
};

export default Recommendations;
