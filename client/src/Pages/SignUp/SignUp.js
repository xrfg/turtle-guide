/**
 * @desc Component for the user SignUp
 */
import React, { useState } from "react";

import { theme } from "../../styles/Theme";

// * Mat UI
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

// * REDUX
import { useDispatch } from "react-redux";
import { userSignUp } from "../../store/actions/userActions";

import "./signUp.scss";
import validation from "./validation";
import CustomButton from "../../Components/Buttons/CustomButtons/CustomButton";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://google.com/">
        Turtle App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "2rem",
    width: "60%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
}));

export default function SignUp(props) {
  // * Hooks
  const classes = useStyles();
  const dispatch = useDispatch();

  // * States
  const [userData, setUserData] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(true);

  /**
   * @function onChange
   * @desc grabs inputs changes while user types
   */
  const onChange = function (e) {
    setUserData({
      ...userData,
      plan: props.plan.name, // add chosen plan
      [e.target.name]: e.target.value,
    });
  };

  /**
   * @function submitUserData
   * @desc sends the data
   */

  const submitUserData = function (e) {
    e.preventDefault();

    setErrors(validation(userData));
    setIsValid(validation(isValid));
    // dispatch to REDUX
    dispatch(userSignUp(userData))
      .then((res) => {
        if (res.data.success) {
          // send over by props
          props.isSignUpOver(true);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <form className={classes.form} noValidate onSubmit={submitUserData}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="fname"
              name="firstName"
              variant="outlined"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              onChange={onChange}
            />
            {errors.firstName && <p className="errors">{errors.firstName}</p>}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="lname"
              onChange={onChange}
            />
            {errors.lastName && <p className="errors">{errors.lastName}</p>}
          </Grid>
          {/* company */}
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              fullWidth
              id="company"
              label="Company"
              name="company"
              autoComplete="com"
              onChange={onChange}
            />
          </Grid>
          {/* account name */}
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="accountName"
              label="Account Name"
              name="accountName"
              autoComplete="aname"
              onChange={onChange}
            />
            {errors.accountName && (
              <p className="errors">{errors.accountName}</p>
            )}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={onChange}
            />
            {errors.email && <p className="errors">{errors.email}</p>}
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Password"
              id="password"
              autoComplete="current-password"
              // type={userData.showPassword ? "text" : "password"}
              onChange={onChange}
            />

            {errors.password && <p className="errors">{errors.password}</p>}
          </Grid>
          {/* Confirmation password */}
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="confirm_password"
              label="Confirm password"
              id="confirm_password"
              autoComplete="current-password"
              onChange={onChange}
            />
            {errors.confirm_password && (
              <p className="errors">{errors.confirm_password}</p>
            )}
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="Subscribe our Newsletter"
            />
          </Grid>
        </Grid>
        <CustomButton
          type="submit"
          style={{ width: "100%", margin: theme.spacing(3, 0, 2) }}
          text="Sign Up"
        />

        <Grid container justifyContent="flex-end">
          <Grid item style={{ paddingBottom: "2rem" }}>
            <Link href="#" variant="body2">
              Already have an account?
            </Link>
          </Grid>
        </Grid>
      </form>

      <Copyright />
    </div>
  );
}
