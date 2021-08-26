/**
 * @desc Component that preview the Sections or
 * renders the sections into the Guide/Event
 */

import React from "react";

// * Mat UI
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

// * Components
import VideoPlayerCloudHosted from "../VideoPlayerCloudHosted/VideoPlayerCloudHosted";

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
  const { contents } = props;

  // * Functions
  //   var cld = window.cloudinary.Cloudinary.new({
  //     cloud_name: "dhdgj2ryu",
  //   });
  //   var demoplayer = cld.videoPlayer("doc-player").width(600);

  return (
    <>
      <Container maxWidth="xs">
        <div>PREVIEW</div>
        {/* // * mapping to render divided by genre */}
        {contents.map((x) => {
          {
            /*  image */
          }
          if (x.type === "image") {
            return (
              <img
                className={classes.image}
                alt="complex"
                src={x.content.url}
              />
            );
          }
          {
            /*  video */
          }
          if (x.type === "video") {
            console.log(x);

            const videoOptions = {
              cloudName: "dhdgj2ryu",
              url: x.content.url,
            };

            return (
              <div className="video-card">
                <h2>Video Player Cloud Hosted</h2>
                <div>
                  <VideoPlayerCloudHosted options={videoOptions} />
                </div>
              </div>
            );
          }
          return null;
        })}
      </Container>
    </>
  );
};

export default SectionPreview;
