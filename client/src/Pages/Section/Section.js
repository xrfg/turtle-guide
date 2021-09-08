/**
 * @desc Component to handle the contents into the Section
 */

import React from "react";
import SectionContentManager from "../../Components/SectionContentManager/SectionContentManager";

const Section = (props) => {
  // destru
  const {
    location: { state },
  } = props;

  return <SectionContentManager state={state} />;
};

export default Section;
