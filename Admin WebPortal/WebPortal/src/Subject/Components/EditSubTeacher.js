import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import {BsFillPersonCheckFill} from "react-icons/bs";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { BiEdit } from "react-icons/bi";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import  firebase from '../../shared/backend';
//import teachers from "../../shared/Components/teacherArray";
import { object } from "yup";

const useStyles = makeStyles((theme) => ({
  GridStyle: {
    margin: " 0px 45px 0px 23px",
  },
  FormHelperText: {
    marginLeft: 15,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 550,
  },
  root: {
    height: "100vh",
    overflowY: "auto",
    backgroundColor: "#d3d3d3",
  },
  paperStyle: {
    width: "100%",
    padding: 20,
    backgroundColor: "#2E1B4B",
    margin: "80px auto",
    [theme.breakpoints.down("xs")]: {
      paddingBottom: "50px",
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  InterviewFields: {
    marginTop: 7,
  },
  paper: {
    marginTop: theme.spacing(1),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    textAlign: "center",
    backgroundColor: "#2E1B4B",
    marginTop: 10,
  },
  mainHeadTypo: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 550,
    },
  },
};

const EditSubTeacher = (props) => {
  const [teachers,setTeachers] = useState([])
  useEffect(()=>{
    firebase.database().ref('Teacher/').on('value',(snapshot) =>{
        setTeachers(snapshot.val())
    })
  },[])

  const [assignedTch, setAssignTch] = useState(
    props.subjects[props.subId].teacherid
  );

  const handleChange = (event) => {
    setAssignTch(event.target.value);
  };
  const doneTeacher = () => {
    props.subjects[props.subId].teacherid = assignedTch;
    props.CloseDeleteDialogHandler();
  };

  const classes = useStyles();

  return (
    <>
      <Dialog open={props.OpenDeleteDialog} fullWidth maxWidth="sm">
        <DialogTitle disableTypography style={{ backgroundColor: "#2E1B4B" }}>
          <Typography
            variant="h4"
            align="center"
            className={classes.mainHeadTypo}
          >
            Update Teacher
          </Typography>

          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <BsFillPersonCheckFill />
            </Avatar>
          </div>
        </DialogTitle>
        <DialogContent dividers style={{ backgroundColor: "#2E1B4B" }}>
          <div className={classes.demo}>
            <FormControl className={classes.formControl}>
              {console.log("tecaher: " + props.subTch)}
              <InputLabel id="handle">Select Teacher for Subject</InputLabel>
              <Select
                labelId="handle"
                id="handle"
                value={assignedTch}
                onChange={handleChange}
                MenuProps={MenuProps}
              >
                {Object.values(teachers).map((tch) => (
                  <MenuItem key={tch.id + 1} value={tch.id + 1}>
                    {"Teacher: " +
                      tch.name +
                      "   |    " +
                      "Qualification: " +
                      tch.qualification}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <Grid className={classes.submit}>
            <Button
              onClick={doneTeacher}
              variant="contained"
              color="secondary"
              size="medium"
              startIcon={<BiEdit style={{ marginLeft: 6 }} />}
              disabled={!assignedTch}
            >
              Done
            </Button>
          </Grid>
        </DialogContent>

        <DialogActions style={{ backgroundColor: "#2E1B4B" }}>
          <Button
            autoFocus
            onClick={props.CloseDeleteDialogHandler}
            color="primary"
          >
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EditSubTeacher;
