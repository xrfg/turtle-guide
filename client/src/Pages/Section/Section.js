/**
 * @desc Component to handle the contents into the Section
 */

import React from "react";
import SectionContentManager from "../../Components/SectionContentManager/SectionContentManager";
// import CustomMessage from "../../Components/CustomMessage";
import Test from "../../Components/Test";

const Section = (props) => {
  console.log("section", props);
  // destru
  const {
    location: { state },
  } = props;

  // ! SEND ID
  return <SectionContentManager state={state} />;
};

export default Section;
