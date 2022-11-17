const initialState = {
  doorstaff: [],
  errorMessage: "",
};

export const doorstaffOnSiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_DOORSTAFF_LIST":
      return {
        ...state,
        doorstaff: action.data,
      };
    case "SET_DOORSTAFF_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.data,
      };
    case "CLEAR_DOORSTAFF_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
};
