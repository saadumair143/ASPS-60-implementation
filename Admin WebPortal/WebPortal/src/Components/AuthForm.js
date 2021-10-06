import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import {Redirect} from "react-router-dom";
import { Typography } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
  input: {
    color: "white",
  },

  submit: {
    margin: "10px 0px",
  },
  error:{
    color: "red"
  }
}));

export default function AuthForm(props) {
  const classes = useStyles();
  const validationSchema = yup.object().shape({
    email: yup.string()
        .email("Please enter valid email")
        .required("Email is required"),
    password: yup.string()
        .min(6, "Password must be atleast 6 characters long")
        .required("Password is required"),
});

   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [loggedIn, setLoggedIn] = useState(false);
   const [error, setError] = useState(false);
 
  const onSubmitHandler = (values) => {
    console.log(values.email);
    console.log(values.password);
    if (values.email === "admin1@gmail.com" && values.password === "admin1")
    {
      setError(false);
      setLoggedIn(true);
    }
    else
    {
     setError(true);
    }
  };

  const onChange = (e)=>{
     e.target.name == "email"? setEmail(e.target.value) : setPassword(e.target.value)
  }

  if(loggedIn)
  {
    return <Redirect to="/home"/>
  }
  if (props.isTeacher) {
    return (
      <Formik
      initialValues={props.initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
  >

      {(props) => (
          <Form>
              <Field
                  as={TextField}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  size="medium"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={
                      <ErrorMessage
                          name="email"
                          style={{ color: "red", fontWeight: "bold" }}
                      />
                  }
              />

              <Field
                  as={TextField}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  size="medium"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText={
                      <ErrorMessage
                          name="password"
                          style={{ color: "red", fontWeight: "bold" }}
                      />
                  }
              />
              {error ? (
                  <Typography className="MuiFormHelperText-root" align="center" variant="body2" className={classes.error}>Username or Password is incorrect!</Typography>
              ) : " "}
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={!(props.isValid || props.isSubmitting)}
                  className={classes.submit}
              >
                  Sign In
              </Button>

          </Form>
      )}
  </Formik>
  );
              }
  else
  {
    return (
      <Formik
      initialValues={props.initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmitHandler}
  >

      {(props) => (
          <Form>
              <Field
                  as={TextField}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  size="medium"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={
                      <ErrorMessage
                          name="email"
                          style={{ color: "red", fontWeight: "bold" }}
                      />
                  }
              />

              <Field
                  as={TextField}
                  variant="standard"
                  margin="normal"
                  required
                  fullWidth
                  size="medium"
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  helperText={
                      <ErrorMessage
                          name="password"
                          style={{ color: "red", fontWeight: "bold" }}
                      />
                  }
              />
              {error ? (
                  <Typography className="MuiFormHelperText-root" align="center" variant="body2" className = {classes.error}>Username or Password is incorrect!</Typography>
              ) : " "}
              <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="secondary"
                  disabled={!(props.isValid || props.isSubmitting)}
                  className={classes.submit}
              >
                  Sign In
              </Button>

          </Form>
      )}
  </Formik>
  );
  }
}

  //     <form className={classes.form} noValidate autoComplete="off" onSubmit={onSubmitHandler}>
  //       <Field
  //         as = {TextFields}
  //         variant="standard"
  //         margin="normal"
  //         id="standard-size-small"
  //         size="small"
  //         required
  //         fullWidth
  //         id="TeacherEmail"
  //         label="Teacher ID"
  //         name="email"
  //         autoComplete="email"
  //         autoFocus
  //         value = {email}
  //         onChange = {onChange}
         
  //       />

  //       <TextField
  //         variant="standard"
  //         margin="normal"
  //         id="standard-si
  //         ze-small"
  //         size="small"
  //         required
  //         fullWidth
  //         name="password"
  //         label="Password"
  //         type="password"
  //         id="TeacherPass"
  //         autoComplete="current-password"
  //         value = {password}
  //         onChange = {onChange}
         
  //       />

  //       <Button
  //         type="submit"
  //         fullWidth
  //         variant="contained"
  //         color="secondary"
  //         className={classes.submit}
  //       >
  //         Sign In
  //       </Button>
  //       {error && <Typography variant="body2" className={classes.error}>Username or Password is incorrect!</Typography>}
  //       <Grid container>
  //         <Grid item xs>
  //           <Link href="" variant="body2">
  //             Forgot password?
  //           </Link>
  //         </Grid>
  //       </Grid>
  //     </form>
  //   );
  // } else {
  //   return (
  //     <form className={classes.form} noValidate autoComplete="off" onSubmit={onSubmitHandler}>
  //       <TextField
  //         variant="standard"
  //         margin="normal"
  //         id="standard-size-small"
  //         size="small"
  //         required
  //         fullWidth
  //         id="AdminEmail"
  //         label="Admin ID"
  //         name="email"
  //         autoComplete="email"
  //         autoFocus
  //         value={email}
  //         onChange = {onChange}
  //       />

  //       <TextField
  //         variant="standard"
  //         margin="normal"
  //         id="standard-size-small"
  //         size="small"
  //         required
  //         fullWidth
  //         name="password"
  //         label="Password"
  //         type="password"
  //         id="AdminPass"
  //         autoComplete="current-password"
  //         value={password}
  //         onChange = {onChange}
  //       />

  //       <Button
  //         type="submit"
  //         fullWidth
  //         variant="contained"
  //         color="secondary"
  //         className={classes.submit}
  //       >
  //         Sign In
  //       </Button>
  //       {error && <Typography variant="body2"  className={classes.error}>Username or Password is incorrect!</Typography>}
  //     </form>
