import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import AuthForm from "../Components/AuthForm";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflowY: "auto",
    backgroundColor: "#d3d3d3",
    paddingLeft: 60,
    [theme.breakpoints.down("xs")]: {
      paddingLeft: 0,
    },
  },
  input: {
    color: "white",
  },
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  Typography: {
    fontFamily: theme.typography.fontFamily,
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
  submit: {
    margin: "10px 0px",
  },
  mainHeadTypo: {
    fontWeight: "bold",
    //color: "#D2EEC770", //grey
    color: "#B8A4C7",
  },
  signIn: {
    color: theme.palette.primary.main,
    marginBottom: "10px",
  },
  switchContainer: {
    backgroundColor: "#B8A4C7",
    borderRadius: "14px",
    width: "13rem",
    height: "2.4rem",
    padding: "5px",
  },
  switchButtons: {
    borderRadius: "14px",
    height: "1.8rem",
    width: "6rem",
    fontSize: "0.8rem",
  },
  SwitchActiveColor: {
    borderRadius: "14px",
    backgroundColor: "#2E1B4B",

    height: "1.8rem",
    width: "6rem",
    fontSize: "0.8rem",
    "&:hover": {
      backgroundColor: "#2E1B4B",
    },
  },
}));

export default function SignIn() {
  const [isTeacher, setIsTeacher] = useState(false);
  const initialValues = {
    email: "",
    password: "",
  };
  const classes = useStyles();
  const paperStyle = {
    width: "80%",
    padding: 20,
    margin: "120px auto",
    backgroundColor: "#2E1B4B",
  };

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="sm" style={{ padding: "0px" }}>
        <Paper elevation={10} style={paperStyle}>
          <Typography
            align="center"
            variant="h4"
            className={classes.mainHeadTypo}
          >
            ASPS
          </Typography>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h6" className={classes.signIn}>
              Sign in
            </Typography>
            <div className={classes.switchContainer}>
            <Button
                className={
                  !isTeacher ? classes.SwitchActiveColor : classes.switchButtons
                }
                onClick={() => setIsTeacher(false)}
              >
                Admin
              </Button>
              <Button
                className={
                  isTeacher ? classes.SwitchActiveColor : classes.switchButtons
                }
                onClick={() => setIsTeacher(true)}
              >
                Teacher
              </Button>
            
            </div>
            <AuthForm
             isTeacher={isTeacher}
             initialValues={initialValues}
            />
          </div>
          <Box mt={3}></Box>
        </Paper>
      </Container>
    </div>
  );
}
