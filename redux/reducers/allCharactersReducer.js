import {
  ALL_CHARACTERS_SUCCESS,
  CHARACTER_DETAILS_SUCCESS,
  ALL_CHARACTERS_SEARCH_REQUEST,
  COMICS_SUCCESS,
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

    default:
      return state;
  }
};
