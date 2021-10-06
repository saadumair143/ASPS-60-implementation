import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import teachers from "../../shared/Components/teacherArray";
import AddTeacher from "../Components/AddTeacher";
import TeacherList from "../Components/TeacherList";
import firebase from '../../shared/backend'
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    overflowY: "auto",
    backgroundColor: "#d3d3d3",
  },
  paper: {
    padding: "20px 20px",
    backgroundColor: "#2E1B4B",
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(9, 1),

      width: "auto",
    },
    [theme.breakpoints.up("md")]: {
      margin: theme.spacing(15, 10),
      width: "auto",
    },
  },
  button: {
    float: "right",
    marginBottom: 15,
  },
  collapse: {
    width: "100%",
  },
}));

export default function Teacher() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [teacher, setTeacher] = useState(teachers);
  useEffect(() => {
    firebase.database().ref('Teacher/').on('value', (snapshot) => {
      setTeacher(snapshot.val())
    })
  }, [])
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <Container maxWidth="lg" component="main">
          <Paper elevation={5} className={classes.paper}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#ec407a", color: "fff" }}
              onClick={() => {
                handleOpenDialog();
              }}
              className={classes.button}
              startIcon={<AddIcon />}
            >
              Add Teacher
            </Button>

            {open && (
              <AddTeacher
                open={open}
                handleCloseDialog={handleCloseDialog}
                setOpen={setOpen}
                teacher={teacher}
              />
            )}

            {teacher && <TeacherList items={teacher} setTeacher={setTeacher} />}
          </Paper>
        </Container>
      </div>
    </>
  );
}
