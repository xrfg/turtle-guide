/**
* @desc Components to render the contents into one section in <Section/> 
// * just forwqards <SectionPreview /> from admin 
*/

import React from "react";
import SectionPreview from "../../../SectionPreview/SectionPreview";

const SectionRender = (props) => {
  const { contents, sectionCover, description, sectionTitle } = props;
  return (
    <SectionPreview
      contents={contents}
      sectionCover={sectionCover}
      sectionDescription={description}
      sectionTitle={sectionTitle}
    />
  );
};

export default SectionRender;
