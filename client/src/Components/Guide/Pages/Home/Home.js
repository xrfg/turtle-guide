import React, { useState, useRef, useEffect } from "react";

// * Components
import BlockSection from "../../Components/BlockSection/BlockSection";

// * MatUI
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";

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
  root: {
    ...theme.guide.root,
  },
  mainContainer: {
    ...theme.guide.globalGradientBg,

    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  parallaxLayerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
  },

  eventsTitle: {
    ...theme.guide.eventsTitle,
    position: "relative",
    display: "flex",
    alignItems: "end",
    width: "100%",
    zIndex: "10000",
    margin: "0 0 0 0",
    padding: "20px",
  },
}));

export default function Home(props) {
  // * Hooks
  const classes = useStyles();
  // * refs
  const mainContainerRef = useRef();

  // * States
  const [totalParallaxPages, setTotalParallaxPages] = useState(0);

  useEffect(() => {
    const getViewportSize = window.innerHeight;

    const totalCards = sections.length;
    const totalPixels = totalCards * 385;

    const pages = totalPixels / getViewportSize;

    // remove a percantage of pages to correct the length of the scrolling

    const removedPercentage = (pages) => {
      if (pages > 3 && pages < 6) {
        return pages - (pages / 100) * 9;
      }
      if (pages > 6 && pages < 9) {
        return pages - (pages / 100) * 11;
      }
      if (pages > 9 && pages < 12) {
        return pages - (pages / 100) * 15;
      }
      if (pages > 12) {
        return pages - (pages / 100) * 16.25;
      }
      return pages;
    };

    setTotalParallaxPages(removedPercentage(pages));

    //eslint-disable-next-line
  }, []);

  // * Destruc
  const { title, sections, eventSlug, nameIdentifier } = props;

  return (
    <>
      {totalParallaxPages === 0 ? (
        <h1>WAIT</h1>
      ) : (
        <div className={classes.mainContainer} ref={mainContainerRef}>
          <Parallax pages={totalParallaxPages} enabled={true}>
            <ParallaxLayer offset={0} speed={0.5}>
              <Typography
                variant="h1"
                component="h1"
                className={classes.eventsTitle}
              >
                {title}
              </Typography>
              <div className={classes.parallaxLayerContainer}>
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
