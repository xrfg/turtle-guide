import {
  EVENT_CREATE,
  EVENT_CREATE_ERROR,
  EVENT_UPDATE,
  EVENT_UPDATE_ERROR,
  EVENTS_FETCH,
  EVENTS_FETCH_ERROR,
  EVENT_GUIDE,
  EVENT_GUIDE_ERROR,
  EVENT_DELETE_ERROR,
  EVENTS_CLEAN,
} from "../types";

import { loadState } from "../localStorage";

const persistedState = loadState().events;

const initialState = persistedState
  ? persistedState
  : {
      events: [], // all events
      eventGuide: {}, // the event the guide will render
      loading: true,
      error: null,
    };

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default (state = initialState, action) => {
  switch (action.type) {
    case EVENT_CREATE:
      return {
        ...state,
        events: [...state.events, action.payload],
        loading: false,
      };

    case EVENT_CREATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case EVENT_UPDATE:
      // find index to replace
      const findIndex = state.events.findIndex(
        (x) => x.nameIdentifier === action.payload.nameIdentifier
      );
      // replace before passing states
      state.events.splice(findIndex, 1, action.payload);

      return {
        ...state,
        events: state.events,
        loading: false,
      };

    case EVENT_UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case EVENTS_CLEAN:
      return {
        ...state,
        events: [],
        loading: false,
      };

    case EVENT_DELETE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case EVENTS_FETCH:
      return {
        ...state,
        events: action.payload,
        loading: false,
      };

    case EVENTS_FETCH_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case EVENT_GUIDE:
      return {
        ...state,
        eventGuide: action.payload,
        loading: false,
      };

    case EVENT_GUIDE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

// export default (state = initialState, action) => {
//   switch (action.type) {
//   //   case GOOGLE_SEARCH:
//   //     return {
//   //       ...state,
//   //       googleSearch: [...action.payload],
//   //       loading: true,
//   //     };
//   //   case GOOGLE_SEARCH_ERROR:
//   //     return {
//   //       ...state,
//   //       error: action.payload,
//   //       loading: true,
//   //     };

//   //   case GOOGLE_SEARCH_CLEAR:
//   //     return {
//   //       ...state,
//   //       googleSearch: [],
//   //       loading: true,
//   //     };
//   //   case GOOGLE_SEARCH_CLEAR_ERROR:
//   //     return {
//   //       ...state,
//   //       error: action.payload,
//   //       loading: true,
//   //     };
//   //   case GOOGLE_SEARCH_SEARCHED:
//   //     return {
//   //       ...state,
//   //       googleSearched: action.payload,
//   //       loading: true,
//   //     };
//   //   case GOOGLE_SEARCH_SEARCHED_ERROR:
//   //     return {
//   //       ...state,
//   //       error: action.payload,
//   //       loading: true,
//   //     };
//   //   case ADD_TO_WOO_DB_ERROR:
//   //     return {
//   //       ...state,
//   //       error: action.payload,
//   //       loading: true,
//   //     };
//   //   case UPDATE_WOO_DB_ERROR:
//   //     return {
//   //       ...state,
//   //       error: action.payload,
//   //       loading: true,
//   //     };

//   //   case WOO_DB_ALL:
//   //     return {
//   //       ...state,
//   //       wooDbAll: action.payload,
//   //       loading: true,
//   //     };

//   //   case WOO_DB_IN:
//   //     return {
//   //       ...state,
//   //       wooDbIn: action.payload,
//   //       loading: true,
//   //     };

//   //   case WOO_DB_OUT:
//   //     return {
//   //       ...state,
//   //       wooDbOut: action.payload,
//   //       loading: true,
//   //     };
//   //   case WOO_DB_ERROR:
//   //     return {
//   //       ...state,
//   //       error: action.payload,
//   //       loading: true,
//   //     };
//   //   case WOO_DB_DELETE_ALL:
//   //     if (state.wooDbAll === null) {
//   //       return state;
//   //     } else {
//   //       return {
//   //         ...state,
//   //         wooDbAll: state.wooDbAll.filter((item) => item.id !== action.payload),
//   //         loading: true,
//   //       };
//   //     }

//   //   case WOO_DB_DELETE_IN:
//   //     if (state.wooDbIn === null) {
//   //       return state;
//   //     } else {
//   //       return {
//   //         ...state,
//   //         wooDbIn: state.wooDbIn.filter((item) => item.id !== action.payload),
//   //         loading: true,
//   //       };
//   //     }

//   //   case WOO_DB_DELETE_OUT:
//   //     if (state.wooDbOut === null) {
//   //       return state;
//   //     } else {
//   //       const idToFind = action.payload;
//   //       const arrayIds = state.wooDbOut.map((item) => console.log(item.id));
//   //       const found = arrayIds.find((element) => element === idToFind);
//   //       return {
//   //         ...state,
//   //         wooDbOut: state.wooDbOut.filter((item) => item.id !== action.payload),
//   //         loading: true,
//   //       };
//   //     }
//   //   case WOO_DB_DELETE_ERROR:
//   //     return {
//   //       ...state,
//   //       error: action.payload,
//   //       loading: true,
//   //     };
//   //   case WOO_DB_SEARCH_STATE:
//   //     return {
//   //       ...state,
//   //       wooDbSearchState: action.payload,
//   //     };
//   //   case WOO_DB_SEARCH_STATE_ERROR:
//   //     return {
//   //       ...state,
//   //       error: action.payload,
//   //       loading: true,
//   //     };
//   //   case WOO_DB_SEARCH_TERM:
//   //     return {
//   //       ...state,
//   //       wooDbSearchTerm: action.payload,
//   //     };
//   //   case WOO_DB_SEARCH_TERM_ERROR:
//   //     return {
//   //       ...state,
//   //       error: action.payload,
//   //       loading: true,
//   //     };
//   //   case WOO_DB_DATA_READY:
//   //     return {
//   //       ...state,
//   //       wooDbDataReady: action.payload,
//   //       loading: true,
//   //     };
//   //   case WOO_DB_DATA_READY_ERROR:
//   //     return {
//   //       ...state,
//   //       error: action.payload,
//   //       loading: true,
//   //     };
//   //   case WOO_DB_SEARCH_CLEAR:
//   //     return {
//   //       ...state,
//   //       wooDbSearchTerm: null,
//   //       wooDbAll: null,
//   //       wooDbIn: null,
//   //       wooDbOut: null,
//   //       wooDbSearchState: null,
//   //       loading: true,
//   //     };
//   //   case WOO_DB_SEARCH_CLEAR_ERROR:
//   //     return {
//   //       ...state,
//   //       error: action.payload,
//   //       loading: true,
//   //     };
//   //   case SET_LOADING:
//   //     return {
//   //       ...state,
//   //       loading: action.payload,
//   //     };
//   //   case SET_LOADING_ERROR:
//   //     return {
//   //       ...state,
//   //       error: action.payload,
//   //       loading: false,
//   //     };
//     default:
//       return state;
//   }
// };
