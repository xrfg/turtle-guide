import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";

//* Import Pages -- GUIDE
import Guide from "./Components/Guide/Guide";
import Settings from "./Components/Guide/Pages/Settings/Settings";
import SectionGuide from "./Components/Guide/Pages/Section/Section";
import Map from "./Components/Guide/Pages/Map/Map";

// * Import Custom  Components
import BottomNavBar from "./Components/Guide/Components/Navbar/BottomNavBar";

// * Imports
import { AnimatePresence } from "framer-motion";

export default function GuideApp({ match }) {
  // * Hooks
  const location = useLocation();
  return (
    <>
      <BottomNavBar />
      <AnimatePresence>
        {/* location is important for the animation */}
        <Switch location={location} key={location.key}>
          <Route exact path="/events/settings" component={Settings} />
          <Route exact path="/events/:name/map" component={Map} />
          <Route exact path="/events/:name" component={Guide} />
          <Route
            exact
            path="/events/:name/sections/:id"
            component={SectionGuide}
          />
        </Switch>
      </AnimatePresence>
    </>
  );
}
