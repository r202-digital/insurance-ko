import { CardContent, Divider, Typography } from "@material-ui/core";
// project imports
import MainCard from "components/cards/MainCard";
import { Colors } from "components/shared/colors";
import { Flex, SubmitButton } from "components/shared/container";
import PropTypes from "prop-types";
import React from "react";
import { styled } from "stitches.config";
import { IoPerson } from "react-icons/io5";

const Title = styled(Typography, {
  marginBottom: "1em",
});

const CenteredFlex = styled(Flex, {
  alignItems: "center",
  flexDirection: "column",
  color: Colors["text-weak"].dark,
  "& > *": {
    margin: "0.5em",
  },
  "& > div": {
    "&:first-of-type": {
      marginTop: "2em",
    },
  },
});

const Avatar = styled("div", {
  borderRadius: "50%",
  height: "150px",
  width: "150px",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: Colors.secondaryLight,
});

const AvatarImage = styled("img", {
  height: "100%",
  width: "100%",
  objectFit: "cover",
});

const ProfilePhotoCard = ({ image }) => {
  return (
    <React.Fragment>
      <MainCard content={false}>
        <CardContent>
          <Title variant="h4">Profile Picture</Title>
          <Divider />
          <CenteredFlex>
            <Avatar>
              {image ? (
                <AvatarImage src={image} />
              ) : (
                <IoPerson size="90px" color={Colors.brandDark} />
              )}
            </Avatar>
            <Typography variant="p">
              Upload / Change your profile image
            </Typography>
            <div>
              <SubmitButton
                primary
                onClick={(e) => {
                  e.preventDefault();
                  console.log("sample");
                }}
              >
                <Typography>Upload Picture</Typography>
              </SubmitButton>
            </div>
          </CenteredFlex>
        </CardContent>
      </MainCard>
    </React.Fragment>
  );
};

ProfilePhotoCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default ProfilePhotoCard;
