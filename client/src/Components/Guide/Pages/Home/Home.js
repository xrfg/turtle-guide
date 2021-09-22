import React, { useState } from "react";
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
    margin: "6rem 0 30px 0",
    padding: "1.6rem",
    backgroundColor: ourColors.primaryLight,
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

  /**
   * @desc Component to create a card (section)
   */
  // TODO to ext
  console.log(BlockSection);
  return (
    <>
      <Parallax pages={3} style={{ top: "0", left: "0" }}>
        <ParallaxLayer
          offset={1}
          speed={2}
          style={{ backgroundColor: "#ff6d6d" }}
        />
        <div>
          <Typography
            variant="h1"
            component="h1"
            className={classes.eventsTitle}
          >
            {title}
          </Typography>
        </div>

        <ParallaxLayer
          offset={0}
          speed={2.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p>code {title}</p>
        </ParallaxLayer>

        <ParallaxLayer
          offset={1}
          speed={2}
          style={{ backgroundColor: "#ff6d6d" }}
        />

        <ParallaxLayer
          offset={1}
          speed={0.5}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
          }}
        >
          <p>Scroll up</p>
        </ParallaxLayer>
      </Parallax>

      {/* <div className={classes.mainContainer}> */}
      {/* Map to create cards */}
      {/* {sections.map((x, index) => {
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
        })} */}
      {/* </div> */}
    </>
  );
}
