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
  const { id, eventSlug, order, sectionIndex } = props.location.state;

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

  return (
    <>
      {section === null ? (
        <Spinner />
      ) : (
        <>
          <SectionNavBar />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
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
