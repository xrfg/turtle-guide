import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Event from "./Pages/Event/Event";
import Navbar from "./Components/Navbar/Navbar";


export default function Guide() {
  // Guide.js wraps all the VISITOR sees
  return (
    <BrowserRouter>
    {/* Wraping all the guide */}
      <div>
    <Navbar/>
     
         </div>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
        <Route path="/guide">
          <Navbar />
        </Route>
        <Route exact path="/:id" component={Event} />
      </Switch>
    </BrowserRouter>
  );
}
