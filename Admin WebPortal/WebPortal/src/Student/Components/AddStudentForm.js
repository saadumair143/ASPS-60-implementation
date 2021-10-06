import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
//firebase
import firebase from '../../shared/backend';
const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  Typography: {
    fontFamily: theme.typography.fontFamily,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  GridStyle: {
    margin: "0px 22px",
  },
  error: {
    color: "red"
  }
}));

const AddStudentForm = (props) => {

  const classes = useStyles();
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("This field is required")
      .matches(/^[A-Za-z ]*$/, "Please enter valid name (Alphabets Only)")
      .min(3, "First Name must be atleast 3 characters"),

    program: yup
      .string()
      .required("This field is required")
      .matches(/^[A-Za-z ]*$/, "Please enter Program name (Alphabets Only)")
      .min(3, "Last Name must be atleast 3 characters"),

    email: yup.string()
      .required("This field is required")
      .email("Please enter valid email"),

    password: yup
      .string()
      .required("This field is required")
      .min(6, "Password must be atleast 6 characters long"),


    semester: yup
      .string()
      .required("This field is required"),

    profileLink: yup
      .string()
      .required("This field is required")
  });
  ;
  const onSubmitHandler = (values) => {
    firebase.auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        firebase.database().ref('Student/' + res.user.uid).set({
          email: values.email,
          id: res.user.uid,
          name: values.name,
          password: values.password,
          profileLink: values.profileLink,
          program: values.program,
          semester: values.semester,
          subject: []
        })
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
    props.setOpen(false);
  };

  return (
    <>
      <Formik
        initialValues={props.initialValues}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
      >
        {(fProps) => (
          <Form className={classes.form}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  autoComplete="name"
                  name="name"
                  variant="standard"
                  fullWidth
                  size="small"
                  id="name"
                  label="Name"
                  autoFocus
                  helperText={
                    <ErrorMessage
                      name="name"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  variant="standard"
                  fullWidth
                  size="small"
                  id="program"
                  label="Program"
                  name="program"
                  autoComplete="program"

                  helperText={
                    <ErrorMessage
                      name="program"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  variant="standard"
                  fullWidth
                  size="small"
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
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  variant="standard"
                  fullWidth
                  size="small"
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

              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  variant="standard"
                  fullWidth
                  size="small"
                  name="semester"
                  label="Semester"
                  id="semester"
                  autoComplete="semester"
                  helperText={
                    <ErrorMessage
                      name="semester"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <Field
                  as={TextField}
                  variant="standard"
                  fullWidth
                  size="small"
                  name="profileLink"
                  label="Profile Link"
                  id="profileLink"
                  helperText={
                    <ErrorMessage
                      name="profileLink"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>


              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                disabled={!(fProps.isValid || fProps.isSubmitting)}
              >
                Add Student
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddStudentForm;
