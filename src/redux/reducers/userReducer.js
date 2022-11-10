const initialState = {
  user: {  },
  isLoggedIn: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.data,
        isLoggedIn:true
      };
    case "LOGOFF":
      return {
        ...state,
        user: null,
        isLoggedIn:false
      };
    default:
      return state;
  }
};
