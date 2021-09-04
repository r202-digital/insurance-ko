import PropTypes from "prop-types";
import React from "react";

// material-ui
import { makeStyles } from "@material-ui/styles";
import { Avatar, Button, Grid, Typography } from "@material-ui/core";

// third-party
import dynamic from "next/dynamic";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

// project imports
import MainCard from "../cards/MainCard";
import SkeletonTotalOrderCard from "../cards/Skeleton/EarningCard";

import ChartDataMonth from "./chart-data/total-order-month-line-chart";
import ChartDataYear from "./chart-data/total-order-year-line-chart";

// assets
import LocalMallOutlinedIcon from "@material-ui/icons/LocalMallOutlined";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

// style constant
const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.yellow.main,
    color: "#fff",
    overflow: "hidden",
    position: "relative",
    "&>div": {
      position: "relative",
      zIndex: 5,
    },
    "&:after": {
      content: '""',
      position: "absolute",
      width: "900px",
      height: "340px",
      background: theme.palette.yellow.darker,
      borderRadius: "50%",
      zIndex: 0,
      top: "-25px",
      right: "-20px",
      opacity: 0.45,
      transform: "rotate(-2.5deg)",
      [theme.breakpoints.down("xs")]: {
        top: "-105px",
        right: "-140px",
      },
    },
    "&:before": {
      content: '""',
      position: "absolute",
      zIndex: 1,
      width: "600px",
      height: "400px",
      background: "linear-gradient(90deg, #ecc31f 0%, #f2e32d 100%)",
      borderRadius: "50%",
      top: "10px",
      right: "-70px",
      opacity: 1,
      [theme.breakpoints.down("xs")]: {
        top: "-155px",
        right: "-70px",
      },
    },
  },
  content: {
    padding: "20px !important",
    background: "rgba(0,0,0,0.025)",
  },
  avatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.largeAvatar,
    backgroundColor: theme.palette.yellow.darkest,
    color: "#fff",
    marginTop: "8px",
  },
  cardHeading: {
    fontSize: "2.125rem",
    fontWeight: 500,
    marginRight: "8px",
    marginTop: "14px",
    marginBottom: "6px",
    color: theme.palette.brown.main,
  },
  subHeading: {
    fontSize: "1rem",
    fontWeight: 500,
    color: theme.palette.yellow.light,
  },
  avatarCircle: {
    ...theme.typography.smallAvatar,
    cursor: "pointer",
    backgroundColor: theme.palette.primary[200],
    color: theme.palette.primary.dark,
  },
  circleIcon: {
    transform: "rotate3d(1, 1, 1, 45deg)",
  },
}));

//-----------------------|| DASHBOARD - TOTAL ORDER LINE CHART CARD ||-----------------------//

const TotalOrderLineChartCard = ({ isLoading }) => {
  const classes = useStyles();

  const [timeValue, setTimeValue] = React.useState(false);
  const handleChangeTime = (event, newValue) => {
    setTimeValue(newValue);
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <MainCard
          border={false}
          className={classes.card}
          contentClass={classes.content}
        >
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Avatar variant="rounded" className={classes.avatar}>
                    <LocalMallOutlinedIcon fontSize="inherit" />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Button
                    disableElevation
                    variant={timeValue ? "contained" : "string"}
                    size="small"
                    onClick={(e) => handleChangeTime(e, true)}
                  >
                    Month
                  </Button>
                  <Button
                    disableElevation
                    variant={!timeValue ? "contained" : "string"}
                    size="small"
                    onClick={(e) => handleChangeTime(e, false)}
                  >
                    Year
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 0.75 }}>
              <Grid container alignItems="center">
                <Grid item xs={6}>
                  <Grid container alignItems="center">
                    <Grid item>
                      {timeValue ? (
                        <Typography className={classes.cardHeading}>
                          $108
                        </Typography>
                      ) : (
                        <Typography className={classes.cardHeading}>
                          $961
                        </Typography>
                      )}
                    </Grid>
                    <Grid item>
                      <Avatar className={classes.avatarCircle}>
                        <ArrowDownwardIcon
                          fontSize="inherit"
                          className={classes.circleIcon}
                        />
                      </Avatar>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography className={classes.subHeading}>
                        Total Order
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={6}>
                  {timeValue ? (
                    <Chart {...ChartDataMonth} />
                  ) : (
                    <Chart {...ChartDataYear} />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </React.Fragment>
  );
};

TotalOrderLineChartCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalOrderLineChartCard;
