/**
 * @desc Component to handle the contents into the Section
 */

import React from "react";
import AboutAdmin from "../AboutAdmin/AboutAdmin";

const Section = (props) => {
  // destru
  const { id } = props;

  // ! SEND ID
  return <AboutAdmin id={id} />;
};

export default Section;
