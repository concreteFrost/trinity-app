const initialState = {
    doorstaff: {
        daily:{},
        weekly:{},
        monthly:{}
    }
    
};

export const costsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_DOORSTAFF_DAILY":
            return {
                ...state,
                doorstaff: {...state.doorstaff,daily: action.data}
            };
        case "GET_DOORSTAFF_WEEKLY":
            return {
                ...state,
                doorstaff: {...state.doorstaff, weekly: action.data}
            };
        case "GET_DOORSTAFF_MONTHLY":
            return {
                ...state,
                doorstaff: {...state.doorstaff,monthly: action.data}
            };

        default:
            return state;
    }
};
