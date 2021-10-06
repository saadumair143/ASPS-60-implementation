import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BiSave } from "react-icons/bi";
import students from "../../shared/Components/studentsArray";
//import firebase 
import firebase from '../../shared/backend';


const useStyles = makeStyles((theme) => ({
  GridStyle: {
    margin: " 0px 45px 0px 23px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  submit: {
    textAlign: "center",

    marginTop: 10,
  },
}));

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

  email: yup
    .string()
    .required("This field is required")
    .email("Please enter valid email"),

  password: yup
    .string()
    .required("This field is required")
    .min(6, "Password must be atleast 6 characters long"),

  semester: yup.string().required("This field is required"),

  profileLink: yup.string().required("This field is required"),
});

const UpdateStudent = (props) => {
  const studentId = props.stdId;
  const classes = useStyles();

  const [arr, setArr] = useState(props.students);
  // const [reRender, setReRender] = useState(false);

  // useEffect(()=>{
  //  console.log("hello")
  // }, [reRender])

  useEffect(() => {

  }, []);
  const [user, setUser] = useState(props.students[studentId])
  const initialValues = {
    name: props.students[studentId].name,
    program: props.students[studentId].program,
    email: props.students[studentId].email,
    password: props.students[studentId].password,
    semester: props.students[studentId].semester,
    profileLink: props.students[studentId].profileLink,
  };

  const onSubmitHandler = (values) => {
    try {
      firebase.auth().signInWithEmailAndPassword(String(user.email), String(user.password)).then(
        function (userCredential) {
          userCredential.user.updateEmail(values.email);
        }).then(res => {
          firebase.database().ref('Student/' + user.id+'/').update({ email: values.email })
        })
        
    } catch (err) {
      alert('Please retry')
    }
    props.DisableFieldsHandler();
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmitHandler}
      >
        {(fProps) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  inputProps={{ readOnly: true }}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Name"
                  name="name"
                  helperText={
                    <ErrorMessage
                      name="name"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  inputProps={{ readOnly: true }}
                  id="program"
                  multiline
                  variant="standard"
                  margin="normal"
                  fullWidth
                  name="program"
                  label="Program"
                  helperText={
                    <ErrorMessage
                      name="program"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  inputProps={{ readOnly: props.disableField }}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  helperText={
                    <ErrorMessage
                      name="email"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  inputProps={{ readOnly: true }}
                  id="password"
                  multiline
                  variant="standard"
                  margin="normal"

                  fullWidth
                  name="password"
                  label="Password"
                  helperText={
                    <ErrorMessage
                      name="password"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  id="semester"
                  label="Semester"
                  name="semester"
                  inputProps={{ readOnly: true }}
                  helperText={
                    <ErrorMessage
                      name="semester"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
              <Grid item={true} xs={12} sm={6}>
                <Field
                  as={TextField}
                  id="profileLink"
                  multiline
                  variant="standard"
                  margin="normal"
                  fullWidth
                  name="profileLink"
                  inputProps={{ readOnly: true }}
                  label="Profile Link"
                  helperText={
                    <ErrorMessage
                      name="profileLink"
                      style={{ color: "red", fontWeight: "bold" }}
                    />
                  }
                />
              </Grid>
            </Grid>

            <Grid className={classes.submit}>
              {!props.disableField && (
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  size="medium"
                  disabled={!(fProps.isValid || fProps.isSubmitting)}
                  startIcon={<BiSave style={{ marginLeft: 6 }} />}
                >
                  Save Changes
                </Button>
              )}
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default UpdateStudent;
