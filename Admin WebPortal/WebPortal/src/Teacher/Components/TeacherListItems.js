import React, { useState} from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Button, Card, Grid } from '@material-ui/core';
import {Link} from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoMdEye } from "react-icons/io";
import DeleteTeacher from './DeleteTeacher';
import ViewTeacher from '../Pages/ViewTeacher';




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
    
      accor: {
        padding: "20px 40px",
      },
      heading: {
        fontSize: theme.typography.pxToRem(20),
        fontWeight: theme.typography.fontWeightBold,
        color: "#004777",
      },

    }));
const TeacherListItems = (props) =>{

    const classes = useStyles();
  
    const [open, setOpen] = useState(false);
  
    const [OpenDeleteDialog, setOpenDeleteDialog] = useState(false);

    const OpenDeleteDialogHandler = () => {
      setOpenDeleteDialog(true);
    };

    const handleOpenDialog = () => {
      setOpen(true);
    };
    const handleCloseDialog = () => {
      setOpen(false);
    };

   
  


   
return (
  <Card className={classes.card}>
  <Grid container spacing = {5} >
    <Grid item sm={6} lg={7} style={{ flexGrow: 1 }}>
      <div className={classes.header}>
        
        <Typography variant="h6" align="justify" style={{color: "#2E1B4B"}}>
        Name: {props.name}
        </Typography>
        <Typography variant="subtitle1" align="justify"   style={{ color: "grey" }}>
        Qualification: {props.qualification}
        </Typography>
      </div>
    </Grid>

<Grid item sm={6} lg={5} style={{flexGrow:1}}>
<Button
            variant="contained"
           style={{ backgroundColor: "#2E1B4B", color: "#FFFFFF" }}
            className={classes.ViewButton}
            startIcon={<IoMdEye style={{ marginLeft: 6 }} />}
            onClick={() => {
                handleOpenDialog();
            }}
          >
           View Details
          </Button>
          {open && (
                        <ViewTeacher
                            open={open}
                            handleCloseDialog={handleCloseDialog}
                            setOpen={setOpen}
                            tchId={props.id}
                            teachers = {props.teachers}
                            setTeacher = {props.setTeacher}
                          
                        />
                    )}

          <Button
          variant="contained"
          style={{ backgroundColor: "#2E1B4B", color: "#FFFFFF" }}
          className={classes.ViewButton}
          startIcon={<RiDeleteBin6Line style={{ marginLeft: 6 }} />}
          onClick={() => {
            OpenDeleteDialogHandler();
          }}
          >
           Delete
          </Button>
          </Grid>
          </Grid>
          {OpenDeleteDialog && (
                        <DeleteTeacher
                        OpenDeleteDialog={OpenDeleteDialog}
                        setOpenDeleteDialog={setOpenDeleteDialog}
                            tchId = {props.id}
                            teachers = {props.teachers}
                            setTeacher={props.setTeacher}
                        />
                    )}
</Card>



);
}

export default TeacherListItems;