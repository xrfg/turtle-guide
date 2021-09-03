/**
 * @desc Component to handle the contents into the Section
 */

import React from "react";
import AboutAdmin from "../AboutAdmin/AboutAdmin";

const Section = (props) => {
  // destru
  const { sectionId, eventNameIdentifier } = props;

  // ! SEND ID
  return (
    <AboutAdmin
      eventNameIdentifier={eventNameIdentifier}
      sectionId={sectionId}
    />
  );
};

export default Section;
