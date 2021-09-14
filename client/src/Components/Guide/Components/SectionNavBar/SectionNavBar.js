/**
* @desc Component for the top section of the sections 
to navigate through them 
*/

import React from "react";
import { useHistory } from "react-router-dom";

// * Imports
import {
  goToSection,
  extractNameIdentifier,
  getSectionFromAddress,
} from "../../Functions/functions";
import useGetEvent from "../../Hooks/useGetEvent";
import useGetAndSaveEvent from "../../Hooks/useGetAndSaveEvent";

const SectionNavBar = () => {
  // * Hooks
  const history = useHistory();
  const event = useGetEvent();

  // idCurrentSection is the current index in the array of the section
  const idCurrentSection = getSectionFromAddress(window.location.pathname);
  // find current index in sections array
  const indexCurrentSection = event.sections.findIndex(
    (x) => x.id === idCurrentSection
  );

  // extract the ids of the prev/next sections using the current index
  const idPrevSection = event.sections[indexCurrentSection - 1]?.id; //
  const idNextSection = event.sections[indexCurrentSection + 1]?.id;

  // extract in case the page is called directly
  const nameIdentifier = extractNameIdentifier(window.location.pathname);
  const eventSlug = nameIdentifier;

  /**
   * @desc the param section is used in case the page is called
   * directly without passing by <Guide/> or <Home/>
   * if section is null the hook returns otherwise by default returns null
   * cause is already called from <Guide />
   */
  useGetAndSaveEvent(nameIdentifier, event);

  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "15px" }}>
      {idPrevSection === undefined ? null : (
        <button
          style={{ padding: "5px" }}
          onClick={() =>
            goToSection(
              history,
              idPrevSection,
              0,
              idCurrentSection,
              eventSlug,
              nameIdentifier
            )
          }
        >
          {"<"}
        </button>
      )}
      <h5 style={{ padding: "5px" }}>{event?.title}</h5>

      {idNextSection === undefined ? null : (
        <button
          style={{ padding: "5px" }}
          onClick={() =>
            goToSection(
              history,
              idNextSection,
              0,
              idCurrentSection,
              eventSlug,
              nameIdentifier
            )
          }
        >
          {">"}
        </button>
      )}
    </div>
  );
};

export default SectionNavBar;
