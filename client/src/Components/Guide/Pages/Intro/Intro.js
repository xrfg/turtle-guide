/**
 * @desc Page that renders the intro page
 * where the user lands
 * forwards everything to <Section />
 */

import React from "react";

// *Imp
import Section from "../Section/Section";

const Intro = () => {
  // sends is intro to load the intro as landing page for the user
  return <Section isIntro={true} />;
};

export default Intro;
