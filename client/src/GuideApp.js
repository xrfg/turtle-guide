import React from "react";
import { Route, Switch, useLocation, Redirect } from "react-router-dom";

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

export default function GuideApp({ match }) {
  // * Hooks
  const location = useLocation();

  return (
    <>
      {/* // to fire the position in the navbar */}
      <BottomNavBar position={window.location.pathname} />
      <AnimatePresence exitBeforeEnter>
        {/* location is important for the animation */}
        <Switch location={location} key={location.key}>
          <Route exact path="/events/:name/settings" component={Settings} />
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
    </>
  );
}
