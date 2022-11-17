const initialState = {
  siaNumber : null,
  doorstaff: {},
  errorMessage: "",
};

export const siaReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SIA_NUMBER":
      return{
        ...state, siaNumber : action.data
      }
    case "GET_SIA_DATA":
      return {
        ...state,
        doorstaff: action.data,
      };
    case "CLEAR_SIA_DATA":
      return {
        ...initialState
      };
    case "SET_SIA_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: action.data,
      };
    case "CLEAR_SIA_ERROR_MESSAGE":
      return {
        ...state,
        errorMessage: "",
      };

    default:
      return state;
  }
};
