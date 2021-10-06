import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button, Card, Grid } from "@material-ui/core";

import {BsFillPersonCheckFill} from "react-icons/bs";
import { BiEdit } from "react-icons/bi";

import AssignTeacher from "./AssignTeacher";
import EditSubTeacher from "./EditSubTeacher";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    marginTop: "15px",
    padding: "10px 17px",
  },

  ViewButton: {
    height: "35px",
    marginTop: "12px ",
    marginRight: "10px",
    [theme.breakpoints.up("sm")]: {
      float: "right",
    },
    [theme.breakpoints.down("sm")]: {
      marginRight: "0px",
    },
    [theme.breakpoints.down("xs")]: {
      marginRight: "10px",
    },
  },

  header: {
    flexGrow: 1,
  },
}));
const SubjectListItems = (props) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [subTch, setSubTch] = useState('');
  const [OpenDeleteDialog, setOpenDeleteDialog] = useState(false);

  const OpenDeleteDialogHandler = () => {
    setOpenDeleteDialog(true);
  };
  const CloseDeleteDialogHandler = () => {
    setOpenDeleteDialog(false);
  };
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleCloseDialog = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.card}>
      <Grid container spacing={5}>
        <Grid item sm={6} lg={7} style={{ flexGrow: 1 }}>
          <div className={classes.header}>
            <Typography
              variant="h6"
              align="justify"
              style={{ color: "#2E1B4B" }}
            >
              Name: {props.name}
            </Typography>
            <Typography
              variant="subtitle1"
              align="justify"
              style={{ color: "grey" }}
            >
              Credit: {props.credit}
            </Typography>
            <Typography
              variant="subtitle1"
              align="justify"
              style={{ color: "grey" }}
            >
              Semester: {props.semester}
            </Typography>
          </div>
        </Grid>

        <Grid item sm={6} lg={5} style={{ flexGrow: 1 }}>
         {props.teacherid == null ? (  
              <Button
            variant="contained"
            style={{ backgroundColor: "#2E1B4B", color: "#FFFFFF" }}
            className={classes.ViewButton}
            startIcon={<BsFillPersonCheckFill style={{ marginLeft: 6 }} />}
            onClick={() => {
              handleOpenDialog();
            }}
          >
            Assign Teacher
          </Button> 
     
         ): 
         (
            <Button
            variant="contained"
            style={{ backgroundColor: "#2E1B4B", color: "#FFFFFF" }}
            className={classes.ViewButton}
            startIcon={<BiEdit style={{ marginLeft: 6 }} />}
            onClick={() => {
              OpenDeleteDialogHandler();
            }}
          >
            Edit Teacher
          </Button> 
         )
        
        }            
         </Grid>
      </Grid>
      {OpenDeleteDialog && (
        <EditSubTeacher
          OpenDeleteDialog={OpenDeleteDialog}
          CloseDeleteDialogHandler={CloseDeleteDialogHandler}
          subId={props.id}
          subjects={props.subjects}
          setSubjects={props.setSubjects}
          subTch = {subTch}
           setSubTch = {setSubTch}
        />
      )}
         {
            open && (
           <AssignTeacher
          open={open}
          handleCloseDialog={handleCloseDialog}
          setOpen={setOpen}
        subId={props.id}
           subjects = {props.subjects}
           setSubjects = {props.setSubjects}
           subTch = {subTch}
           setSubTch = {setSubTch}
        />
            )}
    </Card>
  );
};

export default SubjectListItems;
