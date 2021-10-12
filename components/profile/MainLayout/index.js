import PropTypes from "prop-types";
import React, { useState } from "react";

// material-ui
import { makeStyles, useTheme } from "@material-ui/styles";
import { AppBar, CssBaseline, Toolbar, useMediaQuery } from "@material-ui/core";

// third-party
import clsx from "clsx";

// project imports
import Header from "./Header";
import Sidebar from "./Sidebar";
import { drawerWidth, initialProfileDetails } from "lib/constant";
import { useUser } from "lib/hooks";
import ProfileDetailsContext from "../context/profile-details-context";

// style constant
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    backgroundColor: theme.palette.background.default,
  },
  appBarWidth: {
    transition: theme.transitions.create("width"),
    backgroundColor: theme.palette.background.default,
  },
  content: {
    ...theme.typography.mainContent,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    [theme.breakpoints.up("md")]: {
      marginLeft: -(drawerWidth - 20),
      width: `calc(100% - ${drawerWidth}px)`,
    },
    [theme.breakpoints.down("md")]: {
      marginLeft: "20px",
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "16px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
      width: `calc(100% - ${drawerWidth}px)`,
      padding: "16px",
      marginRight: "10px",
    },
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    [theme.breakpoints.down("md")]: {
      marginLeft: "20px",
    },
    [theme.breakpoints.down("sm")]: {
      marginLeft: "10px",
    },
  },
}));

//-----------------------|| MAIN LAYOUT ||-----------------------//

const MainLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const classes = useStyles();
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useUser();

  // Handle left drawer
  const handleLeftDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  React.useEffect(() => {
    setDrawerOpen(!matchDownMd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchDownMd]);

  return (
    <ProfileDetailsContext.Provider
      initialState={user || initialProfileDetails}
    >
      <div className={classes.root}>
        <CssBaseline />
        {/* header */}
        <AppBar
          enableColorOnDark
          position="fixed"
          color="inherit"
          elevation={0}
          className={drawerOpen ? classes.appBarWidth : classes.appBar}
        >
          <Toolbar>
            <Header handleLeftDrawerToggle={handleLeftDrawerToggle} />
          </Toolbar>
        </AppBar>

        {/* drawer */}
        <Sidebar
          drawerOpen={drawerOpen}
          drawerToggle={handleLeftDrawerToggle}
        />

        {/* main content */}
        <main
          className={clsx([
            classes.content,
            {
              [classes.contentShift]: drawerOpen,
            },
          ])}
        >
          <div>{children}</div>
        </main>
      </div>
    </ProfileDetailsContext.Provider>
  );
};

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
