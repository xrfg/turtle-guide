// create a type in store/types.js
export const SIGN_UP = "SIGN_UP";
export const SIGN_UP_ERROR = "SIGN_UP_ERROR";

import axios from "axios";
// create an action in store/actions/userActions.js
import { SIGN_UP, SIGN_UP_ERROR } from "../types";

export const userSignUp = (obj) => {
  // destru
  const {
    firstName,
    lastName,
    company,
    accountName,
    email,
    isAdmin, // ghost parameter
    password,
  } = obj;

  // DO Something with that

  try {
    const res = await axios(); // make an API call
    await dispatch({
      type: SIGN_UP,
      payload: res.data.items,
    });
    return res;
  } catch (error) {
    dispatch({
      type: SIGN_UP_ERROR,
      payload: error,
    });
    console.error("error", error);
  }
};

// HOW TO CALL THE ACTION IN A COMPONENT

// ? IMPORT REDUX TOOLS
import { useDispatch, connect, useSelector } from "react-redux";
// ? IMPORT THE ACTION
import { userSignUp } from "./store/action/userActions";

// pass the states and the functions
const SignUp = ({ state, userSignUp }) => {
  const count = useSelector(selectCount);
  // ! IMPORTANT
  const dispatch = useDispatch();
};

// ? with this I can get the states I want

const mapStateToProps = (state) => ({
  //  states
});

// I Connect Redux
// ! IMPORTANT I add the function
export default connect(mapStateToProps, { userSignUp })(SignUp);
