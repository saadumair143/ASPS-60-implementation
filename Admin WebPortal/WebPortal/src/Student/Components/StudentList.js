import { Typography } from "@material-ui/core";
import React from "react";
import AppBar from "@material-ui/core/AppBar";

import Container from "@material-ui/core/Container";
import StudentListItems from "./StudentListItems";

const StudentList = (props) => {

  const heading = {
    padding: "13px",
    fontSize: "1.2rem",
  };
  if (props.items ===undefined) {
    return (
      <>
        <AppBar position="static" style={{backgroundColor:"#ec407a"}}>
          <Typography style={heading}>STUDENTS</Typography>
        </AppBar>
        <Container maxWidth="md" component="main">
          <Typography
            variant="h4"
            color="primary"
            align="center"
            style={{ padding: "20px 0px" }}
          >
            {"No students are added!"}
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <AppBar position="static" style={{backgroundColor:"#ec407a"}}>
        <Typography style={heading} variant="h6">STUDENTS</Typography>
      </AppBar>
      {Object.values(props.items).map((std) => (
        <StudentListItems
          key={std.id}
          id={std.id}
          email = {std.email}
          password = {std.password}
          name = {std.name}
          program = {std.program}
          semester = {std.semester}
          profileLink = {std.profileLink}
          students = {props.items}
          setStudents = {props.setStudents}
        />
      ))}
    </>
  );
};
export default StudentList;
