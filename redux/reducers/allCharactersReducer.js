import {
  ALL_CHARACTERS_SUCCESS,
  ALL_CHARACTERS_FAIL,
  CHARACTER_DETAILS_SUCCESS,
  CLEAR_CHARACTERS,
  ALL_CHARACTERS_SEARCH_REQUEST,
  ADMIN_REQUEST,
  COMICS_SUCCESS,
  CLEAR_ERRORS,
  EVENTS_SUCCESS,
  STORIES_SUCCESS,
  SERIES_SUCCESS,
} from "../constants/characterConstants";
import _ from "lodash";

// Allcharacters reducer
export const allCharactersReducer = (
  state = { characters: [], count: 0 },
  action
) => {
  switch (action.type) {
    case ADMIN_REQUEST:
      return {
        ...state,
        status: "loading",
      };
    case CLEAR_CHARACTERS:
      return {
        ...state,
        characters: action.characters,
      };

    case ALL_CHARACTERS_SUCCESS:
      return {
        ...state,
        characters: _.uniqBy(
          state.characters.concat(action.payload.data.results),
          "id"
        ),
        count: action.payload.data.offset + 30,
        status: "idle",
        functionType: action.functionType,
      };

    case ALL_CHARACTERS_SEARCH_REQUEST:
      return {
        ...state,
        characters: action.payload.data.results,
        count: 0,
        functionType: action.functionType,
      };

    case ALL_CHARACTERS_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const cheracterDetailsReducer = (state = { character: {} }, action) => {
  switch (action.type) {
    case CHARACTER_DETAILS_SUCCESS:
      return {
        character: action.payload.data.results[0],
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const allCharacterChildsReducer = (
  state = { comicsData: {}, eventsData: {}, storiesData: {}, seriesData: {} },
  action
) => {
  switch (action.type) {
    case COMICS_SUCCESS:
      return {
        ...state,
        comicsData: action.payload.data.results.map((obj) => ({
          ...obj,
          contentTitle: "Comics",
        })),
      };

    case EVENTS_SUCCESS:
      return {
        ...state,
        eventsData: action.payload.data.results.map((obj) => ({
          ...obj,
          contentTitle: "Events",
        })),
      };

    case STORIES_SUCCESS:
      return {
        ...state,
        storiesData: action.payload.data.results.map((obj) => ({
          ...obj,
          contentTitle: "Stories",
        })),
      };
    case SERIES_SUCCESS:
      return {
        ...state,
        seriesData: action.payload.data.results.map((obj) => ({
          ...obj,
          contentTitle: "Series",
        })),
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
