import React, { useState } from "react";

// * Components
import BottomNavBar from "../../Components/Navbar/BottomNavBar";
import { Link, useHistory } from "react-router-dom";

// * Components
import BlockSection from "../../Components/BlockSection/BlockSection";

// * MatUI
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import clsx from "clsx";
import { Grid, Container, Button } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles((theme) => ({
  hero:{
    backgroundImage:`linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0.5)),url("https://ernst-leitz-museum.de/wp-content/uploads/2019/03/das-ernst-leitz-museum-in-wetzlar-2-2-1440x566.jpg")`,
    height:"500px",
    backgroundPosition:"center",
    backgroundRepeat:"no-repeat",
    backgroundSize:"cover",
    position:"relative",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    color:"#fff",
    fontSize:"4rem"

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
  media:{
    height:240
  },
  cardActions:{
    display:"flex",
    margin:"0 10px",
    justifyContent:"space-between"
  }
 
}));

export default function Home(props) {
  // * Hooks
  const classes = useStyles();
  const history = useHistory();

  // * States
  const [expanded, setExpanded] = useState(false);

  // * Destruc
  const { title, sections, id, eventSlug } = props;

  const [product] = React.useState({
    name: "Buy Guide",
    price: 64998.67,
    description: "Cool car"
  });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "https://ry7v05l6on.sse.codesandbox.io/checkout",
      { token, product }
    );
    const { status } = response.data;
    console.log("Response:", response.data);
    if (status === "success") {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

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

      <Container>
        <BottomNavBar />
      </Container>
    </>
  );
}
