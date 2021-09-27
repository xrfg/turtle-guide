/**
 * @desc Component that preview the Sections or
 * renders the sections into the Guide/Event
 * @requires props "contents" <SectionPreview id={id} contents={ } sectionCover={} sectionDescriptio={}/>
 */

// TODO Add video render from cloudinary
// TODO clean code

import React, { useEffect, useState, useCallback } from "react";

// * Imports
import { Parallax, ParallaxLayer } from "@react-spring/parallax";

// * Mat UI
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Container, Button, Typography, Card } from "@material-ui/core";

// * Components
import { ourColors } from "../../styles/Theme";

// needed to render Rich text
import ReactQuill from "react-quill"; // ES6

// CSS vars
const windowWidth = window.innerWidth;
const windowHeight = window.innerHeight;

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      "& > div": {
        margin: "0",
        padding: "0",
      },

      backgroundColor: theme.palette.common.white,
      minWidth: "100%",
      minHeight: windowHeight - 70 + "px", // the height of the bottom navbar
      maxWidth: "100%",
      width: "50px",
      overflow: "hidden",
    },
    introBackground: {
      width: "100%",
      /* Full height */
      height: "100%",
    },
    adminPreview: {
      "& > *": {
        // margin: theme.spacing(1),
        margin: "0",
        padding: "0",
      },

      backgroundColor: theme.palette.common.white,
      borderRadius: "8px",
      border: `10px solid ${ourColors.lightGrey}`,
      boxShadow: `0px 0px 0px 1px ${ourColors.jet}`,
      maxWidth: "460px",
      overflow: "hidden",
    },
    mainContainer: {
      // ! gradients samples NOT DELETE
      // background: "linear-gradient(#e66465, #9198e5)",
      // background:
      //   "linear-gradient(0deg, rgba(207,222,243,1) 0%, rgba(224,234,252,1) 100%)", // Sky
      // background:
      //   "linear-gradient(0deg, rgba(173,169,150,1) 0%, rgba(242,242,242,1) 40%, rgba(219,219,219,1) 68%, rgba(234,234,234,1) 100%)", // zinc
      // background:
      //   "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(170,186,171,1) 100%)", // light green
      // background:
      //   " linear-gradient(0deg, rgba(215,221,232,0.6) 0%, rgba(117,127,154,0.6) 100%)", // blue grey
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
      // width: "100vw",
      // height: "100vh",

      // margin: "6rem 0 30px 0",
      // padding: "1.6rem",
      // // // background:
      // // //   "linear-gradient(4deg, rgba(121,16,9,1) 44%, rgba(0,212,255,1) 100%)",
      // // // backgroundColor: ourColors.primaryLight,
      // display: "flex",
      // flexDirection: "column",
      // justifyContent: "center",
      // alignItems: "center",
      // width: "100vw",
    },
    // empty main container to do not use the grandient BG in intro
    mainContainerIntro: {
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,

      // margin: "20px",
    },
    // To adjust parallax
    parallaxContainer: {
      paddingLeft: "20px",
      paddingRight: "20px",
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
      marginTop: "-40px",
      // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 81%)",
      // backgroundColor: "white",
    },
    sectionTitle: {
      marginTop: "-20px",
      // backgroundColor: "white",
      padding: "10px",
      // boxShadow: "5px 3px 15px -13px rgba(0,0,0,0.7)",
      // clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 81%)",
      paddingBottom: "0px",
    },
    introTitle: {
      marginTop: "20px",
      marginBottom: "50px",
      border: "none",
      boxShadow: "none",
      backgroundColor: "transparent",
      padding: "15px",
      paddingBottom: "0px",
      fontSize: "1.5rem",
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
      padding: "0.4rem",
      fontSize: "1.5rem",
      // margin: "50px 0  40px 0",
      color: "#4d4b46",
      fontFamily: "raleway",
      letterSpacing: "0.60000px",
      width: "100%",
      marginTop: "10px",
      marginBottom: "-30px",
      // borderTop: "0.02rem grey solid",
      // borderBottom: "0.02rem grey solid",
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
  // * Hooks
  const classes = useStyles();

  // destru
  const {
    id,
    contents,
    sectionCover,
    sectionDescription,
    sectionTitle,
    adminPreview,
  } = props;

  // * States
  // for parallax
  const [totalParallaxPages, setTotalParallaxPages] = useState(0);
  // viewport
  const [viewPortSize] = useState(window.innerHeight - 60);

  // the toatl height of content
  const [totalContentPixels, setTotalContentPixels] = useState(0);

  // is intro state
  // if id === 1 sets to true
  const [isIntro, setIsIntro] = useState(false);

  // * Life cycles Methods
  useEffect(() => {
    // if id === 1 sets to true
    if (id === 1) {
      setIsIntro(true);
    }

    //eslint-disable-next-line
  }, []);

  // useCallback instead of useRef
  const mainContainerRef = useCallback((node) => {
    // skips to avoid double set
    if (totalContentPixels === 0) {
      setTotalContentPixels(node?.scrollHeight);
    }

    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    // if the pages are already set skips
    if (totalParallaxPages !== 0) {
      return null;
    }
    let pages = 0;

    console.log(
      "totalContentPixels / viewPortSize",
      totalContentPixels / viewPortSize
    );

    console.log("getViewportSize", viewPortSize);
    console.log("totalPixels", totalContentPixels);

    // if (totalContentPixels / viewPortSize < 1.45) {
    //   pages = totalContentPixels / viewPortSize;
    //   console.log("totalpages", pages);
    //   return setTotalParallaxPages(1);
    // }

    if (totalContentPixels / viewPortSize < 2) {
      pages = totalContentPixels / viewPortSize;
      console.log("totalpages 1", pages);
      return setTotalParallaxPages(pages);
    }

    if (totalContentPixels / viewPortSize < 4) {
      pages = totalContentPixels / viewPortSize + 0.5;
      console.log("totalpages 2", pages);
      return setTotalParallaxPages(pages);
    }

    if (totalContentPixels / viewPortSize < 6) {
      pages = totalContentPixels / viewPortSize + 1;
      console.log("totalpages 3", pages);
      return setTotalParallaxPages(pages);
    }

    pages = Math.ceil(totalContentPixels / viewPortSize) + 1.25;
    console.log("totalpages 4", pages);

    return setTotalParallaxPages(pages);

    //eslint-disable-next-line
  }, [totalContentPixels]);

  return (
    <>
      <Container
        maxWidth="xs"
        className={`  
        ${adminPreview ? classes.adminPreview : classes.root} ${
          classes.mainContainer
        }
        `}
        style={
          isIntro
            ? {
                backgroundPosition: "center center",
                backgroundSize: "cover",
                backgroundImage: `url(${sectionCover.url})`,
                position: "relative",
                overflow: "hidden",
              }
            : {
                background:
                  "linear-gradient(0deg, rgba(215,221,232,0.6) 0%, rgba(117,127,154,0.6) 100%)",
              }
        }
      >
        {totalParallaxPages === 0 ? (
          <div
            id="mockDiv"
            className={`${
              isIntro ? classes.mainContainerIntro : classes.mainContainer
            }`}
            ref={mainContainerRef}
          >
            {sectionCover.url === "" ? (
              isIntro ? (
                <h1>No Background image yet, please choose one</h1>
              ) : (
                <h1>No cover image yet, please choose one</h1>
              )
            ) : (
              !isIntro && (
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
              )
            )}
            <div className={isIntro ? "" : classes.sectionTitleWrap}>
              <Card className={classes.introTitle}>
                <Typography
                  gutterBottom={true}
                  variant={"h5"}
                  className={isIntro ? "" : classes.sectionTitle}
                >
                  {sectionTitle}
                </Typography>
              </Card>
            </div>

            {!isIntro && (
              <>
                <ReactQuill
                  className={classes.sectionDescription}
                  value={sectionDescription}
                  readOnly={true}
                  theme={"bubble"}
                />
              </>
            )}
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
              /*  audio */
              if (x.type === "audio") {
                // passes the url audio to audio
                return (
                  <div className="video-card">
                    <audio controls>
                      {/* Select audio format */}
                      {x.content.filename === "MP3" && (
                        <source src={x.content.url} type="audio/mp3" />
                      )}
                      {x.content.filename === "WAV" && (
                        <source src={x.content.url} type="audio/x-wav" />
                      )}
                      {x.content.filename === "OGG" && (
                        <source src={x.content.url} type="application/ogg" />
                      )}
                    </audio>
                    <h3>{x.content.caption?.title}</h3>
                    <h4>{x.content.caption?.description}</h4>
                  </div>
                );
              }

              /*  text */
              if (x.type === "text") {
                return (
                  <Card>
                    <ReactQuill
                      className={classes.text}
                      value={x.content}
                      readOnly={true}
                      theme={"bubble"}
                    />
                  </Card>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <div
            className={`${
              isIntro ? classes.mainContainerIntro : classes.mainContainer
            } `}
          >
            <Parallax pages={totalParallaxPages}>
              <ParallaxLayer
                offset={0}
                speed={0.5}
                className={classes.parallaxContainer}
              >
                {sectionCover.url === "" ? (
                  isIntro ? (
                    <h1>No Background image yet, please choose one</h1>
                  ) : (
                    <h1>No cover image yet, please choose one</h1>
                  )
                ) : (
                  !isIntro && (
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
                  )
                )}
                <div className={isIntro ? "" : classes.sectionTitleWrap}>
                  <Card className={classes.introTitle}>
                    <Typography
                      gutterBottom={true}
                      variant={"h5"}
                      className={isIntro ? "" : classes.sectionTitle}
                    >
                      {sectionTitle}
                    </Typography>
                  </Card>
                </div>

                {!isIntro && (
                  <>
                    <ReactQuill
                      className={classes.sectionDescription}
                      value={sectionDescription}
                      readOnly={true}
                      theme={"bubble"}
                    />
                  </>
                )}
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
                  /*  audio */
                  if (x.type === "audio") {
                    // passes the url audio to audio
                    return (
                      <div className="video-card">
                        <audio controls>
                          {/* Select audio format */}
                          {x.content.filename === "MP3" && (
                            <source src={x.content.url} type="audio/mp3" />
                          )}
                          {x.content.filename === "WAV" && (
                            <source src={x.content.url} type="audio/x-wav" />
                          )}
                          {x.content.filename === "OGG" && (
                            <source
                              src={x.content.url}
                              type="application/ogg"
                            />
                          )}
                        </audio>
                        <h3>{x.content.caption?.title}</h3>
                        <h4>{x.content.caption?.description}</h4>
                      </div>
                    );
                  }

                  /*  text */
                  if (x.type === "text") {
                    return (
                      <Card>
                        <ReactQuill
                          className={classes.text}
                          value={x.content}
                          readOnly={true}
                          theme={"bubble"}
                        />
                      </Card>
                    );
                  }
                  return null;
                })}
              </ParallaxLayer>
            </Parallax>
          </div>
        )}
      </Container>
    </>
  );
};

export default SectionPreview;
