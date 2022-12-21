import { LOGIN } from "../types";

const initialState = {
  user: {  },
  isLoggedIn: false,
};

export const userReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        user: action.data,
        isLoggedIn:true
      };
    
    default:
      return state;
  }
};
