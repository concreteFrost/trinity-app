const initialState = {
  user: {  },
  isLoggedIn: false,
};

export const userReducer = (state = initialState, action) => {
  console.log('user reducer', state)
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.data,
        isLoggedIn:true
      };
    default:
      return state;
  }
};
