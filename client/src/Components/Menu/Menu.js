/**
 * @desc Menu Component
 * contains all the menu items
 */
import React, { useState, useRef, useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import "./menu.scss";

// MatUI
import Button from "@material-ui/core/Button";
// import MenuList from "@material-ui/core/MenuList";
// import MenuItem from "@material-ui/core/MenuItem";

// import ClickAwayListener from "@material-ui/core/ClickAwayListener";
// import Grow from "@material-ui/core/Grow";
// import Paper from "@material-ui/core/Paper";
// import Popper from "@material-ui/core/Popper";
import { makeStyles } from "@material-ui/core/styles";

import { signOut } from "../../store/actions/userActions";

/**
 * @desc It Forwards the <MenuItem/>
 * @requires path i.e. path={"/admin"}
 * @requires title i.e. title={"Admin Page"}
 */
import MenuItem from "../MenuItem/MenuItem";

import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const Menu = () => {
  // React Router DOM
  const history = useHistory();

  // Mat UI Classes
  const classes = useStyles();

  // states
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const dispatch = useDispatch();

  // // Drop down handlers
  // const handleToggle = () => {
  //   setOpen((prevOpen) => !prevOpen);
  // };

  // const handleClose = (event) => {
  //   if (anchorRef.current && anchorRef.current.contains(event.target)) {
  //     return;
  //   }

  //   setOpen(false);
  // };

  // function handleListKeyDown(event) {
  //   if (event.key === "Tab") {
  //     event.preventDefault();
  //     setOpen(false);
  //   }
  // }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div className="">
        <MenuItem path={"/admin/account"} title={"Your Account"} />
        {/* // ! IMPORTANT the old dropdown is still here in case we'll need it */}
        {/* DROP DOWN START */}
        {/* <Button
          ref={anchorRef}
          aria-controls="{open ? 'menu-list-grow' : undefined}"
          aria-haspopup="true"
          // FOR CLICK
          // onClick={handleToggle}
          // FOR OVER
          onMouseOver={handleToggle}
        >
          Account
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="menu-list-grow"
                    onKeyDown={handleListKeyDown}
                    // REMOVE
                    // MenuListProps={{ onMouseLeave: handleClose }}
                  >
                    <MenuItem title={<Link to="/account">Admin</Link>} />
                    <MenuItem onClick={handleClose} title={"Current Events"} />
                    <MenuItem onClick={handleClose} title={"New Events"} />
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
        {/* // ! IMPORTANT the old dropdown is still here in case we'll need it */}
        {/* DROP DOWN END */}
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={() => {
            dispatch(signOut());
            history.push("/");
          }}
        >
          Log out
        </Button>
      </div>
    </div>
  );
};

export default Menu;
