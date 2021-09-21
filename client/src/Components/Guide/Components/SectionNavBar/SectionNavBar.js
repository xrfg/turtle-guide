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

import CustomIconButton from "../../../Buttons/CustomIconButtons/CustomIconButton";

//mui
import { MobileStepper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import { ourColors } from "../../../../styles/Theme";

const useStyles = makeStyles((theme) => ({
  // "@global": {
  //   // ... global styles here

  //   body: {
  //     margin: 0,
  //   },
  // },
  navWrapper: {
    position: "fixed",
    width: "100%",
    height: "60px",
    // transitionTimingFunction: "ease-in",
    // transition: "all 1s",
    zIndex: "1000",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: ourColors.gainsboro,
    boxShadow: "7px 13px 9px -7px rgba(0,0,0,0.08)",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: ourColors.gainsboro,
    // height: "3rem",
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "1rem",
    color: ourColors.jet,
  },
  // navFade: {
  //   backgroundColor: ourColors.gainsboro,
  // },
  stepper: {
    position: "absolute",
    marginTop: "5px",
    marginBottom: "5px",
    backgroundColor: "transparent",
  },
}));
const SectionNavBar = () => {
  // * Hooks
  const classes = useStyles();
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
    <div>
      <div className={`${classes.navWrapper}`}>
        <>
          <div className={classes.nav}>
            <CustomIconButton
              disabled={idPrevSection ? false : true}
              onClickFunc={() =>
                goToSection(
                  history,
                  idPrevSection,
                  0,
                  idCurrentSection,
                  eventSlug,
                  nameIdentifier,
                  "prev" // gives the direction prev/next for the animation
                )
              }
              icon="prev"
            />
            <h4 className={classes.sectionTitle}>{event?.title}</h4>
            <CustomIconButton
              disabled={idNextSection ? false : true}
              onClickFunc={() =>
                goToSection(
                  history,
                  idNextSection,
                  0,
                  idCurrentSection,
                  eventSlug,
                  nameIdentifier,
                  "next" // gives the direction prev/next for the animation
                )
              }
              icon="next"
            />
          </div>
          <MobileStepper
            className={classes.stepper}
            variant="dots"
            steps={event.sections.length}
            position="static"
            activeStep={indexCurrentSection}
          />
        </>
      </div>
    </div>
  );
};

export default SectionNavBar;
