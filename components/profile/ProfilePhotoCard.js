import { CardContent, Divider, Typography } from "@material-ui/core";
// project imports
import MainCard from "components/cards/MainCard";
import PropTypes from "prop-types";
import React from "react";
import styled from "styled-components";
import { breakpoint } from "styled-components-breakpoint";

const ProductList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const ProductListItem = styled.li`
  border-bottom: 1px solid #efefef;
  padding: 1em 0;

  &:first-of-type {
    border-top: 1px solid #efefef;
  }

  display: grid;
  grid-template-columns: 40px 1fr 90px;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  align-items: center;
`;

const ProductContent = styled.div`
  ${breakpoint("lg")`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    align-items: center;
  `}
`;

const ProductLink = styled.a`
  color: inherit;
  text-decoration: inherit;
`;

const Title = styled(Typography)`
  margin-bottom: 1em;
`;

const ProfilePhotoCard = ({ isLoading }) => {
  return (
    <React.Fragment>
      <MainCard content={false}>
        <CardContent>
          <Title variant="h4">Profile Picture</Title>
          <Divider />
        </CardContent>
      </MainCard>
    </React.Fragment>
  );
};

ProfilePhotoCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default ProfilePhotoCard;
