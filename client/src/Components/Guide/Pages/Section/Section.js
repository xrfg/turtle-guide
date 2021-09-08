/**
 * @desc Component to create  a section
 */

import React, { useState, useEffect } from "react";
// * Componentns
import SectionRender from "../../Components/SectionRender/SectionRender";
import Spinner from "../../../Spinner/Spinner";

// * Redux
import { useSelector } from "react-redux";

const Section = (props) => {
  const { id, eventSlug } = props.location.state;
  // * HOOKS
  const events = useSelector((state) => state.events.events);
  // * States
  const [section, setSection] = useState(null);

  useEffect(() => {
    console.log("events", events);

    const getEvent = events.find((x) => x.eventSlug === eventSlug);
    console.log("getEvent", getEvent);
    const getSection = getEvent.sections.find((x) => x.id === id);
    console.log("getSection", getSection);
    setSection(getSection);
    //eslint-disable-next-line
  }, []);

  console.log(" id, eventSlug", id, eventSlug);
  console.log("section", section);

  return (
    <>
      {section === null ? (
        <Spinner />
      ) : (
        <SectionRender
        // contents={contents}
        // sectionCover={sectionCover}
        // sectionDescription={description}
        // sectionTitle={title}
        />
      )}
    </>
  );
};

export default Section;
