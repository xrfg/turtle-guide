import React from 'react';
import {  withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

//mui icons
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import SendIcon from '@material-ui/icons/Send';
import EditIcon from '@material-ui/icons/Edit';


// our theme
import {theme} from '../../styles/Theme'


//in order to use buttons import them to the required file
//import { AddButton,BackButton, DeleteButton, DragButton, SaveButton, SendButton } from "./Components/Buttons/AddButton";

const myTheme=theme
console.log(myTheme)
const ColorButton = withStyles((theme) => ({
  root: {
    color: myTheme.palette.text.primary,
    backgroundColor: myTheme.palette.secondary.main,
    '&:hover': {
      backgroundColor:myTheme.palette.text.darkGrey,
    },
  },
}))(Button);


const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

/*{const theme = createTheme({
  palette: {
    primary: {
      main:'#F5F5F5',
      grey:'#525252',
      gainsboro:'#D9D9D9',
      cultured:'#F5F5F5',
      ming:'#3B6C70',
      darkblue:'#284A63'
    },
    
  },
});}*/

export function SaveButton() {
    const classes = useStyles();
  
    return (
      <div>
        <ColorButton
        endIcon={<SaveOutlinedIcon style={{fontSize:"18"}} />} 
        variant="contained"
         className={classes.margin}>
         save
        </ColorButton>
      </div>
    );
  }

  export function DeleteButton() {
    const classes = useStyles();
  
    return (
      <div>
        <ColorButton
        endIcon={<DeleteIcon style={{fontSize:"18"}} />} 
        variant="contained"
         className={classes.margin}>
         Delete
        </ColorButton>
      </div>
    );
  }

export function AddButton() {
  const classes = useStyles();

  return (
    <div>
      <ColorButton
      endIcon={<AddOutlinedIcon style={{fontSize:"18"}} />} 
      variant="contained" 
       className={classes.margin}>
       add
      </ColorButton>
    </div>
  );
}

export function BackButton() {
    const classes = useStyles();
    return (
      <div>
        <ColorButton
        startIcon={< ArrowBackOutlinedIcon style={{fontSize:"18"}} />} 
        variant="contained" 
         className={classes.margin}>
         go back
        </ColorButton>
      </div>
    );
  }
  export function SendButton() {
    const classes = useStyles();
    return (
      <div>
        <ColorButton
        endIcon={< SendIcon style={{fontSize:"18"}} />} 
        variant="contained" 
         className={classes.margin}>
         send
        </ColorButton>
      </div>
    );
  }

  export function DragButton() {
    const classes = useStyles();
    return (
      <div>
        <ColorButton
        startIcon={< DragIndicatorIcon style={{fontSize:"25"}} />} 
        variant="contained" 
         className={classes.margin}>
        </ColorButton>
      </div>
    );
  }
  export function EditButton() {
    const classes = useStyles();
    return (
      <div>
        <ColorButton
        endIcon={< EditIcon style={{fontSize:"18"}}/>} 
        variant="contained" 
         className={classes.margin}>
           edit
        </ColorButton>
      </div>
    );
  }