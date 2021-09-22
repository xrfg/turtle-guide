/**
 * @desc Compoentn for the sign in
 */

import React, { useState, useEffect } from "react";

// * Mat UI
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { theme } from "../../styles/Theme";

// * Imports
import { useHistory } from "react-router-dom";

// * REDUX
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../store/actions/userActions";
import CustomButton from "../../Components/Buttons/CustomButtons/CustomButton";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Turtle App
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  page: { ...theme.admin.page },
  container: { ...theme.admin.container },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "2rem",
    width: "110%",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

export default function SignIn() {
  // * Hooks
  const classes = useStyles();
  const history = useHistory();
  // ! to remove for development
  const user1 = {
    email: "jdoe@email.com",
    password: "123456",
  };

  const user2 = {
    email: "marcotestacc@gmail.com",
    password: "marcotestacc",
  };

  // * states
  // ! to remove for development
  // const [loginData, setLoginData] = useState({});
  const [loginData, setLoginData] = useState(user1);

  //REDUX
  const dispatch = useDispatch();

  // getting states from REDUX
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // in case the user is already autenticated
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/admin/account");
    }
    //eslint-disable-next-line
  }, []);

  /**
   * @function onChange
   * @desc grabs inputs changes while user types
   */
  const onChange = function (e) {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  /**
   * @function submitUserData
   * @desc sends the data
   */

  const submitLoginData = async function (e) {
    e.preventDefault();

    try {
      // dispatch to REDUX
      const res = await dispatch(signIn(loginData));
      if (res.success === true) {
        history.push("/admin/account");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={classes.page}>
      <Container component="main" maxWidth="xs" className={classes.container}>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              // ! REMOVE
              // TODO
              defaultValue={loginData.email}
              onChange={onChange}
            />
            <TextField
              className={classes.textField}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              // ! REMOVE
              // TODO
              defaultValue={loginData.email}
              onChange={onChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <CustomButton
              type="submit"
              style={{ width: "100%", margin: theme.spacing(3, 0, 2) }}
              onClickFunc={(e) => submitLoginData(e)}
              text="Sign In"
            />
            {/* <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              submitLoginData(e);
            }}
          >
            Sign In
          </Button> */}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account?"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </div>
  );
}
