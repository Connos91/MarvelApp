import axios from "axios";
import md5 from "js-md5";
import {
  ALL_CHARACTERS_SUCCESS,
  INITIAL_CHARACTERS_SUCCESS,
  CHARACTER_DETAILS_SUCCESS,
  ALL_CHARACTERS_SEARCH_REQUEST,
  COMICS_SUCCESS,
  EVENTS_SUCCESS,
  STORIES_SUCCESS,
  IS_SEARCH_ACTIVE,
  SERIES_SUCCESS,
} from "../constants/characterConstants";

const PUBLIC_KEY = "7eb20d256eac54f658d38cd1cf958acb"; // your public key
const PRIVATE_KEY = "228c16091d95d84c84ae0e78b1ed96ddb618ac62"; // youur private key

const linkConstruction = (callType, count, name, id) => {
  const ts = Number(new Date());
  const hash = md5.create();
  hash.update(ts + PRIVATE_KEY + PUBLIC_KEY);

  switch (callType) {
    case "getAllChar":
      let link = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&limit=20&offset=${count}&orderBy=name&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;
      return link;
    case "searchChar":
      let linkSearch = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&nameStartsWith=${name}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;
      return linkSearch;
    case "linkCharComics":
      let linkCharComics = `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;
      return linkCharComics;
    case "linkCharEvents":
      let linkCharEvents = `https://gateway.marvel.com/v1/public/characters/${id}/events?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;
      return linkCharEvents;
    case "linkCharStories":
      let linkCharStories = `https://gateway.marvel.com/v1/public/characters/${id}/stories?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;
      return linkCharStories;
    case "linkCharSeries":
      let linkCharSeries = `https://gateway.marvel.com/v1/public/characters/${id}/series?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;
      return linkCharSeries;
    case "linkCharDetails":
      let linkCharDetails = `https://gateway.marvel.com/v1/public/characters/${id}?ts=${ts}&apikey=${PUBLIC_KEY}&hash=${hash.hex()}`;
      return linkCharDetails;
    default:
      throw new Error();
  }
};
// Get all characters

export const getInitialChar = (count) => async (dispatch) => {
  try {
    const link = linkConstruction("getAllChar", count, null, null);
    const { data } = await axios.get(link);

    dispatch({
      type: INITIAL_CHARACTERS_SUCCESS,
      payload: data,
      functionType: "refresh",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCharacters = (count) => async (dispatch) => {
  try {
    const link = linkConstruction("getAllChar", count, null, null);
    const { data } = await axios.get(link);

    dispatch({
      type: ALL_CHARACTERS_SUCCESS,
      payload: data,
      functionType: "refresh",
    });
  } catch (error) {
    console.log(error);
  }
};

export const searchCharacter = (name) => async (dispatch) => {
  try {
    const link = linkConstruction("searchChar", null, name, null);
    const { data } = await axios.get(link);

    dispatch({
      type: ALL_CHARACTERS_SEARCH_REQUEST,
      payload: data,
      functionType: "search",
      count: 0,
    });

    dispatch({
      type: IS_SEARCH_ACTIVE,
      isActive: false,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getCharacterChilds = (linkType, id) => async (dispatch) => {
  try {
    const link = linkConstruction(linkType, null, null, id);
    const { data } = await axios.get(link);

    if (linkType === "linkCharComics") {
      dispatch({
        type: COMICS_SUCCESS,
        payload: data,
      });
    } else if (linkType === "linkCharEvents") {
      dispatch({
        type: EVENTS_SUCCESS,
        payload: data,
      });
    } else if (linkType === "linkCharStories") {
      dispatch({
        type: STORIES_SUCCESS,
        payload: data,
      });
    } else if (linkType === "linkCharSeries") {
      dispatch({
        type: SERIES_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getCharacterDetails = (req, id) => async (dispatch) => {
  try {
    const link = linkConstruction("linkCharDetails", null, null, id);
    const { data } = await axios.get(link);

    dispatch({
      type: CHARACTER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};
