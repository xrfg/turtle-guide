import React, { useState } from "react";

// * Components
import { Link, useHistory } from "react-router-dom";

// * Components
import BlockSection from "../../Components/BlockSection/BlockSection";

// * MatUI
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { Container } from "@material-ui/core";

import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function Home(props) {
  // * Hooks
  const classes = useStyles();
  const history = useHistory();

  // * States
  const [expanded, setExpanded] = useState(false);

  // * Destruc
  const { title, sections, id, eventSlug } = props;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  /**
   * @desc Component to create a card (section)
   */
  // TODO to ext

  return (
    <>
      <h1>{title}</h1>
      <Container>
        {/* Map to create cards */}
        {sections.map((x) => {
          return <BlockSection eventSlug={eventSlug} data={x} />;
        })}
      </Container>
    </>
  );
}
