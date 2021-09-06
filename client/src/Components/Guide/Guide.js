import React, { useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter, Switch, Route } from "react-router-dom";

// * Pages
import Home from "./Pages/Home/Home";
import Event from "./Pages/Event/Event";

// * Components
import Navbar from "./Components/Navbar/Navbar";

// * baseURL

export default function Guide(props) {
  // console.log("props", props.match.params.name);

  const baseURL = "http://localhost:5000/api/events/";

  const [event, setEvent] = useState();
  const [loading, setLoading] = useState();

  const name = props.match.params.name;
  console.log(name);
  const getEvent = async () => {
    // setLoading(true);
    try {
      const eventData = await axios.get(baseURL + name);
      console.log(eventData.data);
      setEvent(eventData.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvent();
    //eslint-disable-next-line
  }, []);

  console.log(event);

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
    </>
  );
}
