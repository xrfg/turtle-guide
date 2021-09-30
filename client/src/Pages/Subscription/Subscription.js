import React, { useState } from "react";
import {
  Typography,
  Stepper,
  Step,
  StepLabel,
  Container,
  createStyles,
  Grid,
} from "@material-ui/core";
import "../Subscription/Subscription.scss";
// import { userSignUp } from "../../../../store/actions/userActions";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import SignUp from "../SignUp/SignUp";
import Payment from "../../Components/Guide/Components/Payment/Payment";
import CustomButton from "../../Components/Buttons/CustomButtons/CustomButton";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      // height: "40%",
    },
    page: { ...theme.admin.page },
    media: {
      height: 140,
    },
    container: {
      ...theme.admin.container,
      display: "flex",
      justifyContent: "center",
      /* alignItems: "center", */
    },
  })
);

function getSteps() {
  return ["Select Your Subscription Plan", "Sign Up", "Payment"];
}

function GetStepContent(props) {
  const classes = useStyles();
  const { activeStep, handleNext } = props;

  // * States
  // plan chosen but the user
  // gets forwarded to <Payment /> and <SignUp /> for the registration
  const [chosenPlan, setChosenPlan] = useState(null);

  /**
   * @function signUpOver
   * @param val // true
   * @desc handles signup over
   */

  const signUpOver = (val) => {
    // sets a prop to go to payment
    props.goToPayment(val);
  };

  // * Plans

  const objPlanBasic = {
    name: "Basic Plan",
    price: 300,
    description: "You can create 3 guides per year",
  };
  const objPlanStandard = {
    name: "Standard Plan",
    price: 500,
    description: "You can create 5 guides per year",
  };
  const objPlanPremium = {
    name: "Premium Plan",
    price: 800,
    description: "You can create 10 guides per year",
  };

  switch (activeStep) {
    case 0:
      return (
        <>
          {/* Basic Plan Card */}
          <Container maxWidth="md" className={classes.container}>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="https://www.leicastore-frankfurt.de/contenido/leica/upload/Wetzlar/Leica_Museumsshop/Museumsshop_2.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Basic Plan
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <ul>
                          <li>200€ /month</li>
                          <li>Up to 3 Exhibitions</li>
                          <li>Unlimited Access to Themes</li>
                          <li>Cancel anytime</li>
                          <li>Fast Database</li>
                        </ul>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <CustomButton
                      style={{ width: "100%" }}
                      onClickFunc={() => {
                        setChosenPlan(objPlanBasic);
                        handleNext();
                      }}
                      text={activeStep === 3 ? "Finish" : "Next"}
                    />
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="https://museen-in-hessen.de/medien/1429173538-4223-990.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Standard Plan
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <ul>
                          <li>500€ /month</li>
                          <li>Up to 5 Exhibitions</li>
                          <li>Unlimited Access to Themes</li>
                          <li>Cancel anytime</li>
                          <li>Fast Database</li>
                        </ul>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <CustomButton
                      style={{ width: "100%" }}
                      onClickFunc={() => {
                        setChosenPlan(objPlanStandard);
                        handleNext();
                      }}
                      text={activeStep === 3 ? "Finish" : "Next"}
                    />
                  </CardActions>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.root}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="https://ichef.bbci.co.uk/news/976/cpsprodpb/14F7D/production/_112158858_germanmuseumgetty2.jpg"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Premium Plan
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        <ul>
                          <li>800€ /month</li>
                          <li>Up to 10 Exhibitions</li>
                          <li>Unlimited Access to Themes</li>
                          <li>Cancel anytime</li>
                          <li>Fast Database</li>
                        </ul>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    <CustomButton
                      style={{ width: "100%" }}
                      onClickFunc={() => {
                        setChosenPlan(objPlanPremium);
                        handleNext();
                      }}
                      text={activeStep === 3 ? "Finish" : "Next"}
                    />
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
          {/* Business Plan card s */}
        </>
      );
    case 1:
      return (
        <div style={{ paddingBottom: "4rem" }}>
          <SignUp plan={chosenPlan} isSignUpOver={signUpOver} />
        </div>
      );
    case 2:
      return (
        <>
          <Payment item={chosenPlan} dest={"admin"} />
        </>
      );
    case 3:
      return (
        <>
          <h1> Your Subscription is Done ! Thank you </h1>
        </>
      );
    default:
      return "unknown step";
  }
}

const Subscription = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);

  const steps = getSteps();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  /**
   * @function goToPayment
   * @desc recive prop to go to payment
   */
  const goToPayment = () => {
    // next step
    handleNext();
  };

  return (
    <div className={classes.page}>
      <Container maxWidth="md">
        <Stepper
          style={{ backgroundColor: "transparent" }}
          activeStep={activeStep}
        >
          {steps.map((step, index) => {
            return (
              <Step>
                <StepLabel> {step} </StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <GetStepContent
          activeStep={activeStep}
          handleNext={handleNext}
          handleBack={handleBack}
          goToPayment={goToPayment}
        />
        {activeStep === 4 ? (
          <Typography variant="h3" align="center">
            Thanks for Subscribing
          </Typography>
        ) : (
          <>
            {/* <Button variant="contained" color="primary" disabled={activeStep === 0} onClick={handleBack} >Back</Button>
                    <Button variant="contained" color="primary" onClick={handleNext} > {activeStep === 3 ? "Finish" : "Next"}  </Button> */}
          </>
        )}
      </Container>
    </div>
  );
};
export default Subscription;
