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
import AddSubjectForm from "./AddSubjectForm";
import MenuBookIcon from '@material-ui/icons/MenuBook';

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

const AddSubject = (props) => {
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
    semester: "",
    credit: "",

  };
  
 
  return (
    <Fragment>
      <Dialog open={props.open} fullWidth maxWidth="sm" >
        <DialogTitle disableTypography style={{   backgroundColor:"#2E1B4B"}}>
          <Typography variant="h4" align="center" className={classes.mainHeadTypo} >
           Add Subject
          </Typography>

          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <MenuBookIcon style={avatarStyle} />
            </Avatar>
          </div>
        </DialogTitle>
        <DialogContent dividers style={{   backgroundColor:"#2E1B4B"}}>
          <div className={classes.demo}>
            <AddSubjectForm
              subjects = {props.subjects}
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

export default AddSubject;
