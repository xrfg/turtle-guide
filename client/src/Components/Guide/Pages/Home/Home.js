import React, { useState } from "react";
// import styles from "./home.css";
import axios from "axios";
// import toast from "toast";

// * Components
import { Link, useHistory } from "react-router-dom";

// * Components
import BlockSection from "../../Components/BlockSection/BlockSection";

// * MatUI
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Typography } from "@material-ui/core";

import { ourColors, theme } from ".././../../../styles/Theme";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";
import styles from "./styles.module.css";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "linear-gradient(#e66465, #9198e5)",
  },
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
    background: "linear-gradient(#e66465, #9198e5)",
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
    margin: "6rem 0 30px 0",
    // padding: "1.6rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100vw",
  },

  eventsTitle: {
    position: "fixed",
    display: "flex",
    alignItems: "end",
    width: "100%",
    zIndex: "10000",
    height: "3.7rem",
    ...theme.guide.mainHeader,
    color: ourColors.indigoDye,
    backgroundColor: ourColors.gainsboro,
    margin: "-6rem 0 0 0",
    padding: "0.6rem",
    boxShadow: "-2px 2px 8px 1px rgba(127,127,127,0.88)",
  },
}));

export default function Home(props) {
  // * Hooks
  const classes = useStyles();
  const history = useHistory();

  // * States
  const [expanded, setExpanded] = useState(false);

  // * Destruc
  const { title, sections, id, eventSlug, nameIdentifier } = props;

  // console.log("eventSlug, nameIdentifier", eventSlug, nameIdentifier);

  // const [product] = React.useState({
  //   name: "Buy Guide",
  //   price: 64998.67,
  //   description: "Cool car",
  // });

  // async function handleToken(token, addresses) {
  //   const response = await axios.post(
  //     "https://ry7v05l6on.sse.codesandbox.io/checkout",
  //     { token, product }
  //   );
  //   const { status } = response.data;
  //   console.log("Response:", response.data);
  //   if (status === "success") {
  //     toast("Success! Check email for details", { type: "success" });
  //   } else {
  //     toast("Something went wrong", { type: "error" });
  //   }
  // }

  const imgUrl =
    "https://cms.hostelworld.com/hwblog/wp-content/uploads/sites/2/2018/12/kirkjufell.jpg";

  /**
   * @desc Component to create a card (section)
   */
  // TODO to ext
  const alignCenter = { display: "flex", alignItems: "center" };
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

      <Typography variant="h1" component="h1" className={classes.eventsTitle}>
        {title}
      </Typography>
      <div className={classes.mainContainer}>
        <Parallax pages={5}>
          <ParallaxLayer
            // factor={0.1}
            offset={0}
            speed={0.5}
            // style={{ ...alignCenter, justifyContent: "center" }}
            // style={{
            //   backgroundImage: `url(${imgUrl})`,
            // }}
          >
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
    </>
  );
}
