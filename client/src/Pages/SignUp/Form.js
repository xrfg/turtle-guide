import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios"

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://google.com/">
        Turtle App
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Form() {
// form
  // const submit=async(event)=>{
  //   event.preventDefault()
  //   const firstname=await event.target.firstname.value
  //   const lastname=await event.target.lastname.value
  //   const email=await event.target.email.value
  //   const message=await event.target.message.value
  //   const formData=await {
  //     firstname,
  //     lastname,
  //     email,
  //     message
  //   }
  //   console.log(formData);
  //  axios.post("http://localhost:6000/forms",formData).then((res)=>{
  //    console.log(res)
  //   //  window.location.replace("/")
  //   }).catch(err=>console.log(err))}

  const[values, setValues] = useState({});

  const changeHandler = function(e){
    setValues({...values, [e.target.name]: e.target.value})
  }

  const submitHandler = function(e){
    e.preventDefault();
console.log('request sent')
    axios({
      method: 'post',
      url: 'http://localhost:5000/singup',
      /* baseURL: 'http://localhost:5000',*/
    
      data: values 
    }).then((res)=>{
      console.log(res);
    }).catch((err)=>{
      console.log(err)
    });
    console.log(values);
        window.location.replace("/")
    
  }


// form



  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={submitHandler}>
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
                onChange={changeHandler}
               
            
               
              />
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
             
                onChange={changeHandler}
              />
            </Grid>
            {/* company */}
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                autoComplete="com"
                
                onChange={changeHandler}
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
                
                onChange={changeHandler}
              />
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
              
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={changeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="Subscribe our News Letter"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit} 
            
          >
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}