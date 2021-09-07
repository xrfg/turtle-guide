import React from 'react';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { green, purple } from '@material-ui/core/colors';

//mui icons
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import ArrowBackOutlinedIcon from '@material-ui/icons/ArrowBackOutlined';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import SendIcon from '@material-ui/icons/Send';


const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);
const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

const theme = createTheme({
  palette: {
    primary: green,
  },
});

export function SaveButton() {
    const classes = useStyles();
  
    return (
      <div>
        <ColorButton
        endIcon={<SaveOutlinedIcon color="black"/>} 
        variant="contained" color="primary"
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
        endIcon={<DeleteIcon color="black"/>} 
        variant="contained" color="primary"
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
      endIcon={<AddOutlinedIcon color="black"/>} 
      variant="contained" color="primary"
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
        startIcon={< ArrowBackOutlinedIcon color="black"/>} 
        variant="contained" color="primary"
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
        startIcon={< SendIcon color="black"/>} 
        variant="contained" color="primary"
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
        startIcon={< DragIndicatorIcon color="black"/>} 
        variant="contained" color="primary"
         className={classes.margin}>
        </ColorButton>
      </div>
    );
  }