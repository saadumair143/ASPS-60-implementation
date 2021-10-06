import { Typography } from "@material-ui/core";
import React from "react";
import AppBar from "@material-ui/core/AppBar";

import Container from "@material-ui/core/Container";
import SubjectListItems from "./SubjectListItems";

const SubjectList = (props) => {
  const heading = {
    padding: "13px",
    fontSize: "1.2rem",
  };
  if (props.items.length === 0) {
    return (
      <>
        <AppBar position="static" style={{backgroundColor:"#ec407a"}}>
          <Typography style={heading}>SUBJECTS</Typography>
        </AppBar>
        <Container maxWidth="md" component="main">
          <Typography
            variant="h4"
            color="primary"
            align="center"
            style={{ padding: "20px 0px" }}
          >
            {"No subjects are added!"}
          </Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <AppBar position="static" style={{backgroundColor:"#ec407a"}}>
        <Typography style={heading} variant="h6">SUBJECTS</Typography>
      </AppBar>
      {props.items.map((sub) => (
        <SubjectListItems
          key={sub.id}
          id={sub.id}
          name = {sub.name}
          credit = {sub.credit}
          semester = {sub.semester}
          teacherid = {sub.teacherid}
          subjects = {props.items}
          setSubjects = {props.setSubjects}
        />
      ))}
    </>
  );
};
export default SubjectList;
