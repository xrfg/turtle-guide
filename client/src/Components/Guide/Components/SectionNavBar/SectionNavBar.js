/**
* @desc Component for the top section of the sections 
to navigate through them 
*/

import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// * Imports
import {
  goToSection,
  extractNameIdentifier,
  getSectionFromAddress,
} from "../../Functions/functions";
import useGetEvent from "../../Hooks/useGetEvent";
import useGetAndSaveEvent from "../../Hooks/useGetAndSaveEvent";

//mui
import { makeStyles } from "@material-ui/core";
import { ourColors } from "../../../../styles/Theme";

const useStyles = makeStyles((theme) => ({
  nav: {
    position: "fixed",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "1.2rem 0 1.2rem 0 ",
    height: "20px",
    width: "100%",
    transitionTimingFunction: "ease-in",
    transition: "all 1.2s",
    zIndex: "1000",
  },

  navBtn: {
    margin: "0.5rem",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    letterSpacing: "0.50000px",
    fontFamily: theme.typography.fontFamily,
    textTransform: "capitalize",
    color: "#2e2e28",
    margin: "0 10px 0 10px",
  },
  navFade: {
    backgroundColor: ourColors.gainsboro,
  },
}));
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

  const [show, handleShow] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        handleShow(true);
      } else {
        handleShow(false);
      }
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const classes = useStyles();

  return (
    <div className={`${classes.nav} ${show && `${classes.navFade}`} `}>
      {idPrevSection === undefined || show === false ? null : (
        <button
          className={classes.navBtn}
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
      <h4 className={classes.sectionTitle}>{event?.title}</h4>

      {idNextSection === undefined || show === false ? null : (
        <button
          className={classes.navBtn}
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
