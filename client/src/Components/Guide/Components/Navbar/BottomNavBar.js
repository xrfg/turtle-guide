/**
 * @desc Bottom navbar for the guide, mobile style
 */

import React, { useState } from "react";

// * Mat Ui Imports
import { makeStyles } from "@material-ui/core/styles";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import { Settings, Map, DirectionsWalk, Home } from "@material-ui/icons";

// * Custom Hooks
import useGetEvent from "../../Hooks/useGetEvent";

// react router //
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  footer: {
    height: "70px",
    position: "fixed",
    bottom: "0",
    width: "100%",
    backgroundColor: "#D9D9D9",
    zIndex: "1000", // brings it on top of everything
  },
});

export default function BottomNavBar() {
  const classes = useStyles();

  // * States
  const [value, setValue] = useState("home");

  //* Custom Hooks
  const event = useGetEvent();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.footer}
    >
      <BottomNavigationAction
        // * Intro of the exhibition
        component={Link}
        to={event && `/events/${event.slug}`} // intro is always the first slide
        label="Home"
        value="home"
        icon={<Home />}
      />

      <BottomNavigationAction
        // * Exhibition Main Page
        component={Link}
        to={event && `/events/${event.slug}/sections/`}
        label="Event"
        value="event"
        icon={<DirectionsWalk />}
      />

      <BottomNavigationAction
        // * Exhibition Map Page
        component={Link}
        to="/events/:name/map"
        label="Map"
        value="map"
        icon={<Map />}
      />

      <BottomNavigationAction
        // * App Settings page
        component={Link}
        to="/events/settings"
        label="Settings"
        value="settings"
        icon={<Settings />}
      />
    </BottomNavigation>
  );
}
