import React, { useState } from "react";

import { Link } from "react-router-dom";

import useGetEvent from "../../Hooks/useGetEvent";

// logo
import logoFilled from "../../../../assets/images/logo/turtle_logo-filled.png";

// Component Imports
import CustomIconButton from "../../../Buttons/CustomIconButtons/CustomIconButton";
import SettingsLink from "../../Components/SettingsLink/SettingsLink";

// MatUi Style Imports
import {
  Container,
  Typography,
  Grid,
  Paper,
  InputBase,
} from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: { ...theme.guide.container },
  gridSection: {
    ...theme.guide.settings.gridSection,
  },
  settingsHeader: {
    ...theme.guide.settings.header,
  },
  newsletterForm: { display: "flex", width: "100%" },
  emailInput: { flex: "1", marginLeft: "1rem" },
}));

export default function Settings() {
  const classes = useStyles();

  //* States
  const [language, setLanguage] = useState("en");

  // * custom Hooks
  const event = useGetEvent();

  const handleLanguage = (e, newLanguage) => {
    setLanguage(newLanguage);
  };
  // follow us on social media

  // opening hours
  // adress

  // logo

  // newsletter
  // mail input -> subscribe

  // change language
  // change fontsize
  // theme???

  // time left before token expires

  // donate

  // contact us

  //food and Beverages
  // Photography Policy

  console.log(event);

  return (
    <Container className={classes.container} maxWidth="sm">
      <Grid container direction="row">
        {/* // * Header */}
        <Grid
          className={`${classes.gridSection} ${classes.settingsHeader}`}
          container
          alignItems="center"
          component={Link}
          to={event ? `/events/${event.slug}` : null}
        >
          <Grid item style={{ position: "absolute" }}>
            <CustomIconButton icon="prev" disabled={true} />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Settings
            </Typography>
          </Grid>
        </Grid>

        {/* // * Contents */}
        <Grid
          className={classes.gridSection}
          container
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item>Language</Grid>
          <Grid item>
            <ToggleButtonGroup
              exclusive
              value={language}
              onChange={handleLanguage}
              aria-label="language settings"
            >
              <ToggleButton value="en">en</ToggleButton>
              <ToggleButton value="de">de</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
        <SettingsLink text="Time left: 00 minutes" icon={null} />
        <SettingsLink
          text="Food and Beverages"
          icon="next"
          slug="/events/food-and-beverages"
          link={true}
        />
        <SettingsLink
          text="Photography Policy"
          icon="next"
          slug="/events/policy"
          link={true}
        />
        <Grid className={classes.gridSection} container alignItems="center">
          <Grid item xs={12}>
            <Typography
              style={{ marginBottom: "1rem" }}
              variant="h5"
              align="center"
            >
              Newsletter
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ marginBottom: "1rem" }} align="center">
              Subscribe to our newsletter!
            </Typography>
          </Grid>
          <Paper className={classes.newsletterForm}>
            <InputBase
              className={classes.emailInput}
              placeholder="Enter your email address"
              inputProps={{ "aria-label": "enter your email address" }}
              variant="outlined"
              fullWidth
            />
            <CustomIconButton icon="forward" type="submit" />
          </Paper>
        </Grid>
        <SettingsLink
          text="Contact us"
          icon="next"
          slug="/events/contact"
          link={true}
        />
        <SettingsLink
          text="Donate"
          icon="next"
          slug="/events/donate"
          link={true}
        />
        <SettingsLink
          text="Privacy"
          icon="next"
          slug="/events/privacy"
          link={true}
        />

        <Grid
          container
          xs={12}
          className={classes.gridSection}
          alignItems="center"
        >
          <img
            style={{ width: "80%", margin: "0 auto" }}
            src={logoFilled}
            alt="logo"
          />
        </Grid>
      </Grid>
    </Container>
  );
}
