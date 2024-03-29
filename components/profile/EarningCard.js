import PropTypes from "prop-types";
import React from "react";

// material-ui
import { makeStyles } from "@material-ui/styles";
import { Avatar, Grid, Menu, MenuItem, Typography } from "@material-ui/core";

// project imports
import MainCard from "../cards/MainCard";
import SkeletonEarningCard from "../cards/Skeleton/EarningCard";

// assets
import EarningIcon from "../../public/icons/earning.svg";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import GetAppTwoToneIcon from "@material-ui/icons/GetAppOutlined";
import FileCopyTwoToneIcon from "@material-ui/icons/FileCopyOutlined";
import PictureAsPdfTwoToneIcon from "@material-ui/icons/PictureAsPdfOutlined";
import ArchiveTwoToneIcon from "@material-ui/icons/ArchiveOutlined";

// style constant
const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.palette.yellow.main,
    color: "#fff",
    overflow: "hidden",
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      width: "900px",
      height: "460px",
      background: theme.palette.yellowGreen.ultra,
      borderRadius: "50%",
      top: "-265px",
      right: "-335px",
      opacity: "0.5",
      [theme.breakpoints.down("xs")]: {
        top: "-105px",
        right: "-140px",
      },
    },
    "&:before": {
      content: '""',
      position: "absolute",
      width: "800px",
      height: "400px",
      background: "linear-gradient(90deg, rgb(255 188 38) 0%, rgb(1 6 0) 100%)",
      borderRadius: "50%",
      top: "-225px",
      right: "-120px",
      opacity: 0.75,
      [theme.breakpoints.down("xs")]: {
        top: "-155px",
        right: "-70px",
      },
    },
  },
  content: {
    padding: "20px !important",
    zIndex: 100,
    position: "relative",
  },
  avatar: {
    ...theme.typography.commonAvatar,
    ...theme.typography.largeAvatar,
    backgroundColor: theme.palette.secondary.main,
    marginTop: "8px",
  },
  avatarRight: {
    ...theme.typography.commonAvatar,
    ...theme.typography.mediumAvatar,
    backgroundColor: theme.palette.yellowGreen.main,
    color: theme.palette.yellow.main,
    zIndex: 1,
  },
  cardHeading: {
    fontSize: "2.125rem",
    fontWeight: 500,
    marginRight: "8px",
    marginTop: "14px",
    marginBottom: "6px",
  },
  subHeading: {
    fontSize: "1rem",
    fontWeight: 500,
    color: theme.palette.yellow.main,
  },
  avatarCircle: {
    cursor: "pointer",
    ...theme.typography.smallAvatar,
    backgroundColor: theme.palette.secondary[200],
    color: theme.palette.secondary.dark,
  },
  circleIcon: {
    transform: "rotate3d(1, 1, 1, 45deg)",
  },
  menuItem: {
    marginRight: "14px",
    fontSize: "1.25rem",
  },
}));

//===========================|| DASHBOARD DEFAULT - EARNING CARD ||===========================//

const EarningCard = ({ isLoading }) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <SkeletonEarningCard />
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
                    <img src={EarningIcon.src} alt="Notification" />
                  </Avatar>
                </Grid>
                <Grid item>
                  <Avatar
                    variant="rounded"
                    className={classes.avatarRight}
                    aria-controls="menu-earning-card"
                    aria-haspopup="true"
                    onClick={handleClick}
                  >
                    <MoreHorizIcon fontSize="inherit" />
                  </Avatar>
                  <Menu
                    id="menu-earning-card"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    variant="selectedMenu"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <GetAppTwoToneIcon
                        fontSize="inherit"
                        className={classes.menuItem}
                      />{" "}
                      Import Card
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <FileCopyTwoToneIcon
                        fontSize="inherit"
                        className={classes.menuItem}
                      />{" "}
                      Copy Data
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <PictureAsPdfTwoToneIcon
                        fontSize="inherit"
                        className={classes.menuItem}
                      />{" "}
                      Export
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <ArchiveTwoToneIcon
                        fontSize="inherit"
                        className={classes.menuItem}
                      />{" "}
                      Archive File
                    </MenuItem>
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container alignItems="center">
                <Grid item>
                  <Typography className={classes.cardHeading}>
                    $500.00
                  </Typography>
                </Grid>
                <Grid item>
                  <Avatar className={classes.avatarCircle}>
                    <ArrowUpwardIcon
                      fontSize="inherit"
                      className={classes.circleIcon}
                    />
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item sx={{ mb: 1.25 }}>
              <Typography className={classes.subHeading}>
                Total Earning
              </Typography>
            </Grid>
          </Grid>
        </MainCard>
      )}
    </React.Fragment>
  );
};

EarningCard.propTypes = {
  isLoading: PropTypes.bool,
};

export default EarningCard;
