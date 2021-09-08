/**
* @desc Components to render the contents into one section in <Section/> 
// * just forwqards <SectionPreview /> from admin 
*/

import React from "react";
import SectionPreview from "../../../SectionPreview/SectionPreview";

const SectionRender = (props) => {
  const { contents, sectionCover, description } = props;
  return (
    <SectionPreview
      contents={contents}
      sectionCover={sectionCover}
      sectionDescriptio={description}
    />
  );
};

export default SectionRender;
