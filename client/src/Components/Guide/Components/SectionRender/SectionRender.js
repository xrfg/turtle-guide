/**
* @desc Components to render the contents into one section in <Section/> 
// * just forwards <SectionPreview /> from admin 
*/

import React from "react";
import SectionPreview from "../../../SectionPreview/SectionPreview";

const SectionRender = (props) => {
  const { contents, sectionCover, sectionDescription, sectionTitle } = props;
  return (
    <SectionPreview
      contents={contents}
      sectionCover={sectionCover}
      sectionDescription={sectionDescription}
      sectionTitle={sectionTitle}
    />
  );
};

export default SectionRender;
