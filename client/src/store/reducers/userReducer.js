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
} from "../types";

import { loadState } from "../localStorage";

const persistedState = loadState()?.user;

const initialState = persistedState
  ? persistedState
  : {
      isAuthenticated: false,
      userProfile: {},
      token: null,
      accountIdentifier: {},
      loading: true,
      error: null,
    };

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
  /**
   * @desc Switches the action besed on the types i.e. SIGN_UP
   */
  switch (action.type) {
    case SIGN_UP:
      return {
        ...state,
        isAuthenticated: true,
        userProfile: action.payload,
        loading: false,
      };

    case SIGN_UP_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: action.payload,
        loading: false,
      };

    case SIGN_IN:
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload,
        loading: false,
      };

    case SIGN_IN_ERROR:
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        error: action.payload,
        loading: false,
      };
    case USER_FETCH:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
      };
    case USER_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case USER_UPDATE:
      return {
        ...state,
        userProfile: action.payload,
        loading: false,
      };
    case USER_UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case SIGN_OUT:
      return {
        ...state,
        isAuthenticated: false,
        userProfile: {},
        token: null,
        loading: false,
      };

    default:
      return state;
  }
};
