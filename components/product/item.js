import React from "react";
import { Colors } from "components/shared/colors";
import Link from "next/link";
import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";
import { FluidSkeleton } from "components/shared/skeleton";
import Skeleton from "react-loading-skeleton";
import { BreakpointQuery } from "components/shared/breakpoints";

const ProductListItem = styled.li`
  position: relative;
  padding: 0.5em;
  background-color: white;
  list-style: none;
`;

const ProductListItemContainer = styled.div`
  padding: 0.5em;
  background-color: white;
`;

const ImageContainer = styled.div`
  height: 150px;
  overflow: hidden;
  margin-bottom: 0.25em;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ProductLink = styled.a`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;

  ${BreakpointQuery("lg")`
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
        return Colors.tagYellow;
      case "red":
        return Colors.tagRed;
      default:
        return Colors.brand;
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

const DescriptionLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Product = ({ image, tag, name, price, promos = [], id, loading }) => {
  return (
    <ProductListItem>
      <ProductLink href={`/product/${id}`} />
      <ProductListItemContainer>
        {!!promos.length && (
          <TopTag>
            {promos.map((promo) => (
              <PromoTag color={promo.color}>{promo.name}</PromoTag>
            ))}
          </TopTag>
        )}
        {/* TODO: ADD IMAGE */}

        <ImageContainer>
          {loading ? (
            <FluidSkeleton />
          ) : (
            <ProductImage src="https://via.placeholder.com/200x150" />
          )}
        </ImageContainer>

        {tag && (
          <BottomTag>
            <span>{tag}</span>
          </BottomTag>
        )}
        <Description>
          {loading ? (
            <Skeleton />
          ) : (
            <Link href={`/product/${id}`}>
              <DescriptionLink href={`/product/${id}`}>{name}</DescriptionLink>
            </Link>
          )}
          {loading ? <Skeleton /> : <strong>₱{price}</strong>}
        </Description>
      </ProductListItemContainer>
    </ProductListItem>
  );
};

export default Product;
