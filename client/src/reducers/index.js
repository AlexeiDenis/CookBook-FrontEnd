import { combineReducers } from "redux";
import authReducer from "./authReducer";
import recipeReducer from "./recipeReducer.js";
export default combineReducers({
  auth: authReducer,
  recipes: recipeReducer,
});
