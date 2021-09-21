/**
* @desc Components to render the contents into one section in <Section/> 
// * just forwards <SectionPreview /> from admin 
*/

import React from "react";
import SectionPreview from "../../../SectionPreview/SectionPreview";

// import { makeStyles } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   sectionContainer: {
//     // marginTop: "100px",
//   },
// }));

const SectionRender = (props) => {
  // * Hooks
  // const classes = useStyles();
  // Destruct
  const { contents, sectionCover, sectionDescription, sectionTitle } = props;

  return (
    // <div className={classes.sectionContainer}>
    <SectionPreview
      contents={contents}
      sectionCover={sectionCover}
      sectionDescription={sectionDescription}
      sectionTitle={sectionTitle}
    />
  );
};

export default SectionRender;
