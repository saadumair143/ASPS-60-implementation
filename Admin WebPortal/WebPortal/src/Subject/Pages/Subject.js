import React, { useState, useEffect } from "react";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import subjects from "../../shared/Components/subjectsArray";
import AddSubject from "../Components/AddSubject";
import SubjectList from "../Components/SubjectList";
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

export default function Subject() {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [subject, setSubjects] = useState([]);

  useEffect(() => {
    firebase.database().ref('Subject/').on('value', (snapshot) => {
      if (snapshot.val() != undefined && snapshot.val() != null) {
        setSubjects(snapshot.val())
      }
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
              Add Subject
            </Button>

            {open && (
              <AddSubject
                open={open}
                handleCloseDialog={handleCloseDialog}
                setOpen={setOpen}
                subjects={subject}
              />
            )}

            {subject && <SubjectList
              items={subject}
              setSubjects={setSubjects}

            />}
          </Paper>
        </Container>
      </div>
    </>
  );
}


