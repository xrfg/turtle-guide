/**
 * @desc Component to create  a section
 */

import React, { useState, useEffect } from "react";
// * Componentns
import SectionRender from "../../Components/SectionRender/SectionRender";
import Spinner from "../../../Spinner/Spinner";

import useGetAndSaveEvent from "../../Hooks/useGetAndSaveEvent";
import useEventSection from "../../Hooks/useEventSection";

// * Redux
import { useSelector } from "react-redux";

const Section = (props) => {
  const { id, eventSlug, nameIdentifier } = props.location.state;

  const idSection = id;

  // * HOOKS
  // hook that gets the right section providing an id
  const section = useEventSection(idSection);
  // * States
  // const [section, setSection] = useState(null);
  console.log("section", section);

  // if section is null the event is not loaded into eventGuide in redux

  // const event = useGetAndSaveEvent(nameIdentifier, section);

  console.log("Section event", event);

  //  useEffect(() => {
  //  setSection(event.sections)
  //  }, [event])

  return (
    <>
      {section === null ? (
        <Spinner />
      ) : (
        <SectionRender
          contents={section.contents}
          sectionCover={section.sectionCover}
          sectionDescription={section.description}
          sectionTitle={section.title}
        />
      )}
    </>
  );
};

export default Section;
