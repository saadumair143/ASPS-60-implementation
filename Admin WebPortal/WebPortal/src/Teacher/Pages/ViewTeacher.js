import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ListAltIcon from "@material-ui/icons/ListAlt";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import { BiEdit } from "react-icons/bi";


import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import UpdateTeacher from "../Components/UpdateTeacher";

const useStyles = makeStyles((theme) => ({
  GridStyle: {
    margin: " 0px 45px 0px 23px",
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
    backgroundColor:"#2E1B4B",
    marginTop: 10,
  },
  mainHeadTypo: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

const ViewTeacher = (props) => {
  const [disableField, setDisableField] = useState(true);

  const EnableFieldsHandler = () => {
    setDisableField(false);
  };
  const DisableFieldsHandler = () => {
    setDisableField(true);
  };

  const classes = useStyles();

  return (
   <>
      <Dialog open={props.open} fullWidth maxWidth="sm" >
        <DialogTitle disableTypography style={{   backgroundColor:"#2E1B4B"}}>
          <Typography variant="h4" align="center" className={classes.mainHeadTypo} >
           Edit Teacher
          </Typography>

          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ListAltIcon />
            </Avatar>
          </div>
        </DialogTitle>
        <DialogContent dividers style={{   backgroundColor:"#2E1B4B"}}>
          <div className={classes.demo}>
          <UpdateTeacher
            tchId={props.tchId}
            disableField={disableField}
            DisableFieldsHandler={DisableFieldsHandler}
            teachers = {props.teachers}
            setTeacher = {props.setTeacher}
          />
          </div>
          <Grid className={classes.submit}>
            {disableField && (
              <Button
                onClick={EnableFieldsHandler}
                variant="contained"
                color="secondary"
                size="medium"
                startIcon={<BiEdit style={{ marginLeft: 6 }} />}
              >
                Edit Details
              </Button>
            )}
        
          </Grid>
        </DialogContent>
       
        <DialogActions style={{   backgroundColor:"#2E1B4B"}}>
          <Button autoFocus onClick={props.handleCloseDialog} color="primary">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
  </>
  );
};

export default ViewTeacher;
