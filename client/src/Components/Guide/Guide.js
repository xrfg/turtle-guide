import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Event from "./Pages/Event/Event";
import Navbar from "./Components/Navbar/Navbar";
// import Footer from "./Components/Footer/Footer";

export default function Guide() {
  // Guide.js wraps all the VISITOR sees
  return (
    <>
      <BrowserRouter>
        {/* Wraping all the guide */}
        <div>
          <Navbar />
        </div>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/guide">
            <Home />
          </Route>
          <Route exact path="/:id" component={Event} />
        </Switch>
      </BrowserRouter>

      {/* <Footer /> */}
    </>
  );
}
