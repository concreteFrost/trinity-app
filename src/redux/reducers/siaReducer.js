const initialState = {
    doorstaff: {}
};

export const siaReducer = (state = initialState, action) => {
    console.log("siaReducer: ", state.doorstaff)
    switch (action.type) {
        case "LOOKUP":
            return {
                ...state, doorstaff: action.data
            }
        default:
            return state;
    }
};
