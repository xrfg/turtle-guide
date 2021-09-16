/**
 * @desc REDUX configuration
 */

import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import ReduxThunk from "redux-thunk";

import eventsReducer from "./reducers/eventsReducer";
import userReducer from "./reducers/userReducer";

import { saveState } from "./localStorage";

const rootReducer = combineReducers({
  events: eventsReducer,
  user: userReducer,
});
/**
 * @desc disable redux devtools if cypress requires it
 */
const Store = createStore(
  rootReducer,
  compose(
    applyMiddleware(ReduxThunk), // insert Thunk as middleware for async calls
    // add redux toll
    window.navigator.userAgent.includes("Chrome")
      ? window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
      : compose
  )
);

// Store.subscribe(()=>{
//   saveState(
//     Store.getState()
//   )
// })

export default Store;
