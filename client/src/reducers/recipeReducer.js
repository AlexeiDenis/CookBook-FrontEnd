import {
  recipeCreation,
  fetchesCreation,
  fetchCreation,
  deleteCreation,
  editCreation,
} from "../actions";

const recipeReducer = (state = {}, action) => {
  switch (action.type) {
    case fetchesCreation:
      return {
        ...state,
        ...action.payload.reduce((newState, recipe) => {
          newState[recipe.id] = recipe;
          return newState;
        }, {}),
      };
    case fetchCreation:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case recipeCreation:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case editCreation:
      return {
        ...state,
        [action.payload.id]: action.payload,
      };
    case deleteCreation:
      const { [action.payload]: removedStream, ...newState } = state;
      return newState;
    default:
      return state;
  }
};

export default recipeReducer;
