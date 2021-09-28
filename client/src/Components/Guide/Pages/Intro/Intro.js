/**
 * @desc Page that renders the intro page
 * where the user lands
 * forwards everything to <Section />
 */

import React from "react";

// *Imp
import Section from "../Section/Section";
import useGetAndSaveEvent from "../../Hooks/useGetAndSaveEvent";

const Intro = (props) => {
  // name of the event to fetch
  const name = props.match.params.name;

  // * HOOKS

  /**
   * @desc need to be called to load the event
   */
  useGetAndSaveEvent(name);

  // sends is intro to load the intro as landing page for the user
  return <Section isIntro={true} />;
};

export default Intro;
