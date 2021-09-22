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
import { Container, Button, Typography } from "@material-ui/core";

import theme from "../../styles/Theme";

// needed to render Rich text
import ReactQuill from "react-quill"; // ES6
import { transform } from "lodash";

// CSS vars
const windowWidth = window.innerWidth;

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
    sectionCoverWrap: {
      // boxShadow: "3px 3px 15px -8px rgba(0,0,0,0.86)",
      // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 81%)",
    },
    // TODO CSS better centering NOT a priority
    sectionCover: {
      // marginLeft: "-512px" /* 50% */,
      // minHeight: "100%",
      // minWidth: "680px",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center",
      backgroundSize: "cover",
      height: "180px",
      // width: "120%",
      width: `${windowWidth + 80}px`,
      // left: "50%",

      marginLeft: `-${(windowWidth + 80) / 10}px`,
      boxShadow: "3px 3px 10px -8px rgba(0,0,0,0.97)",
      // to adapt with the navbar
      marginTop: "70px",
    },
    sectionTitleWrap: {
      // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 81%)",
      // backgroundColor: "white",
    },
    sectionTitle: {
      marginTop: "-20px",
      backgroundColor: "white",
      padding: "10px",
      boxShadow: "5px 3px 15px -13px rgba(0,0,0,0.7)",
      // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 81%)",
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
      overflowWrap: "anywhere",
      "& > span": {
        padding: "2px",
        alignSelf: "start",
        fontWeight: "400",
        fontSize: "0.7rem",
        fontStyle: "italic",
        color: "#4d4b46",
        fontFamily: "raleway",
        letterSpacing: "0.30000px",
        overflowWrap: "anywhere",
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
          <div className={classes.sectionCoverWrap}>
            <div
              className={classes.sectionCover}
              style={{
                backgroundImage: `url(${sectionCover.url})`,
              }}
              alt="section-cover"
              // src={sectionCover.url}
            />
          </div>
        )}
        <div className={classes.sectionTitleWrap}>
          <Typography
            gutterBottom={true}
            variant={"h5"}
            className={classes.sectionTitle}
          >
            {sectionTitle}
          </Typography>
        </div>
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
            // passes the url video to video
            return (
              <div className="video-card">
                <video width="400" controls>
                  <source src={x.content.url} type="video/mp4" />
                </video>
                <h3>{x.content.caption?.title}</h3>
                <h4>{x.content.caption?.description}</h4>
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
