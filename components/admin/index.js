// material-ui
import { Grid } from "@material-ui/core";
import LoadingScreen from "components/shared/loading";
import { gridSpacing } from "lib/constant";
import { useUser } from "lib/hooks";
import dynamic from "next/dynamic";
import Router from "next/router";
import React from "react";
import ProfileLayout from "./ProfileLayout";

// project imports
const EarningCard = dynamic(() => import("./EarningCard"));
const PopularCard = dynamic(() => import("./PopularCard"));
const TotalOrderLineChartCard = dynamic(() =>
  import("./TotalOrderLineChartCard")
);
const TotalIncomeDarkCard = dynamic(() => import("./TotalIncomeDarkCard"));
const TotalIncomeLightCard = dynamic(() => import("./TotalIncomeLightCard"));
const TotalGrowthBarChart = dynamic(() => import("./TotalGrowthBarChart"));

//-----------------------|| DEFAULT DASHBOARD ||-----------------------//

const AdminDashboardLayout = () => {
  const user = useUser();

  if (user.done) {
    if (user.hasUser) {
      return (
        <ProfileLayout>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <EarningCard />
                </Grid>
                <Grid item lg={4} md={6} sm={6} xs={12}>
                  <TotalOrderLineChartCard />
                </Grid>
                <Grid item lg={4} md={12} sm={12} xs={12}>
                  <Grid container spacing={gridSpacing}>
                    <Grid item sm={6} xs={12} md={6} lg={12}>
                      <TotalIncomeDarkCard />
                    </Grid>
                    <Grid item sm={6} xs={12} md={6} lg={12}>
                      <TotalIncomeLightCard />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={gridSpacing}>
                <Grid item xs={12} md={8}>
                  <TotalGrowthBarChart />
                </Grid>
                <Grid item xs={12} md={4}>
                  <PopularCard />
                </Grid>
              </Grid>
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

export default AdminDashboardLayout;
