/**
 * @desc Bottom navbar for the guide, mobile style
 */

import React, { useState, useEffect } from "react";

// * Mat Ui Imports
import { makeStyles } from "@material-ui/core/styles";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import { Settings, Map, DirectionsWalk, Home } from "@material-ui/icons";

// * Custom Hooks
import useGetEvent from "../../Hooks/useGetEvent";

// react router //
import { Link } from "react-router-dom";
import { ourColors } from "../../../../styles/Theme";

// our theme
import { theme } from "../../../../styles/Theme";

const useStyles = makeStyles((theme) => ({
  footer: {
    ...theme.guide.bottomNavBar,
    height: "70px",
    position: "fixed",
    bottom: "0",
    width: "100%",
    zIndex: "1000", // brings it on top of everything
    borderTop: `1px solid grey`,
  },
}));

export default function BottomNavBar(props) {
  const { position } = props;
  const classes = useStyles();

  // * States
  const [value, setValue] = useState("home");

  //* Custom Hooks
  const event = useGetEvent();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // in case loads directly
  // sets the navbar icons
  // fired by props passed from <GuideApp/>
  useEffect(() => {
    if (position.includes("sections")) {
      setValue("event");
    }
    if (position.includes("map")) {
      setValue("map");
    }
    if (position.includes("settings")) {
      setValue("settings");
    }
    if (!position.includes(event.slug)) {
      setValue("home");
    }
    //eslint-disable-next-line
  }, [position]);

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.footer}
    >
      <BottomNavigationAction
        className={classes.navLink}
        // * Intro of the exhibition
        component={Link}
        to={event && `/events/${event.slug}`} // intro is always the first slide
        label="Home"
        value="home"
        icon={<Home />}
        style={
          value === "home"
            ? { color: theme.guide.bottomNavBar.iconSelectedColor }
            : { color: theme.guide.bottomNavBar.iconNormalColor }
        }
      />

      <BottomNavigationAction
        className={classes.navLink}
        // * Exhibition Main Page
        component={Link}
        to={event && `/events/${event.slug}/sections/`}
        label="Event"
        value="event"
        icon={<DirectionsWalk />}
        style={
          value === "event"
            ? { color: theme.guide.bottomNavBar.iconSelectedColor }
            : { color: theme.guide.bottomNavBar.iconNormalColor }
        }
      />
      {/* 
      <BottomNavigationAction
        className={classes.navLink}
        // * Exhibition Map Page
        component={Link}
        to={event && `/events/${event.slug}/map/`}
        label="Map"
        value="map"
        icon={<Map />}
        style={
          value === "map"
            ? { color: theme.guide.bottomNavBar.iconSelectedColor }
            : { color: theme.guide.bottomNavBar.iconNormalColor }
        }
      /> */}

      <BottomNavigationAction
        className={classes.navLink}
        // * App Settings page
        component={Link}
        to={event && `/events/${event.slug}/settings/`}
        label="Settings"
        value="settings"
        icon={<Settings />}
        style={
          value === "settings"
            ? { color: theme.guide.bottomNavBar.iconSelectedColor }
            : { color: theme.guide.bottomNavBar.iconNormalColor }
        }
      />
    </BottomNavigation>
  );
}
