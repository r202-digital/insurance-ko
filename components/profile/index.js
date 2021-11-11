import { Grid } from "@material-ui/core";
import LoadingScreen from "components/shared/loading";
import { gridSpacing } from "lib/constant";
import { useUser } from "lib/hooks";
import dynamic from "next/dynamic";
import Router from "next/router";
import React from "react";
import ProfileLayout from "./ProfileLayout";

const ProfileDetailsCard = dynamic(() => import("./ProfileDetailsCard"));
const ProfilePhotoCard = dynamic(() => import("./ProfilePhotoCard"));

const DashboardLayout = () => {
  const user = useUser();
  // console.log(user);

  if (user.done) {
    if (user.hasUser) {
      return (
        <ProfileLayout>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12} lg={4}>
              <ProfilePhotoCard />
            </Grid>
            <Grid item xs={12} lg={8}>
              <ProfileDetailsCard />
            </Grid>
          </Grid>
        </ProfileLayout>
      );
    } else {
      Router.push("/login");
      return <LoadingScreen />;
    }
  } else {
    return <LoadingScreen />;
  }
};

export default DashboardLayout;
