import React, { useState } from "react";
import {
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Container,
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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  flexbox: {
    display: "flex",
    justifyContent: "space-around",
  },
});

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
          <Container className={classes.flexbox}>
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://www.leicastore-frankfurt.de/contenido/leica/upload/Wetzlar/Leica_Museumsshop/Museumsshop_2.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Basic Plan $ 200
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Basic Plan of our Tour you can benefits a lot of our Museum
                    Guides is simply dummy text of the printing and typesetting
                    industry. Lorem Ipsum has been the industry's standard dummy
                    text ever since the 1500s, when an unknown printer took a
                    galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the
                    leap into electronic typesetting, remaining essentially
                    unchanged. It was popularised in
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // set plan
                    setChosenPlan(objPlanBasic);

                    // go to next
                    handleNext();
                  }}
                >
                  {" "}
                  {activeStep === 3 ? "Finish" : "Next"}{" "}
                </Button>
              </CardActions>
            </Card>

            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://museen-in-hessen.de/medien/1429173538-4223-990.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Standard Plan $ 500
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // set plan
                    setChosenPlan(objPlanStandard);

                    // go to next
                    handleNext();
                  }}
                >
                  {" "}
                  {activeStep === 3 ? "Finish" : "Next"}{" "}
                </Button>
              </CardActions>
            </Card>

            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image="https://museen-in-hessen.de/medien/1429173538-4223-990.jpg"
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Premium Plan $ 800
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    // set plan
                    setChosenPlan(objPlanPremium);
                    // go to next
                    handleNext();
                  }}
                >
                  {" "}
                  {activeStep === 3 ? "Finish" : "Next"}{" "}
                </Button>
              </CardActions>
            </Card>
          </Container>
          {/* Business Plan card s */}
        </>
      );
    case 1:
      return (
        <>
          <SignUp plan={chosenPlan} isSignUpOver={signUpOver} />
        </>
      );
    case 2:
      return (
        <>
          <Payment item={chosenPlan} />
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
    <div>
      <Stepper activeStep={activeStep}>
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
    </div>
  );
};
export default Subscription;
