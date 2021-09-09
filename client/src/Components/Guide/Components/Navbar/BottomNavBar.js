import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";

import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import { Settings, Map, DirectionsWalk, Home } from "@material-ui/icons";
// import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
  footer: {
    position: "fixed",
    bottom: "0",
    width: "100%",
    backgroundColor: "#D9D9D9",
  },
});

export default function BottomNavBar() {
  const classes = useStyles();
  const [value, setValue] = React.useState("event");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.footer}
    >
      <BottomNavigationAction label="Home" value="home" icon={<Home />} />

      <BottomNavigationAction
        label="Event"
        value="event"
        icon={<DirectionsWalk />}
      />

      <BottomNavigationAction label="Map" value="map" icon={<Map />} />

      <BottomNavigationAction
        label="Settings"
        value="settings"
        icon={<Settings />}
      />
    </BottomNavigation>
  );
}
