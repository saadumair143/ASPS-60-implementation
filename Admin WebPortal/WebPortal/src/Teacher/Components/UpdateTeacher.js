import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { BiSave } from "react-icons/bi";
import students from "../../shared/Components/studentsArray";


const useStyles = makeStyles((theme) => ({
  GridStyle: {
    margin: " 0px 45px 0px 23px",
    [theme.breakpoints.down("xs")]: {
      marginLeft: 0,
    },
  },
  InterviewFields: {
    marginTop: 7,
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

  qualification: yup
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

  
});

const UpdateTeacher = (props) => {
  const teacherId = props.tchId;
  const classes = useStyles();

  const [arr, setArr] = useState(props.teachers);
  // const [reRender, setReRender] = useState(false);

  // useEffect(()=>{
  //  console.log("hello")
  // }, [reRender])

  useEffect(() => {
    console.log("rerender");
  }, [props.teachers]);

  const initialValues = {
    name: props.teachers[teacherId].name,
    qualification: props.teachers[teacherId].qualification,
    email: props.teachers[teacherId].email,
    password: props.teachers[teacherId].password,
  };

  const onSubmitHandler = (values) => {
    var dummyItem = arr[teacherId];
    dummyItem.name = values.name;
    dummyItem.qualification = values.qualification;
    dummyItem.email = values.email;
    dummyItem.password = values.password;

    let dummyArr = arr;
    dummyArr[teacherId] = dummyItem;
    setArr(dummyArr);

    console.log(arr[teacherId]);
    //    setReRender(!reRender)

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
            <Grid item xs={12} sm={6}>
                            <Field
                                as={TextField}
                                autoComplete="name"
                                name="name"
                                variant="standard"
                                fullWidth
                                size = "small"
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
                                size = "small"
                                id="qualification"
                                label="Qualification"
                                name="qualification"
                                autoComplete="qualification"

                                helperText={
                                    <ErrorMessage
                                        name="qualification"
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
                                size = "small"
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
                                size = "small"
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
export default UpdateTeacher;
