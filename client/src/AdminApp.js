import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//* Import Pages -- ADMIN
import Account from "./Pages/Account/Account";
import AboutAdmin from "./Pages/AboutAdmin/AboutAdmin";
import Event from "./Pages/Event/Event";
import Section from "./Pages/Section/Section";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import Footer from "./Components/Guide/Components/footer/Footer";
import Buy from "./Components/Guide/Pages/Buy/Buy";

// * Import Custom  Components
import Navbar from "./Components/Navbar/Navbar";

export default function AdminApp({ match }) {
  return (
    <div
      // This and the next <div> styles are for putting the footer at bottom
      aria-label="page-container"
      style={{ position: "relative", minHeight: "100vh" }}
    >
      <div
        aria-label="content-wrap"
        // style={{ paddingBottom: "353px" }}
        // ! this padding represents footer's height HARDCODED
      >
        {/* <Navbar /> */}
        <Route path="/admin/account" component={Account} />
        <Route path="/admin/about" component={AboutAdmin} />
        <Route exact path="/admin/event/:name" component={Event} />
        {/* sections takes id or name */}
        <Route exact path="/admin/event/sections/:id" component={Section} />
      </div>
    </div>
  );
}
