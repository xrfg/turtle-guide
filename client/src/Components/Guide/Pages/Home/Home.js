import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
// import styles from "./home.css";
import axios from "axios";
// import toast from "toast";

// * Components
import { Link, useHistory } from "react-router-dom";

// * Components
import BlockSection from "../../Components/BlockSection/BlockSection";

// * MatUI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { ourColors, theme } from ".././../../../styles/Theme";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import styles from "./styles.module.css";

const useStyles = makeStyles((theme) => ({
  /*hero: {
    backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0.5)),url("https://ernst-leitz-museum.de/wp-content/uploads/2019/03/das-ernst-leitz-museum-in-wetzlar-2-2-1440x566.jpg")`,
    height: "500px",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
    fontSize: "4rem",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  media: {
    height: 240,
  },
  cardActions: {
    display: "flex",
    margin: "0 10px",
    justifyContent: "space-between",
  },*/
  mainContainer: {
    // ! gradients samples NOT DELETE
    // background: "linear-gradient(#e66465, #9198e5)",
    // background:
    //   "linear-gradient(0deg, rgba(207,222,243,1) 0%, rgba(224,234,252,1) 100%)", // Sky
    // background:
    //   "linear-gradient(0deg, rgba(173,169,150,1) 0%, rgba(242,242,242,1) 40%, rgba(219,219,219,1) 68%, rgba(234,234,234,1) 100%)", // zinc
    // background:
    //   "linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(170,186,171,1) 100%)", // light green
    background:
      " linear-gradient(0deg, rgba(215,221,232,0.6) 0%, rgba(117,127,154,0.6) 100%)", // blue grey
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
  parallaxLayerContainer: {
    // margin: "6rem 0 30px 0",
    // padding: "1.6rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
  },

  eventsTitle: {
    // ! changed from fixed
    position: "relative",
    display: "flex",
    alignItems: "end",
    width: "100%",
    zIndex: "10000",
    ...theme.guide.mainHeader,
    // ! removed background and bar
    // maxHeight: "100px",
    // height: "3.7rem",
    // backgroundColor: ourColors.gainsboro,
    // boxShadow: "-2px 2px 8px 1px rgba(127,127,127,0.88)",
    margin: "0 0 0 0",
    // color: ourColors.indigoDye,
    padding: "20px",
  },
}));

export default function Home(props) {
  // * Hooks
  const classes = useStyles();
  // * refs
  const mainContainerRef = useRef();
  const parallaxContainerRef = useRef();

  // * States
  const [totalParallaxPages, setTotalParallaxPages] = useState(0);
  const [parallaxContainerSize, setParallaxContainerSize] = useState(0);
  const [needsCalc, setNeedsCalc] = useState(true);

  // let totalParallaxPages = 1;
  useEffect(() => {
    console.log("mainContainerRef.current", mainContainerRef);
    // if true the content is loaded
    if (mainContainerRef.current && needsCalc && parallaxContainerSize !== 0) {
      setNeedsCalc(false);
      // * calculate parallax total size
      const getViewportSize = window.innerHeight;
      console.log("CALC", parallaxContainerSize / getViewportSize);
      // set the pages
      setTotalParallaxPages(
        Math.floor(parallaxContainerSize / getViewportSize)
      );
      // console.log("get", get);
    }
    // setTotalParallaxPages(getViewportSize / getParallaxContainerSize);
    //eslint-disable-next-line
  }, [parallaxContainerSize, needsCalc]);

  // const [parallaxContainerSize, setParallaxContainerSize] = useState(
  //   parallaxContainer.current.offsetHeight
  //   );

  // * Destruc
  const { title, sections, eventSlug, nameIdentifier } = props;

  console.log("sections", sections.length * 385);

  const imgUrl =
    "https://cms.hostelworld.com/hwblog/wp-content/uploads/sites/2/2018/12/kirkjufell.jpg";

  // const totalParallaxPages = getViewportSize / getParallaxContainerSize;

  // console.log("totalParallaxPages", totalParallaxPages);
  return (
    <>
      {/* <Parallax pages={5}>
        <ParallaxLayer
          offset={0}
          speed={0.5}
          style={{ ...alignCenter, justifyContent: "center" }}
        >
          <p className={styles.scrollText}>Scroll down</p>
        </ParallaxLayer>

        <ParallaxLayer
          sticky={{ start: 1, end: 3 }}
          style={{ ...alignCenter, justifyContent: "flex-start" }}
        >
          <div className={`${styles.card} ${styles.sticky}`}>
            <p>I'm a sticky layer</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1.5}
          speed={1.5}
          style={{ ...alignCenter, justifyContent: "flex-end" }}
        >
          <div className={`${styles.card} ${styles.parallax} ${styles.purple}`}>
            <p>I'm not</p>
          </div>
        </ParallaxLayer>

        <ParallaxLayer
          offset={2.5}
          speed={1.5}
          style={{ ...alignCenter, justifyContent: "flex-end" }}
        >
          <div className={`${styles.card} ${styles.parallax} ${styles.blue}`}>
            <p>Neither am I</p>
          </div>
        </ParallaxLayer>
      </Parallax> */}
      {totalParallaxPages === 0 ? (
        <h1>WAIT</h1>
      ) : (
        <div className={classes.mainContainer} ref={mainContainerRef}>
          {console.log("totalParallaxPages", totalParallaxPages)}
          <Parallax pages={5.5} enabled={true}>
            <ParallaxLayer
              // factor={2}
              offset={0}
              speed={0.5}
              // style={{ ...alignCenter, justifyContent: "center" }}
              // style={{
              //   backgroundImage: `url(${imgUrl})`,
              // }}
            >
              <Typography
                variant="h1"
                component="h1"
                className={classes.eventsTitle}
              >
                {title}
              </Typography>
              <div
                ref={(el) => {
                  // sets the size of the container
                  setParallaxContainerSize(el?.offsetHeight);
                }}
                className={classes.parallaxLayerContainer}
              >
                {/* Map to create cards */}
                {sections.map((x, index) => {
                  // skip intro from general rendering
                  if (x.type === "intro") {
                    return null;
                  }
                  // renders the rest
                  return (
                    <BlockSection
                      sectionIndex={index} // pass for the order in the navbar
                      nameIdentifier={nameIdentifier}
                      eventSlug={eventSlug}
                      data={x}
                    />
                  );
                })}
              </div>
            </ParallaxLayer>
          </Parallax>
        </div>
      )}
    </>
  );
}
