const initialState = {
    doorstaff: {}
};

export const siaReducer = (state = initialState, action) => {
  
    switch (action.type) {
        case "LOOKUP":
            return {
                ...state, doorstaff: action.data
            }
        default:
            return state;
    }
};
