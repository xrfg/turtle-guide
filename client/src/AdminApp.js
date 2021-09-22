import React from "react";
import { Route,Redirect,Switch } from "react-router-dom";

// * classes for Footer handling and page
import "./app.css";


// components
import PageNotFoundAdmin from "./Components/PageNotFoundAdmin/PageNotFoundAdmin";
//* Import Pages -- ADMIN
import Account from "./Pages/Account/Account";
import AboutAdmin from "./Pages/AboutAdmin/AboutAdmin";
import Event from "./Pages/Event/Event";
import Section from "./Pages/Section/Section";

export default function AdminApp() {
  return (
    <>
    <Switch>
    <Route path="/admin/account" component={Account} />
      <Route path="/admin/about" component={AboutAdmin} />
      <Route exact path="/admin/event/:name" component={Event} />
      {/* sections takes id or name */}
      <Route exact path="/admin/event/sections/:id" component={Section} />
      <Route path="/404admin" component={PageNotFoundAdmin} />
      <Redirect to="/404admin"/>
      

    </Switch>
      
      
    </>
  );
}
