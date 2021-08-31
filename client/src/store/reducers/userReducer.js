import { SIGN_UP, SIGN_UP_ERROR } from "../types";

const initialState = {
  isAuthenticated: false,
  userProfile: {},
  token: null,
  accountIdenti: null,
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
      console.log("REDUCER PAYLOAD", action.payload);
      return {
        ...state, // ! IMPORTANT spreads the actual state
        isAuthenticated: true,
        userProfile: action.payload,
        loading: false,
      };

    case SIGN_UP_ERROR:
      return {
        ...state, // ! IMPORTANT spreads the actual state
        isAuthenticated: false,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
