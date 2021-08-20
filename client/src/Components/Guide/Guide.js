import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";

export default function Guide() {
  // Guide.js wraps all the VISITOR sees
  return (
    <BrowserRouter>
      <div>Wraping all the guide</div>;
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
