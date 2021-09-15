import React from "react";

import { Link } from "react-router-dom";

// Component Imports
import CustomIconButton from "../../../Buttons/CustomIconButtons/CustomIconButton";
import CustomButton from "../../../Buttons/CustomButtons/CustomButton";

// MatUi Style Imports
import { Grid } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import { ourColors, theme } from "../../../../styles/Theme"; // our CUSTOM theme
const myTheme = theme;

const useStyles = makeStyles((theme) => ({
  gridSection: {
    ...theme.guide.settings.gridSection,
  },
}));

export default function SettingsLink(props) {
  const classes = useStyles();

  const { text, icon, slug, link } = props;

  return (
    <Grid
      className={classes.gridSection}
      container
      alignItems="center"
      justifyContent="space-between"
      component={link ? Link : "div"}
      to={slug}
    >
      <Grid item>{text}</Grid>
      <Grid item>
        <CustomIconButton
          style={{ margin: 0, padding: 0 }}
          icon={icon}
          disabled={true}
        />
      </Grid>
    </Grid>
  );
}
