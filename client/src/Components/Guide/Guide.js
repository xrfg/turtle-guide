import React, { useState, useEffect } from "react";
import axios from "axios";

import { BrowserRouter, Switch, Route } from "react-router-dom";

// * Pages
import Home from "./Pages/Home/Home";
import Event from "./Pages/Event/Event";

// * Components
import Navbar from "./Components/Navbar/Navbar";
import Spinner from "../../Components/Spinner/Spinner";

// * baseURL

export default function Guide(props) {
  // TODO REMOVE
  const baseURL = "http://localhost:5000/api/events/";
  // * States
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  // name of the event to fetch
  const name = props.match.params.name;

  const getEvent = async () => {
    setLoading(true);
    try {
      const eventData = await axios.get(baseURL + name);
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

  return (
    <>
      {/* Wraping all the guide */}
      <div>
        <Navbar />
        {loading ? (
          <Spinner />
        ) : (
          <Home
            data={event}
            eventSlug={event.data.slug}
            title={event.data.title}
            sections={event.data.sections}
          />
        )}
      </div>
    </>
  );
}
