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
      display: "flex",
    },
    // ! Just a test can be removed
    image: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "300px",
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
      <Container maxWidth="xs">
        {sectionCover.url === "" ? (
          <h1>No cover image yet, please choose one</h1>
        ) : (
          <img
            className={classes.image}
            alt="section-cover"
            src={sectionCover.url}
          />
        )}
        <ReactQuill
          value={sectionDescription}
          readOnly={true}
          theme={"bubble"}
        />
        {sectionTitle}
        {/* // * mapping to render divided by types */}
        {contents.map((x) => {
          /* images */
          if (x.type === "image") {
            return (
              <img
                className={classes.image}
                alt="complex"
                src={x.content.url}
              />
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
