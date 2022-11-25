

const initialState = {
    doorstaff: {
        daily: [],
        weekly: [],
        monthly: []
    },

    costs: {
        daily: [],
        weekly: [],
        monthly: []
    },

    date: new Date().toISOString()

};

export const costsReducer = (state = initialState, action) => {

    switch (action.type) {
       
        case "SET_COSTS_DATE":
            return {
                ...state, date: action.data
            }
        case "GET_DOORSTAFF_DAILY":
            return {
                ...state,
                doorstaff: { ...state.doorstaff,daily: action.data }
            };
        case "GET_DOORSTAFF_WEEKLY":
            return {
                ...state,
                doorstaff: { ...state.doorstaff, weekly: action.data }
            };
        case "GET_DOORSTAFF_MONTHLY":
            return {
                ...state,
                doorstaff: { ...state.doorstaff, monthly: action.data }
            };
        case "GET_COSTS_DAILY":
            return {
                ...state,
                costs: { ...state.costs, daily: action.data }
            };
        case "GET_COSTS_WEEKLY":
            return {
                ...state,
                costs: { ...state.costs, weekly: action.data }
            };
        case "GET_COSTS_MONTHLY":
            return {
                ...state,
                costs: { ...state.costs, monthly: action.data }
            };

        default:
            return state;
    }
};
