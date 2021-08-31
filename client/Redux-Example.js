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
const SignUp = () => {
                        // ! IMPORTANT
                        const dispatch = useDispatch();

// I get the state I want
  const stateIWant = useSelector(state=> state.STATE_I_WANT);

                        <button
                        onClick={()=>dispatch(SignUp{objectWithCredentials})}
                        >
                          Click to fire the function
  </button>
};


export default SignUp;
