import history from "../history"
import recipes from "../api/recipe";
export const signIn = (userId, email, image, name) => {
  return { type: "SIGN_IN", payload: { userId: userId,  email : email, image: image, name: name} };
};

export const signOut = () => {
  return { type: "SIGN_OUT" };
};

export const recipeCreation = () => {
  return { type: "CREATE_RECIPE" };
};
export const fetchesCreation = () => {
  return { type: "FETCH_RECIPES" };
};

export const fetchCreation = () => {
  return { type: "FETCH_RECIPE" };
};
export const deleteCreation = () => {
  return { type: "DELETE_RECIPE" };
};

export const editCreation = () => {
  return { type: "EDIT_RECIPE" };
};

export const createRecipe = (formValues) => {
  return async (dispatch, getState) => {
    const { userId } = getState().auth;
    const res = await recipes.post("/recipes", { ...formValues, userId });
    dispatch({ type: recipeCreation, payload: res.data });
    // Do some programmatic navigation to get the user back to the route
    history.push('/')
  };
};

export const fetchRecipes = () => {
  return async (dispatch) => {
    const res = await recipes.get("/recipes");
    dispatch({ type: fetchesCreation, payload: res.data });
  };
};

export const fetchRecipe = (id) => {
  return async (dispatch) => {
    const res = await recipes.get(`/recipes/${id}`);
    dispatch({ type: fetchCreation, payload: res.data });
  };
};

export const deleteRecipe = (id) => {
  return async (dispatch) => {
    await recipes.delete(`/recipes/${id}`);
    dispatch({ type: deleteCreation, payload: id });
    history.push('/')
  };
};
export const editRecipe = (id, formValues) => {
  return async (dispatch) => {
    const res = await recipes.patch(`/recipes/${id}`, formValues);
    dispatch({ type: editCreation, payload: res.data });
    history.push('/')
  };
};
