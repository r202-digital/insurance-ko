import PropTypes from "prop-types";
import React from "react";

// material-ui
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";

// project imports
import MainCard from "../cards/MainCard";
import TotalIncomeCard from "../cards/Skeleton/TotalIncomeCard";

// assets
import TableChartOutlinedIcon from "@material-ui/icons/TableChartOutlined";

// style constant
const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.yellow.main,
    color: theme.palette.primary.light,
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
    padding: "16px !important",
  },
  avatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.largeAvatar,
    backgroundColor: theme.palette.yellow.darkest,
    color: "#fff",
  },
  primary: {
    color: theme.palette.brown.main,
  },
  secondary: {
    color: theme.palette.yellow.light,
    marginTop: "5px",
  },
  padding: {
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

//-----------------------|| DASHBOARD - TOTAL INCOME DARK CARD ||-----------------------//

const TotalIncomeDarkCard = ({ isLoading }) => {
  const classes = useStyles();

  return (
    <React.Fragment>
      {isLoading ? (
        <TotalIncomeCard />
      ) : (
        <MainCard
          border={false}
          className={classes.card}
          contentClass={classes.content}
        >
          <List className={classes.padding}>
            <ListItem
              alignItems="center"
              disableGutters
              className={classes.padding}
            >
              <ListItemAvatar>
                <Avatar variant="rounded" className={classes.avatar}>
                  <TableChartOutlinedIcon fontSize="inherit" />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                className={classes.padding}
                sx={{
                  mt: 0.45,
                  mb: 0.45,
                }}
                primary={
                  <Typography variant="h4" className={classes.primary}>
                    $203k
                  </Typography>
                }
                secondary={
                  <Typography variant="subtitle2" className={classes.secondary}>
                    Total Income
                  </Typography>
                }
              />
            </ListItem>
          </List>
        </MainCard>
      )}
    </React.Fragment>
  );
};

TotalIncomeDarkCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default TotalIncomeDarkCard;
