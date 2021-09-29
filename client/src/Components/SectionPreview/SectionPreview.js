/**
 * @desc Component that preview the Sections or
 * renders the sections into the Guide/Event
 * @requires props "contents" <SectionPreview id={id} contents={ } sectionCover={} sectionDescriptio={}/>
 */

import React, { useEffect, useState, useCallback } from "react";

import { Link } from "react-router-dom";

// * Imports
import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import nextId from "react-id-generator";

// * Mat UI
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Container, Typography, Card, Button, Box } from "@material-ui/core";

// * Components
import { ourColors, ourColorsTwo } from "../../styles/Theme";

// needed to render Rich text
import ReactQuill from "react-quill"; // ES6

import useGetEvent from "../Guide/Hooks/useGetEvent";

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
      ...theme.guide.globalGradientBg,
      position: "absolute",
      top: 0,
      bottom: 0,
      right: 0,
      left: 0,
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
      ...theme.guide.sectionTitleWrap,
    },
    sectionTitle: {
      ...theme.guide.sectionTitle,
    },
    introTitleWrap: {
      ...theme.guide.introTitleWrap,
    },
    introTitle: {
      ...theme.guide.introTitle,
    },

    sectionDescription: {
      marginBottom: "3rem",
      fontWeight: "500",
      letterSpacing: "0.400222px",
      color: "#4d4b46",
      // fontFamily: "poppins",
      backgroundColor: "white",
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

    videoCard: { marginBottom: "1.5rem", "& > *": { width: "100%" } },
    audioCard: { marginBottom: "1.5rem", "& > *": { width: "100%" } },
    audioTextBox: {
      borderBottom: `1px solid ${ourColorsTwo.englishViolet}`,
      padding: "0.5rem 1rem",
      fontSize: "0.8rem",
      color: ourColors.jet,
    },
    audioTitle: { display: "block", fontWeight: "bold" },
    audioDesc: {},
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
    // intro btn that forwards to the exhibition
    introBtn: {
      padding: "0.8rem",
      width: "100%",
      backgroundColor: ourColorsTwo.englishViolet,
      color: "white",
      fontWeight: "bold",
      "&:hover": {
        backgroundColor: ourColors.gainsboro,
        color: ourColorsTwo.englishViolet,
      },
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

  const event = useGetEvent();

  console.log(event);

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
    if (totalParallaxPages !== 0 || totalContentPixels === 0) {
      return null;
    }
    let pages = 0;

    console.log(
      "totalContentPixels / viewPortSize",
      totalContentPixels / viewPortSize
    );

    console.log("getViewportSize", viewPortSize);
    console.log("totalPixels", totalContentPixels);

    // after every calc add a margin
    if (totalContentPixels / viewPortSize < 2) {
      pages = Math.ceil(totalContentPixels / viewPortSize) + 0.8;
      return setTotalParallaxPages(pages);
    }

    if (totalContentPixels / viewPortSize < 4) {
      pages = Math.ceil(totalContentPixels / viewPortSize) + 1.5;
      console.log("totalpages 2", pages);
      return setTotalParallaxPages(pages);
    }

    if (totalContentPixels / viewPortSize < 6) {
      pages = totalContentPixels / viewPortSize + 1.8;
      console.log("totalpages 3", pages);
      return setTotalParallaxPages(pages);
    }

    pages = Math.ceil(totalContentPixels / viewPortSize) + 1.25;
    console.log("totalpages 4", pages);

    return setTotalParallaxPages(pages);

    //eslint-disable-next-line
  }, [totalContentPixels]);

  console.log("totalParallaxPages", totalParallaxPages);

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
            : {}
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
                  />
                </div>
              )
            )}
            <div className={isIntro ? "" : classes.sectionTitleWrap}>
              <Card className={classes.introTitleWrap}>
                <Typography
                  gutterBottom={true}
                  // variant={"h5"}
                  className={
                    isIntro ? classes.introTitle : classes.sectionTitle
                  }
                >
                  <span>{sectionTitle}</span>
                </Typography>
              </Card>
            </div>

            {!isIntro && (
              <>
                <Box className={classes.sectionDescription}>
                  <ReactQuill
                    value={sectionDescription}
                    readOnly={true}
                    theme={"bubble"}
                  />
                </Box>
              </>
            )}
            {/* // * mapping to render divided by types */}
            {contents.map((x) => {
              /* images */
              if (x.type === "image") {
                return (
                  <div className={classes.card} key={nextId()}>
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
                  <div className={classes.videoCard} key={nextId()}>
                    <video width="400" controls>
                      <source src={x.content.url} type="video/mp4" />
                    </video>
                    <div className={classes.audioTextBox}>
                      <span className={classes.audioTitle}>
                        {x.content.caption?.title}
                      </span>
                      <span className={classes.audioDesc}>
                        {x.content.caption?.description}
                      </span>
                    </div>
                  </div>
                );
              }
              /*  audio */
              if (x.type === "audio") {
                // passes the url audio to audio
                return (
                  <div className={classes.audioCard} key={nextId()}>
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
                    <div className={classes.audioTextBox}>
                      <span className={classes.audioTitle}>
                        {x.content.caption?.title}
                      </span>
                      <span className={classes.audioDesc}>
                        {x.content.caption?.description}
                      </span>
                    </div>
                  </div>
                );
              }

              /*  text */
              if (x.type === "text") {
                return (
                  <Card style={{ marginBottom: "1rem" }} key={nextId()}>
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
                      />
                    </div>
                  )
                )}
                <div className={isIntro ? "" : classes.sectionTitleWrap}>
                  <Card className={classes.introTitleWrap}>
                    <Typography
                      gutterBottom={true}
                      // variant={"h5"}
                      className={
                        isIntro ? classes.introTitle : classes.sectionTitle
                      }
                    >
                      <span>{sectionTitle}</span>
                    </Typography>
                  </Card>
                </div>

                {!isIntro && (
                  <>
                    <Box className={classes.sectionDescription}>
                      <ReactQuill
                        value={sectionDescription}
                        readOnly={true}
                        theme={"bubble"}
                      />
                    </Box>
                  </>
                )}
                {/* // * mapping to render divided by types */}
                {contents.map((x) => {
                  /* images */
                  if (x.type === "image") {
                    return (
                      <div className={classes.card} key={nextId()}>
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
                      <div className={classes.videoCard} key={nextId()}>
                        <video width="400" controls>
                          <source src={x.content.url} type="video/mp4" />
                        </video>
                        <div className={classes.audioTextBox}>
                          <span className={classes.audioTitle}>
                            {x.content.caption?.title}
                          </span>
                          <span className={classes.audioDesc}>
                            {x.content.caption?.description}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  /*  audio */
                  if (x.type === "audio") {
                    // passes the url audio to audio
                    return (
                      <div className={classes.audioCard} key={nextId()}>
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
                        <div className={classes.audioTextBox}>
                          <span className={classes.audioTitle}>
                            {x.content.caption?.title}
                          </span>
                          <span className={classes.audioDesc}>
                            {x.content.caption?.description}
                          </span>
                        </div>
                      </div>
                    );
                  }

                  /*  text */
                  if (x.type === "text") {
                    return (
                      <Card style={{ marginBottom: "1rem" }} key={nextId()}>
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
                {isIntro && (
                  <Button
                    className={classes.introBtn}
                    component={Link}
                    to={`/events/${event.slug}/sections/`}
                  >
                    Go to {event.title}
                  </Button>
                )}
              </ParallaxLayer>
            </Parallax>
          </div>
        )}
      </Container>
    </>
  );
};

export default SectionPreview;
