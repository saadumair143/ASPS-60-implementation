import { Paper, Typography } from "@material-ui/core";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import TeacherListItems from "./TeacherListItems";

const useStyles = makeStyles((theme) => ({
  paper: {
    margin: "30px auto",
    padding: "20px 50px",
  },
}));

const TeacherList = (props) => {
  const classes = useStyles();

  const heading = {
    padding: "13px",
    fontSize: "1.2rem",
    fontWeight: "bold"
  };
  if (props.items.length === 0) {
    return (
      <>
        <AppBar position="static" style={{ backgroundColor: "#ec407a" }}>
          <Typography style={heading}>TEACHERS</Typography>
        </AppBar>
        <Container maxWidth="md" component="main">
          <Typography
            variant="h4"
            color="primary"
            align="center"
            style={{ padding: "20px 0px" }}
          >
            {"No teachers are added!"}
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#ec407a" }}>
        <Typography style={heading} variant="h6">TEACHERS</Typography>
      </AppBar>
      {Object.values(props.items).map((tch) => (
        <TeacherListItems
          key={tch.id}
          id={tch.id}
          name={tch.name}
          email={tch.email}
          password={tch.password}
          qualification={tch.qualification}
          teachers={props.items}
          setTeacher={props.setTeacher}
        />
      ))}
    </>
  );
};
export default TeacherList;
