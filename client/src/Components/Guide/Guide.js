import React from "react";

import "./guide.scss";

// * Pages
import Home from "./Pages/Home/Home";

// * Components
import Spinner from "../../Components/Spinner/Spinner";

import useGetAndSaveEvent from "../Guide/Hooks/useGetAndSaveEvent";

export default function Guide(props) {
  // name of the event to fetch
  const name = props.match.params.name;

  // call hook
  const event = useGetAndSaveEvent(name);

  return (
    <>
      {/* Wraping all the guide */}
      <div>
        {!event ? (
          <Spinner />
        ) : (
          <Home
            eventSlug={event.slug}
            nameIdentifier={event.nameIdentifier}
            title={event.title}
            sections={event.sections}
          />
        )}
      </div>
    </>
  );
}
