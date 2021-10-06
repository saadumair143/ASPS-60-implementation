
import './App.css';
import { createTheme , ThemeProvider} from "@material-ui/core";
import {  Route, Switch, useLocation } from 'react-router-dom';
import Auth from "./Pages/Auth";
import Home from "./Pages/Home";
import Student from "./Student/Pages/Student";
import MainNavbar from './shared/Components/NavigationElements/MainNavbar';
import ViewStudent from './Student/Pages/ViewStudent';
import Teacher from './Teacher/Pages/Teacher';
import Subject from './Subject/Pages/Subject';

const theme = createTheme ({

  palette: {
    primary: {
      // main: "#583c87",
      // main: "#2a0134",
      main: "#B8A4C7", //light purple
      // main: "#2E1B4B", //dark purple

      // main: "#482880",
    
      // light: "#7986cb",
      contrastText: "#fff"
    },
    secondary: {
      main: "#ec407a",
    }
  },
  typography: {
  
    fontFamily: "Montserrat, sans-serif",
     button: {
      fontFamily: "Montserrat, sans-serif", 
      textTransform: 'none',
      fontWeight:"bold", 
      color: "white"
    },
    h3: {
      fontSize: "3rem",
    },
    h4:{
      fontSize: "1.7rem"
    },
    h5: {
      fontSize: "1.5rem",
    },
    h6: {
      fontSize: "1.1rem",
      fontWeight: "bold",
    },
    body1:{
      fontSize: "1rem",
    }
  },
 
  overrides: {
    MuiInputBase: {
      input: {
       color: "white", 
       fontSize: "0.9rem" 
       
      }, 
     
    },
    MuiFormLabel: {
      root: {
       color: "#dacfed", 
       fontSize:"1rem", 
       "& .Mui-disabled": {
        color: "rgba(230, 230, 230, 0.5)"
      }
       
      }
      
      
    } , 
    MuiButton:{
      label:{
        color: "white", 
        
      }
    } ,
    MuiFormHelperText:{
      root:{
        color:"red"
      }
    }
  
  }
})
function App() {
  let location = useLocation();
  return (
    <ThemeProvider theme={theme}>
    <div className="App">
     
      <Switch>
        <Route exact path="/" component={Auth}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/student" component={Student}></Route>

           <Route exact path="/teacher" component={Teacher}></Route>
           <Route exact path="/subject" component={Subject}></Route>
        
      </Switch>
    
     {location.pathname !== "/" && <MainNavbar/> }

    </div>
    </ThemeProvider>
  );
}

export default App;
