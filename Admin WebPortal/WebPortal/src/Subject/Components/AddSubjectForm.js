import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import firebase from '../../shared/backend'
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

const AddSubjectForm = (props) => {

  const classes = useStyles();
  const validationSchema = yup.object().shape({
    name: yup
      .string()
      .required("This field is required")
      .matches(/^[A-Za-z ]*$/, "Please enter valid name (Alphabets Only)")
      .min(3, "First Name must be atleast 3 characters"),

    credit: yup
      .string()
      .required("This field is required"),


    semester: yup
      .string()
      .required("This field is required"),

  });


  ;
  const onSubmitHandler = (values) => {
    var a;
    firebase.database().ref('Subject/').once('value', (snapshot) => {
      if (snapshot.val() == undefined && snapshot.val() == null) {
        a = 0
      } else {
        a = Object.values(snapshot.val()).length
      }
    }).then(() => {
      firebase.database().ref('Subject/' + a).set({
        credit: values.credit,
        id: a,
        name: values.name,
        semester: values.semester,
        teacherid: null
      })
    })
    console.log(props.subjects);
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
                  id="credit"
                  label="Credit"
                  name="credit"
                  autoComplete="credit"

                  helperText={
                    <ErrorMessage
                      name="credit"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>

              <Grid item xs={12} sm={12}>
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


              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="secondary"
                className={classes.submit}
                disabled={!(fProps.isValid || fProps.isSubmitting)}
              >
                Add Subject
              </Button>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AddSubjectForm;
