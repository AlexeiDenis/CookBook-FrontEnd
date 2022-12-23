const INITIAL_STATE = {
  isSignedIn: null,
  userId: null,
  email: null,
  image: null,
};

const authReducer= (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        userId: action.payload.userId,
        email: action.payload.email,
        image: action.payload.image,
        name: action.payload.name,
      };
    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        userId: null,
        email: null,
        image: null,
      };
    default:
      return state;
  }
};

export default authReducer;