import React from "react";

// * Mat UI Imports

import {
  makeStyles,
  Container,
  Typography,
  Grid,
  CardMedia,
  Card,
  CardActionArea,
  CardContent,
} from "@material-ui/core";

// * Custom Components Imports

import CustomButton from "../../Components/Buttons/CustomButtons/CustomButton";

// * Custom Theme Imports

import { ourColors } from "../../styles/Theme";

const useStyles = makeStyles((theme) => ({
  container: { ...theme.admin.container }, // main Admin container class

  // * hero
  hero: {
    padding: "2rem",
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0.2)), url("https://images.unsplash.com/photo-1572953109213-3be62398eb95?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8bXVzZXVtfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80")`,
    height: "60vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  heroHeading: { color: "#fff", fontSize: "3rem", textAlign: "center" },

  // * sections
  section: { padding: "2rem 0" },
  sectionHeading: { fontWeight: 600, marginBottom: "1rem" },
  card: {
    height: "100%",
    "&:hover": {
      backgroundColor: ourColors.lightGrey,
    },
  },
  cardDesc: {
    paddingBottom: "1rem",
  },
  media: {
    height: 240,
  },
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Container maxWidth="md" className={classes.container}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item xs={12} className={classes.hero}>
          <Typography className={classes.heroHeading}>
            We Believe Museums Are Awesome
          </Typography>
          <CustomButton
            text="Start your own guide"
            style={{ boxShadow: `0 3px 5px 2px ${ourColors.black}` }} // custom boxShadow because default is very light!
            href="/subscription" //! make a working Link
          />
        </Grid>
      </Grid>

      <Grid container className={classes.section}>
        <Typography variant="h4" className={classes.sectionHeading}>
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
                    Easy and Accessible
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                    className={classes.cardDesc}
                  >
                    We provide innovative technology to museums to help set-up
                    digital interactive guides.
                  </Typography>
                </CardContent>
              </CardActionArea>
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
                    className={classes.cardDesc}
                  >
                    The app and its contents are updated when the page loads :
                    updates are silent for visitors. No obsolescence.
                  </Typography>
                </CardContent>
              </CardActionArea>
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
                    className={classes.cardDesc}
                  >
                    The display of content is instantaneous thanks to the
                    loading of cached data.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Home;
