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
  const { id, direction } = props.location.state;

  console.log("props.location.state", props.location.state.direction);

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
        ease: "easeInOut",
      },
    },
    visible: {
      opactity: 1,
      transition: { delay: 0, duration: 0.5 },
      x: 0,
    },
    exit: {
      opactity: 0,
      // x: `${direction === "next" ? "100vw" : "-100vw"}`,
      transition: {
        ease: "easeInOut",
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
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
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
