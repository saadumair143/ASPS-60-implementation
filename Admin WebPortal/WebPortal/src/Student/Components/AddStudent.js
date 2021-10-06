import React, { Fragment} from "react";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import AddStudentForm from "./AddStudentForm";
import {BsFillPeopleFill} from "react-icons/bs";

//import {BsPeopleCircle} from "react-icons/bs";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
 
  },
  mainHeadTypo: {
    color:theme.palette.primary.main, 
    fontWeight:"bold"
  },
  avatar: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const AddStudent = (props) => {
  const paperStyle = {
    width: 400,
    padding: 20,
    margin: "100px auto",

  };
  const avatarStyle = {
    backgroundColor: "primary",
  };
  const classes = useStyles();
  const initialValues = {
    name: "",
    program: "",
    email: "",
    password: "",
    //semester: "",
    //profileLink:""
  
  };
  
 
  return (
    <Fragment>
      <Dialog open={props.open} fullWidth maxWidth="sm" >
        <DialogTitle disableTypography style={{   backgroundColor:"#2E1B4B"}}>
          <Typography variant="h4" align="center" className={classes.mainHeadTypo} >
           Add Student
          </Typography>

          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <BsFillPeopleFill style={avatarStyle} />
            </Avatar>
          </div>
        </DialogTitle>
        <DialogContent dividers style={{   backgroundColor:"#2E1B4B"}}>
          <div className={classes.demo}>
            <AddStudentForm
              students = {props.students}
              setOpen={props.setOpen}
              initialValues = {initialValues}
            />
          </div>
        </DialogContent>
        <DialogActions style={{   backgroundColor:"#2E1B4B"}}>
          <Button autoFocus onClick={props.handleCloseDialog} color="primary">
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AddStudent;
