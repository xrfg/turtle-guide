import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';


import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// import { withRouter } from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    width: 500,
  },
});

export default function LabelBottomNavigation(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState('recents');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <BottomNavigation showLabels value={value} onChange={handleChange} 
     className={classes.root}>
  <BottomNavigationAction label="Guide" value="Guide"/>
  <BottomNavigationAction label="Profile" value="profile" />
  <BottomNavigationAction label="Account Name" value="Account Name"/>

  <BottomNavigationAction label="Logout" value="Logout"  />
</BottomNavigation>
    
  );
}