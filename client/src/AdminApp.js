import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// * classes for Footer handling and page
import "./app.css";

//* Import Pages -- ADMIN
import Account from "./Pages/Account/Account";
import AboutAdmin from "./Pages/AboutAdmin/AboutAdmin";
import Event from "./Pages/Event/Event";
import Section from "./Pages/Section/Section";
import SignUp from "./Pages/SignUp/SignUp";
import SignIn from "./Pages/SignIn/SignIn";
import Footer from "./Components/Footer/Footer";
import Buy from "./Components/Guide/Pages/Buy/Buy";

// * Import Custom  Components
import Navbar from "./Components/Navbar/Navbar";

export default function AdminApp({ match }) {
  return (
    <div
      // This and the next <div> styles are for putting the footer at bottom
      aria-label="app-container"
      className="app-container"
    >
      <div aria-label="content-wrap" className="footer-padding">
        <Route path="/admin/account" component={Account} />
        {/* <Route exact path="/admin" component={SignUp} /> */}
        {/* <Route path="/signup" component={SignUp} /> */}
        {/* <Route path="/subscription" component={Subscription} /> */}
        {/* <Route path="/payment" component={Buy} /> */}
        <Route path="/admin/about" component={AboutAdmin} />
        <Route exact path="/admin/event/:name" component={Event} />
        {/* sections takes id or name */}
        <Route exact path="/admin/event/sections/:id" component={Section} />
      </div>
    </div>
  );
}
