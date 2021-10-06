import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddStudent from "../Components/AddStudent";
import StudentList from "../Components/StudentList";
import students from "../../shared/Components/studentsArray";
//firebase
import firebase from '../../shared/backend'
import { object } from "yup/lib/locale";

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

export default function Student() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [student, setStudents] = useState([]);
  useEffect(() => {
    firebase.database().ref('Student/').on('value', (snapshot) => {
      setStudents(snapshot.val())
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
              Add Student
            </Button>

            {open && (
              <AddStudent
                open={open}
                handleCloseDialog={handleCloseDialog}
                setOpen={setOpen}
                students={student}
              />
            )}

            {student && <StudentList
              items={student}
              setStudents={setStudents}

            />}
          </Paper>
        </Container>
      </div>
    </>
  );
}
