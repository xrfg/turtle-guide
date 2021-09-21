/**
 * @desc Component to create  a section
 */

import React, { useState, useEffect } from "react";

// * Imports
import { extractNameIdentifier } from "../../Functions/functions";
import { AnimatePresence, motion } from "framer-motion";

// * Componentns
import SectionRender from "../../Components/SectionRender/SectionRender";
import Spinner from "../../../Spinner/Spinner";
import SectionNavBar from "../../Components/SectionNavBar/SectionNavBar";

// * Import Hooks
import useGetAndSaveEvent from "../../Hooks/useGetAndSaveEvent";
import useEventSection from "../../Hooks/useEventSection";

const Section = (props) => {
  // direction is for the animation
  const { id, direction } = props.location.state;

  const idSection = id;

  // * HOOKS
  // hook that gets the right section providing an id
  const section = useEventSection(idSection);

  // extract in case the page is called directly
  const nameIdentifier = extractNameIdentifier(window.location.pathname);

  /**
   * @desc the param section is used in case the page is called
   * directly without passing by <Guide/> or <Home/>
   * if section is null the hook returns otherwise by default returns null
   * cause is already called from <Guide />
   */
  useGetAndSaveEvent(nameIdentifier, section);

  /**
   * @desc for the animation
   */
  const containerVariants = {
    hidden: {
      opactity: 0,
      // x: `${direction === "next" ? "100vw" : "-100vw"}`,
      transition: {
        // ease: "easeInOut",
        // delay: 0.15,
        // duration: 1.3,
      },
      x: 0,
    },
    visible: {
      opactity: 0,
      transition: {
        delay: 0,
        duration: 2.5,
        // ease: "easeInOut",
        when: "beforeChildren",
      },
      // x: 0,
      x: 0,
    },
    exit: {
      x: 0,
      opactity: 0,
      // x: `${direction === "next" ? "100vw" : "-100vw"}`,
      transition: {
        // ease: "easeInOut",
        // delay: 0.15,
        // duration: 1.3,
      },
    },
  };

  // TODO hidden scroll x
  return (
    <>
      {section === null ? (
        <Spinner />
      ) : (
        <>
          <SectionNavBar />
          <motion.div
            layout
            // variants={containerVariants}
            // initial="hidden"
            // animate="visible"
            // exit="exit"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 0.2 },
            }}
          >
            <SectionRender
              contents={section.contents}
              sectionCover={section.sectionCover}
              sectionDescription={section.description}
              sectionTitle={section.title}
            />
          </motion.div>
        </>
      )}
    </>
  );
};

export default Section;
