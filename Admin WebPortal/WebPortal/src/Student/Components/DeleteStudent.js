import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Divider from "@material-ui/core/Divider";
//firebase
import firebase from '../../shared/backend'

const useStyles = makeStyles((theme) => ({
  dialogTitle: {
    variant: "h6",
    color: theme.palette.primary.main,
  },
  demo: {
    variant: "h6",
    color: "#fff",
    fontFamily: "Montserrat, sans-serif"
  },

}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});


export default function DeleteStudent(props) {
  const classes = useStyles();


  const CloseDeleteDialogHandler = () => {
    props.setOpenDeleteDialog(false);
  };

  const confirmDeleteHandler = () => {
    const std = props.students[props.stdId]
    firebase.database().ref('Student/' + props.stdId).remove()
  };

  return (
    <>


      <Dialog
        onClose={CloseDeleteDialogHandler}
        open={props.OpenDeleteDialog}
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
      >

        <DialogTitle
          onClose={CloseDeleteDialogHandler}
          className={classes.dialogTitle}
          style={{ backgroundColor: "#2E1B4B" }}
        >
          Delete Student Confirmation
        </DialogTitle>
        <Divider light variant="middle" />
        <DialogContent dividers style={{ backgroundColor: "#2E1B4B" }}>
          <div className={classes.demo}>
            Are you sure you want to delete this Student?
          </div>
        </DialogContent>

        <DialogActions style={{ backgroundColor: "#2E1B4B" }}>


          <Button
            onClick={confirmDeleteHandler}
            variant="contained"
            color="secondary"
          >
            Yes
          </Button>
          <Button
            onClick={CloseDeleteDialogHandler}
            variant="outlined"
            color="secondary"
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

