import { combineReducers } from "redux";
import {
  allCharactersReducer,
  cheracterDetailsReducer,
  allCharacterChildsReducer,
} from "./allCharactersReducer";

const reducer = combineReducers({
  allCharacters: allCharactersReducer,
  cheracterDetails: cheracterDetailsReducer,
  allCharacterChilds: allCharacterChildsReducer,
});

export default reducer;
