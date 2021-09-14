import React from "react";
import { Route, Switch } from "react-router-dom";

//* Import Pages -- GUIDE
import Guide from "./Components/Guide/Guide";
import Settings from "./Components/Guide/Pages/Settings/Settings";
import SectionGuide from "./Components/Guide/Pages/Section/Section";
import Map from "./Components/Guide/Pages/Map/Map";

// * Import Custom  Components
import BottomNavBar from "./Components/Guide/Components/Navbar/BottomNavBar";

export default function GuideApp({ match }) {
  return (
    <div>
      <BottomNavBar />
      <Switch>
        <Route exact path="/events/settings" component={Settings} />
        <Route exact path="/events/:name/map" component={Map} />
        <Route exact path="/events/:name" component={Guide} />
        <Route
          exact
          path="/events/:name/sections/:id"
          component={SectionGuide}
        />
      </Switch>
    </div>
  );
}
