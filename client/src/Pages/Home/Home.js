import React from "react";
import Theme from "./Theme.js";
import {
  Box,
  makeStyles,
  Container,
  Typography,
  Grid,
  CardMedia,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  hero: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0.5)), url("https://images.unsplash.com/photo-1572953109213-3be62398eb95?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bXVzZXVtfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80")`,
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
    [theme.breakpoints.down("sm")]: {
      height: 300,
      fontSize: "3em",
    },
  },
  servicesContainer: {
    paddingTop: theme.spacing(3),
  },
  servicesTitle: {
    fontWeight: 800,
    paddingBottom: theme.spacing(3),
  },
  card: {
    maxWidth: "100%",
  },
  media: {
    height: 240,
  },
  buttonLoginPositon: {
    position: "absolut",
    top: "-280px",
    left: "1040px",
  },
  buttonSubscribePositon: {
    position: "absolut",
    top: "-280px",
    left: "30px",
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <>
      <Box>
        <Box className={classes.hero}>
          <Button
            style={{ color: "black" }}
            variant="outlined"
            color="primary"
            className={classes.buttonLoginPositon}
          >
            Login
          </Button>
          We Believe Museums Are Awesome
          <Button
            style={{ color: "black" }}
            variant="outlined"
            color="primary"
            className={classes.buttonSubscribePositon}
          >
            Subscribe
          </Button>
        </Box>
      </Box>
      <Container maxWidth="lg" className={classes.servicesContainer}>
        <Typography variant="h4" className={classes.servicesTitle}>
          Our Services
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://www.nrm.org/wp2016/wp-content/uploads/2018/06/MobileApp_NewKids.jpg"
                  title="mobile app"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    easy accessible
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    We provide innovative technology to museums to help set-up
                    digital interactive guides.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions></CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://www.nhb.gov.sg/nationalmuseum/-/media/nms2017/image/exhibitions/ptp/ptp-home-mobile-banner.png?w=412"
                  title="mobile app"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Always Up To Date
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    The app and its contents are updated when the page loads :
                    updates are silent for visitors. No obsolescence.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions></CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F28%2F2016%2F05%2FMuseum-Etiquette-02-Quiet-MTMM0416.jpg"
                  title="mobile app"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Very Fast
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    The display of content is instantaneous thanks to the
                    loading of cached data.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions></CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
