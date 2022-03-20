import { combineReducers } from "redux";
import {
  allCharactersReducer,
  allInitialCharactersReducer,
  cheracterDetailsReducer,
  allCharacterChildsReducer,
} from "./allCharactersReducer";

const reducer = combineReducers({
  allCharacters: allCharactersReducer,
  initialCharacters: allInitialCharactersReducer,
  cheracterDetails: cheracterDetailsReducer,
  allCharacterChilds: allCharacterChildsReducer,
});

export default reducer;
