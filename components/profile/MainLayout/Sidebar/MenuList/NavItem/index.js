import PropTypes from "prop-types";
import React from "react";
import Link from "next/link";

// material-ui
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  Chip,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import ListItemButton from "@material-ui/core/ListItemButton";

// assets
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { customization } from "components/profile/customization";

// style constant
const useStyles = makeStyles((theme) => ({
  listIcon: {
    minWidth: "18px",
    marginTop: "auto",
    marginBottom: "auto",
  },
  listCustomIconSub: {
    width: "6px",
    height: "6px",
  },
  listCustomIconSubActive: {
    width: "8px",
    height: "8px",
  },
  listItem: {
    marginBottom: "5px",
    alignItems: "center",
  },
  listItemNoBack: {
    marginBottom: "5px",
    backgroundColor: "transparent !important",
    paddingTop: "8px",
    paddingBottom: "8px",
    alignItems: "flex-start",
  },
  subMenuCaption: {
    ...theme.typography.subMenuCaption,
  },
}));

//-----------------------|| SIDEBAR MENU LIST ITEMS ||-----------------------//

const NavItem = ({ item, level }) => {
  const classes = useStyles();
  const matchesSM = useMediaQuery((theme) => theme.breakpoints.down("md"));

  const Icon = item.icon;
  const itemIcon = item.icon ? (
    <Icon stroke={1.5} size="1.3rem" className={classes.listCustomIcon} />
  ) : (
    <FiberManualRecordIcon
      className={
        customization.isOpen.findIndex((id) => id === item.id) > -1
          ? classes.listCustomIconSubActive
          : classes.listCustomIconSub
      }
      fontSize={level > 0 ? "inherit" : "default"}
    />
  );

  let itemIconClass = !item.icon ? classes.listIcon : classes.menuIcon;
  itemIconClass =
    customization.navType === "nav-dark"
      ? [itemIconClass, classes.listCustomIcon].join(" ")
      : itemIconClass;

  let itemTarget = "";
  if (item.target) {
    itemTarget = "_blank";
  }

  let listItemProps = {
    component: React.forwardRef((props, ref) => (
      <a {...props} href={item.url} />
    )),
  };
  if (item.external) {
    listItemProps = { component: "a", href: item.url };
  }

  // active menu item on page load
  React.useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split("/")
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      console.log("SOMETHING: ", item.id);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Link href={item.url}>
      <ListItemButton
        {...listItemProps}
        disabled={item.disabled}
        className={level > 1 ? classes.listItemNoBack : classes.listItem}
        sx={{ borderRadius: customization.borderRadius + "px" }}
        selected={customization.isOpen.findIndex((id) => id === item.id) > -1}
        onClick={() => {
          console.log("SOMETHING LIST: ", item.id);
        }}
        target={itemTarget}
        style={{ paddingLeft: level * 23 + "px" }}
      >
        <ListItemIcon className={itemIconClass}>{itemIcon}</ListItemIcon>
        <ListItemText
          primary={
            <Typography
              variant={
                customization.isOpen.findIndex((id) => id === item.id) > -1
                  ? "h5"
                  : "body1"
              }
              color="inherit"
            >
              {item.title}
            </Typography>
          }
          secondary={
            item.caption && (
              <Typography
                variant="caption"
                className={classes.subMenuCaption}
                display="block"
                gutterBottom
              >
                {item.caption}
              </Typography>
            )
          }
        />
        {item.chip && (
          <Chip
            color={item.chip.color}
            variant={item.chip.variant}
            size={item.chip.size}
            label={item.chip.label}
            avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
          />
        )}
      </ListItemButton>
    </Link>
  );
};

NavItem.propTypes = {
  item: PropTypes.object,
  level: PropTypes.number,
};

export default NavItem;
