import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { BsFillPersonCheckFill } from "react-icons/bs";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { IoCheckmarkDone } from "react-icons/io5";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";

import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import firebase from '../../shared/backend'


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

const AssignTeacher = (props) => {
  const [teachers, setTeacher] = useState([])
  useEffect(() => {
    firebase.database().ref('Teacher/').on('value', (snapshot) => {
      if (snapshot.val() != undefined && snapshot.val() != null) {
        setTeacher(snapshot.val())
      }
    })
  }, [])


  const handleChange = (event) => {
    props.setSubTch(event.target.value);
  };
  const doneTeacher = () => {
    const actualTid = props.subTch.slice(0,-1)
    firebase.database().ref('Subject/'+props.subId).update({teacherid:actualTid})
    //props.subjects[props.subId].teacherid = props.subTch;
    props.handleCloseDialog();
  };

  const classes = useStyles();

  return (
    <>
      <Dialog open={props.open} fullWidth maxWidth="sm">
        <DialogTitle disableTypography style={{ backgroundColor: "#2E1B4B" }}>
          <Typography
            variant="h4"
            align="center"
            className={classes.mainHeadTypo}
          >
            Assign Teacher
          </Typography>
          {props.subTch && console.log(props.subTch)}

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
              <InputLabel id="handle">Select Teacher for Subject</InputLabel>
              <Select
                labelId="handle"
                id="handle"
                value={props.subTch}
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
              startIcon={<IoCheckmarkDone style={{ marginLeft: 6 }} />}
              disabled={!props.subTch}
            >
              Done
            </Button>
          </Grid>
        </DialogContent>

        <DialogActions style={{ backgroundColor: "#2E1B4B" }}>
          <Button autoFocus onClick={props.handleCloseDialog} color="primary">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AssignTeacher;
