import {
  SIGN_UP,
  SIGN_UP_ERROR,
  SIGN_IN,
  SIGN_IN_ERROR,
  SIGN_OUT,
  USER_FETCH,
  USER_FETCH_ERROR,
  USER_UPDATE,
  USER_UPDATE_ERROR,
  EVENTS_CLEAN, // to clean events on sign out
} from "../types";

import axios from "axios";
import { createObj } from "../functions/functions";

/**
 * @desc BASE URLs
 */
// url TO create a User
const BASEurlUser = "/api/users/";
const BASEurlAuth = "/api/auth/";

/**
 * @userSignUp
 * @desc action to register a user
 */

export const userSignUp = (obj) => {
  return async (dispatch) => {
    // uses a function to create an object for axios
    const objToSend = createObj({
      method: "POST",
      url: BASEurlUser,
      data: obj,
    });

    try {
      // API call
      const results = await axios(objToSend);

      // if success keeps going
      if (results.data.success === true) {
        /**
         * @desc add the fucntion to login and get a token
         */
        await dispatch(
          signIn({
            email: obj.email,
            password: obj.password,
          })
        );

        // creater a payload to send
        const payload = {
          firstName: results.data.data.firstName,
          lastName: results.data.data.lastName,
          company: results.data.data.company,
          accountName: results.data.data.accountName,
          email: results.data.data.email,
          isAdmin: results.data.data.isAdmin,
        };

        // dispatch to the reducer (update state)
        await dispatch({ type: SIGN_UP, payload: payload });
        return results;
      }
    } catch (error) {
      console.error(error);
      await dispatch({ type: SIGN_UP_ERROR, payload: error });
    }
  };
};

/**
 * @desc action to login a user and get a token
 */

export const signIn = (obj) => {
  return async (dispatch) => {
    // uses a function to create an object for axios
    const objToSend = createObj({
      method: "POST",
      url: BASEurlAuth,
      data: obj,
    });

    try {
      // API Call
      const res = await axios(objToSend);

      // dispatch to the reducer (update state)
      await dispatch({ type: SIGN_IN, payload: res.data.data.token });
      return res.data;
    } catch (error) {
      console.error(error);
      await dispatch({ type: SIGN_IN_ERROR, payload: error });
    }
  };
};

/**
 * @desc action to get the user info to edit in admin
 */

export const userFecth = (token) => {
  return async (dispatch) => {
    // uses a function to create an object for axios
    const objToSend = createObj({
      method: "GET",
      url: BASEurlAuth,
      token: token,
    });

    try {
      // API Call
      const res = await axios(objToSend);
      // dispatch to the reducer (update state)
      await dispatch({ type: USER_FETCH, payload: res.data.data });
      return res.data.data;
    } catch (error) {
      console.error(error);
      await dispatch({ type: USER_FETCH_ERROR, payload: error });
    }
  };
};

/**
 * @desc action to update the user info from admin
 */

export const userUpdate = (obj) => {
  //
  return async (dispatch) => {
    // uses a function to create an object for axios
    const objToSend = createObj({
      method: "PUT",
      url: BASEurlUser,
      data: obj.user,
      token: obj.token,
    });

    try {
      // API Call
      const res = await axios(objToSend);
      // dispatch to the reducer (update state)
      await dispatch({ type: USER_UPDATE, payload: res.data.data });
      return res.data;
    } catch (error) {
      console.error(error);
      await dispatch({ type: USER_UPDATE_ERROR, payload: error });
    }
  };
};

/**
 * @desc action to sign out
 */

export const signOut = () => {
  return async (dispatch) => {
    await dispatch({ type: SIGN_OUT });
    await dispatch({ type: EVENTS_CLEAN });
  };
};
