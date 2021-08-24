import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Event from "./Pages/Event/Event";

export default function Guide() {
  // Guide.js wraps all the VISITOR sees
  return (
    <BrowserRouter>
      <div>Wraping all the guide</div>;
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route exact path="/:id" component={Event} />
      </Switch>
    </BrowserRouter>
  );
}
