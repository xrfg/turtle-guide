import React from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";

// * Mat UI
import { Typography } from "@material-ui/core";

//* Import Pages -- GUIDE
import Guide from "./Components/Guide/Guide";
import Settings from "./Components/Guide/Pages/Settings/Settings";
import SectionGuide from "./Components/Guide/Pages/Section/Section";
import Map from "./Components/Guide/Pages/Map/Map";
import Intro from "./Components/Guide/Pages/Intro/Intro";

// * Import Custom  Components
import BottomNavBar from "./Components/Guide/Components/Navbar/BottomNavBar";
import PageNotFoundGuide from "./Components/Guide/Components/PageNotFoundGuide/PageNotFoundGuide";

// * Imports
import { AnimatePresence } from "framer-motion";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";
import { FullScreen, useFullScreenHandle } from "react-full-screen";

export default function GuideApp({ match }) {
  // * Hooks
  const location = useLocation();
  const handle = useFullScreenHandle();

  return (
    <>
      {!isMobile ? (
        <Typography
          component="span"
          variant="h3"
          color="inherit"
          // className={classes.imageTitle}
        >
          The guide is not avaible on desktop, please load it with a smartphone.
        </Typography>
      ) : (
        <FullScreen handle={handle}>
          <MobileView>
            {/* // to fire the position in the navbar */}
            <BottomNavBar position={window.location.pathname} />
            <AnimatePresence exitBeforeEnter>
              {/* location is important for the animation */}
              <Switch location={location} key={location.key}>
                <Route
                  exact
                  path="/events/:name/settings"
                  component={Settings}
                />
                <Route exact path="/events/:name/map" component={Map} />
                <Route exact path="/events/:name" component={Intro} />
                <Route exact path="/events/:name/sections/" component={Guide} />
                <Route
                  exact
                  path="/events/:name/sections/:id"
                  component={SectionGuide}
                />
                <Route path="/404guide" component={PageNotFoundGuide} />
                <Redirect to="/404guide" />
              </Switch>
            </AnimatePresence>
          </MobileView>
        </FullScreen>
      )}
    </>
  );
}
