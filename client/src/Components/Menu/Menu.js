/**
 * @desc Menu Component
 * contains all the menu items
 */
import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import "./menu.scss";

// * MatUI
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

// * Redux
import { signOut } from "../../store/actions/userActions";

/**
 * @desc It Forwards the <MenuItem/>
 * @requires path i.e. path={"/admin"}
 * @requires title i.e. title={"Admin Page"}
 */
import MenuItem from "../MenuItem/MenuItem";

import { useDispatch, useSelector } from "react-redux";
import { ourColors } from "../../styles/Theme";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    marginRight: theme.spacing(2),
  },
}));

const Menu = () => {
  // * Hooks
  const history = useHistory();
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  // states
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const dispatch = useDispatch();

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
      <div>
        {isAuthenticated ? (
          <>
            <MenuItem path={"/admin/account"} title={"Your Account"} />

            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={() => {
                dispatch(signOut());
                history.push("/");
              }}
              style={{ color: ourColors.indigoDye }}
            >
              Log out
            </Button>
          </>
        ) : null}
        {!isAuthenticated ? (
          <>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={() => {
                history.push("/subscription");
              }}
              style={{ color: ourColors.indigoDye }}
            >
              Subscribe
            </Button>
            <Button
              style={{ color: ourColors.indigoDye }}
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={() => {
                history.push("/signin");
              }}
            >
              Sign In
            </Button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default Menu;
