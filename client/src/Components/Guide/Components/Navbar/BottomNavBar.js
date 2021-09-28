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

  console.log("event", event);

  // in case loads directly
  useEffect(() => {
    console.log("LOAD NAVBAR", position);

    if (!position.includes(event.slug)) {
      setValue("home");
    }
    if (position.includes("sections")) {
      setValue("event");
    }
    if (position.includes("settings")) {
      setValue("settings");
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
        to={event && `/events/${event.slug}/map/`}
        label="Map"
        value="map"
        icon={<Map />}
      />

      <BottomNavigationAction
        // * App Settings page
        component={Link}
        to={event && `/events/${event.slug}/settings/`}
        label="Settings"
        value="settings"
        icon={<Settings />}
      />
    </BottomNavigation>
  );
}
