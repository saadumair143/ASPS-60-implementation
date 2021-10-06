import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { useHistory, Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import { IoIosPeople } from "react-icons/io";
import { GiTeacher } from "react-icons/gi";
import { ImBooks } from "react-icons/im";

const useStyles = makeStyles((theme) => ({
  btn: {
    width: "12rem",
    height: "12rem",
     margin: "3rem",
 display: "inline-block",
  },
  buttonLabels: {
    color: "#2E1B4B",
    fontWeight: "bold",
  },
  hero: {
    height: "91.5vh",
    marginTop: 0,
    backgroundColor: "#d3d3d3",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    minHeight: "100%",
    position: "relative",
  },
  paperStyle :{
    width: "60%",
    padding: "80px 0px",
    // margin: "120px auto",
    backgroundColor: "#2E1B4B",
    [theme.breakpoints.down("sm")]: {
        margin: "40px auto",
        width:"auto", 
        padding:"0px 0px"
      },
      [theme.breakpoints.up("md")]: {
        margin: "120px auto",
      },
  }
}));
export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Toolbar />
      <div className={classes.hero}>
        <Paper elevation={10} className = {classes.paperStyle}>
          <div style={{ alignContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              component={Link}
              to="/student"
              startIcon={
                <IoIosPeople style={{ color: "#2E1B4B", fontSize: "5rem" , marginTop:"32px" }} />
              }
            >
              <Typography variant="h6" className={classes.buttonLabels}>
                Students
              </Typography>
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              component={Link}
              to="/teacher"
              startIcon={
                <GiTeacher style={{ color: "#2E1B4B", fontSize: "5rem", marginTop:"32px" }} />
              }
            >
              <Typography variant="h6" className={classes.buttonLabels}>
                Teachers
              </Typography>
            </Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.btn}
              component={Link}
              to="/subject"
              startIcon={
                <ImBooks style={{ color: "#2E1B4B", fontSize: "5rem" , marginTop:"32px"}} />
              }
            >
              <Typography variant="h6" className={classes.buttonLabels}>
                Subjects
              </Typography>
            </Button>
          </div>
        </Paper>
      </div>
    </>
  );
}
