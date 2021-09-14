import React from "react";

// * Mat Ui Imports
import { makeStyles } from "@material-ui/core/styles";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import { Settings, Map, DirectionsWalk, Home } from "@material-ui/icons";

// react router
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  footer: {
    position: "fixed",
    bottom: "0",
    width: "100%",
    backgroundColor: "#D9D9D9",
    zIndex: "1000", // brings it on top of everything
  },
});

export default function BottomNavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState("event");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // TODO Fix the Routing "/example" on the different links

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.footer}
    >
      <BottomNavigationAction
        // * Museum Page
        component={Link}
        to="/"
        label="Home"
        value="home"
        icon={<Home />}
      />

      <BottomNavigationAction
        // * Exhibition Main Page
        component={Link}
        to="/events/:name"
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
