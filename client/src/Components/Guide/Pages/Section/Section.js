/**
 * @desc Component to create  a section
 */

import React from "react";
import SectionRender from "../../Components/SectionRender/SectionRender";

const Section = (props) => {
  console.log("Section", props.location.state.sectionData);

  const { contents, sectionCover, description } =
    props.location.state.sectionData;

  return (
    <SectionRender
      contents={contents}
      sectionCover={sectionCover}
      sectionDescriptio={description}
    />
  );
};

export default Section;
