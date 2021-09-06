/**
 * @desc Component to handle the contents into the Section
 */

import React from "react";
import SectionContentManager from "../../Components/SectionContentManager/SectionContentManager";

const Section = (props) => {
  // destru
  const { sectionId, eventNameIdentifier } = props;

  // ! SEND ID
  return (
    <SectionContentManager
      eventNameIdentifier={eventNameIdentifier}
      sectionId={sectionId}
    />
  );
};

export default Section;
