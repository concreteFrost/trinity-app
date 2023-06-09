import { CLEAR_ERROR_ON_LOGIN, LOGIN, SHOW_ERROR_ON_LOGIN } from "../types";

const initialState = {
  user: {},
  isLoggedIn: false,
  errorOnLogin: false
};

export const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.data,
        isLoggedIn: true
      };

    case SHOW_ERROR_ON_LOGIN:
      return {
        ...state,
        errorOnLogin: true
      };

    case CLEAR_ERROR_ON_LOGIN:
      return {
        ...state, errorOnLogin: false
      }
    default:
      return state;
  }
};
