import React from "react";
import styled from "styled-components";

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
  background-color: #fafafa;
`;

const ProductListItem = styled.li`
  padding: 0.5em;
  background-color: white;
`;

const ProductImage = styled.img`
  width: 100%;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.8125em;
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

const Product = ({ image, name, price }) => {
  return (
    <ProductListItem>
      <ProductImage src="https://via.placeholder.com/200" />
      <BottomTag>
        <span>₱3M coverage</span>
      </BottomTag>
      <Description>
        <span>{name}</span>
        <strong>₱{price}</strong>
      </Description>
    </ProductListItem>
  );
};

const ShopSection = () => {
  return (
    <div>
      <ProductList>
        <Product
          price={329.99}
          name="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />
        <Product
          price={329.99}
          name="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />
        <Product
          price={329.99}
          name="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />
        <Product
          price={329.99}
          name="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />
        <Product
          price={329.99}
          name="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />
        <Product
          price={329.99}
          name="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />
        <Product
          price={329.99}
          name="Lorem ipsum dolor sit amet, consetetur sadipscing elitr"
        />
      </ProductList>
    </div>
  );
};

export default ShopSection;
