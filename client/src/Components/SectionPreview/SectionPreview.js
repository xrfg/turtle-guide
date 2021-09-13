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
import { Container, Button } from "@material-ui/core";

// * Components
import VideoPlayerFunction from "../VideoPlayerFunction/VideoPlayerFunction";

import theme from "../../styles/Theme";

// needed to render Rich text
import ReactQuill from "react-quill"; // ES6
import { transform } from "lodash";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > *": {
        // margin: theme.spacing(1),
        margin: "0",
        padding: "0",
      },

      backgroundColor: theme.palette.common.white,
      maxWidth: "100%",
      overflow: "hidden",
    },
    // * Custom CSS

    sectionCover: {
      marginLeft: "-20px",
      width: "115%",
      maxHeight: "150px",
      boxShadow: "0px 4px 10px 2px rgba(244,234,220,0.9)",
    },
    sectionDescription: {
      // margin: "10px 0 40px 0",
      fontWeight: "500",
      letterSpacing: "0.400222px",
      color: "#4d4b46",
      // fontFamily: "poppins",
    },
    // card: {
    //   width: "89%",
    //   display: "flex",
    //   alignItems: "center",
    //   flexDirection: "column",
    // },
    image: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      margin: "10px 0 10px 0",
      width: "100%",
      borderRadius: "3px",
      // boxShadow: "0px 4px 10px 2px rgba(244,234,220,0.9)",
    },
    imageCaptionTitle: {
      fontSize: "0.7rem",
      letterSpacing: "0.50000px",
      // fontFamily: "poppins",
      textTransform: "capitalize",
      color: "#4d4b46",
      "& > span": {
        padding: "2px",
        alignSelf: "start",
        fontWeight: "400",
        fontSize: "0.7rem",
        fontStyle: "italic",
        color: "#4d4b46",
        fontFamily: "raleway",
        letterSpacing: "0.30000px",
      },
    },
    text: {
      padding: "0.1rem",
      fontSize: "1.5rem",
      margin: "50px 0  40px 0",
      color: "#4d4b46",
      fontFamily: "raleway",
      letterSpacing: "0.60000px",
      width: "100%",
      borderTop: "0.02rem grey solid",
      borderBottom: "0.02rem grey solid",
    },
    btnSection: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      margin: "50px 0 30px 0 ",
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
      <Container maxWidth="xs" className={classes.root}>
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
        {/* // * mapping to render divided by types */}
        {contents.map((x) => {
          /* images */
          if (x.type === "image") {
            console.log("x.content.caption?", x.content);
            return (
              <div className={classes.card}>
                <img
                  className={classes.image}
                  key={x.content.public_id}
                  alt="complex"
                  src={x.content.url}
                />
                <p className={classes.imageCaptionTitle}>
                  {x.content.caption?.title} -
                  <span>{x.content.caption?.description}</span>
                </p>
              </div>
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
                  <h3>{x.content.caption?.title}</h3>
                  <h4>{x.content.caption?.description}</h4>
                </div>
              </div>
            );
          }

          /*  text */
          if (x.type === "text") {
            return (
              <ReactQuill
                className={classes.text}
                value={x.content}
                readOnly={true}
                theme={"bubble"}
              />
            );
          }
          return null;
        })}
      </Container>
    </>
  );
};

export default SectionPreview;
