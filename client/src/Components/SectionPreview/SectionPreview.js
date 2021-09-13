/**
 * @desc Component that preview the Sections or
 * renders the sections into the Guide/Event
 * @requires props "contents" <SectionPreview contents={ } sectionCover={} sectionDescriptio={}/>
 */

// TODO Add video render from cloudinary
// TODO clean code

import React, { useEffect } from "react";

// * Mat UI
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// * Components
import VideoPlayerFunction from "../VideoPlayerFunction/VideoPlayerFunction";


import theme from '../../styles/Theme'
// needed to render Rich text
import ReactQuill from "react-quill"; // ES6

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
      maxWidth: 345,
    },
    // * Custom CSS
    // Custom margins container buttons
    //     gridContainer: {
    //       marginTop: "10px",
    //       marginBottom: "10px",
    //       backgroundColor: theme.palette.common.blue,
    //     },
    //     // Custom margins nested grid
    //     // ! Classes created but not styled yet
    //     containerGrids: {},
    //     gridContent: {},
    //     gridPreview: {},
    mainContainer: {
      margin:"0",
      padding:"0",
      display: "flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      backgroundColor:theme.palette.common.white,
    },
    sectionCover:{
      width:"100%",
      boxShadow:"0px 4px 10px 1px rgba(193,191,118,0.9)",
    },
    sectionDescription:{
      marginTop:"10px",
      fontWeight:"500",
      letterSpacing:"0.400222px"
    },
    // ! Just a test can be removed
    image: {
      display: "flex",
      flexDirection: "column",
      justifyContent:"center",
      alignItems: "center",
      marginBottom:"20px",
      borderRadius:"3px",
      boxShadow:"0px 1px 7px 0px rgba(247,245,156,0.9)",
    },
    btnSection: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
    },
    overview: {
      height: "fit-content",
    },
    input: {
      display: "none",
    },
    media: {
      height: 140,
    },
  })
);

const SectionPreview = (props) => {
  const classes = useStyles();

  // destru
  const { contents, sectionCover, sectionDescription, sectionTitle } = props;

  return (
    <>
      <Container maxWidth="xs" className={classes.mainContainer}>
        {sectionCover.url === "" ? (
          <h1>No cover image yet, please choose one</h1>
        ) : (
          <img
            className={classes.sectionCover}
            alt="section-cover"
            src={sectionCover.url}
          />
        )}
        <ReactQuill
        className={classes.sectionDescription}
          value={sectionDescription}
          readOnly={true}
          theme={"bubble"}
        />
        {sectionTitle}
        {/* // * mapping to render divided by types */}
        {contents.map((x) => {
          /* images */
          if (x.type === "image") {
            console.log("x.content.caption?", x.content);
            return (
              <>
                <img
                  className={classes.image}
                  alt="complex"
                  src={x.content.url}
                />
                <h3>{x.content.caption?.title}</h3>
                <h4>{x.content.caption?.description}</h4>
              </>
            );
          }

          /*  video */
          if (x.type === "video") {
            const videoOptions = {
              cloudName: "dhdgj2ryu",
              public_id: x.content.public_id,
            };
            return (
              <div className="video-card">
                <h2>Video Player in Function</h2>
                <div className="vp">
                  <VideoPlayerFunction options={videoOptions} />
                </div>
              </div>
            );
          }

          /*  text */
          if (x.type === "text") {
            return (
              <ReactQuill value={x.content} readOnly={true} theme={"bubble"} />
            );
          }
          return null;
        })}
      </Container>
    </>
  );
};

export default SectionPreview;
