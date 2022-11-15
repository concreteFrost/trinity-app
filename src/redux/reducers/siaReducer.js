const initialState = {
  doorstaff:{}
};

export const siaReducer = (state = initialState, action) => {

  switch (action.type) {
    case "LOOKUP":
      return {
        ...state, doorstaff: action.data
      }

    case "CLEAR":
      return {
        ...state,
        doorstaff: {},
      };

    default:
      return state;
  }
};
