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
  navWrapper: {
    position: "fixed",
    width: "100%",
    height: "4.8rem",
    transitionTimingFunction: "ease-in",
    transition: "all 1s",
    zIndex: "1000",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    // height: "3rem",
  },
  sectionTitle: {
    fontSize: "1.2rem",
    color: ourColors.jet,
  },
  navFade: {
    backgroundColor: ourColors.gainsboro,
  },
  stepper: {
    position: "absolute",
    bottom: "5px",
    backgroundColor: "transparent",
  },
}));
const SectionNavBar = () => {
  const classes = useStyles();

  // * Hooks
  const history = useHistory();
  const event = useGetEvent();

  // * States
  const [show, handleShow] = useState(false);

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

  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      handleShow(true);
    } else {
      handleShow(false);
    }
    return () => {
      window.removeEventListener("scroll");
    };
  });

  return (
    <div>
      <div className={`${classes.navWrapper} ${show && classes.navFade}`}>
        {show === false ? null : (
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
                    nameIdentifier
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
                    nameIdentifier
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
        )}
      </div>
    </div>
  );
};

export default SectionNavBar;

{
  /* <div className={`${classes.nav} ${show && classes.navFade}`}>
{idPrevSection === undefined || show === false ? null : (
  <CustomIconButton
    onClickFunc={() =>
      goToSection(
        history,
        idPrevSection,
        0,
        idCurrentSection,
        eventSlug,
        nameIdentifier
      )
    }
    icon="prev"
  />
)}
{idNextSection === undefined || show === false ? null : (
  <>
    <h4 className={classes.sectionTitle}>{event?.title}</h4>
    <CustomIconButton
      onClickFunc={() =>
        goToSection(
          history,
          idNextSection,
          0,
          idCurrentSection,
          eventSlug,
          nameIdentifier
        )
      }
      icon="next"
    />
  </>
)}
</div>
 */
}
