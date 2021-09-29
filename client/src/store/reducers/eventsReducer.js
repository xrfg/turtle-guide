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

const persistedState = loadState()?.events;

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
