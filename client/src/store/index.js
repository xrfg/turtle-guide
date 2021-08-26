/**
 * @desc REDUX configuration
 */

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import ReduxThunk from "redux-thunk";

import itemReducer from "./reducers/itemReducer";
import userReducer from "./reducers/userReducer";

const rootReducer = combineReducers({
  guides: itemReducer,
  user: userReducer,
});

/**
 * @desc disable redux devtools if cypress requires it
 */
const Store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxThunk), // insert Thunk as middleware for async calls
    window.navigator.userAgent.includes("Chrome")
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : compose
  )
);

export default Store;
