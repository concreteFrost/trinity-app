const initialState = {
    doorstaff:{}
  };
  
  export const doorstaffOnSite = (state = initialState, action) => {
  
    switch (action.type) {
      case "GET_DOORSTAFF":
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
  