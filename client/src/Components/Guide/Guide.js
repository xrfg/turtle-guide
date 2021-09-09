import React, { useState, useEffect } from "react";
import axios from "axios";

import "./guide.scss";

import { BrowserRouter, Switch, Route } from "react-router-dom";

// * Pages
import Home from "./Pages/Home/Home";
import Event from "./Pages/Event/Event";

// * Components
import Navbar from "./Components/Navbar/Navbar";
import Spinner from "../../Components/Spinner/Spinner";

import useGetAndSaveEvent from "../Guide/Hooks/useGetAndSaveEvent";
export default function Guide(props) {
  // TODO REMOVE
  const baseURL = "http://localhost:5000/api/events/";
  // * States

  // name of the event to fetch
  const name = props.match.params.name;
  const event = useGetAndSaveEvent(name);

  return (
    <>
      {/* Wraping all the guide */}
      <div>
        <Navbar />
        {!event ? (
          <Spinner />
        ) : (
          <Home
            eventSlug={event.data.slug}
            title={event.data.title}
            sections={event.data.sections}
          />
        )}
      </div>
    </>
  );
}
