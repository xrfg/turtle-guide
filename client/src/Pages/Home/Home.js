import React from "react";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Image from "./Images/image.jpeg";
import Paper from "@material-ui/core/Paper";
import CardsHome from "./CardsHome/CardsHome.js";

const styles = {
  paperContainer: {
    backgroundImage: `url(${Image})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
};

const Home = () => {
  return (
    <>
      <Box px={{ xs: 0, sm: 0 }} py={{ xs: 5, sm: 10 }}>
        <Paper style={styles.paperContainer}>
          <Typography variant="h1" component="h2" gutterBottom>
            We Believe Museums Are Awesome
          </Typography>
          <Typography>
            When you stand in a museum, you are literally amongst the greatest
            collections humanity has created and discovered in our entire
            existence as a species. Come stand with us, and we'll show you why
            museums are the greatest institutions on Earth.
          </Typography>
        </Paper>
      </Box>
      <Container>
        <CardsHome />
      </Container>
    </>
  );
};

export default Home;
