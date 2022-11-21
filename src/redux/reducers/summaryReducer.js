import moment from 'moment';

const initialState = {
    doorstaff: {
        daily:{},
        weekly:{},
    },

    date: new Date().toISOString()
    
};

export const summaryReducer = (state = initialState, action) => {
    console.log("summaryReducer:", state)
    switch (action.type) {
        case "GET_DOORSTAFF_SUMMARY_DAILY":
            return {
                ...state,
                doorstaff: {...state.doorstaff,daily: action.data}
            };
        case "GET_DOORSTAFF_SUMMARY_WEEKLY":
            return {
                ...state,
                doorstaff: {...state.doorstaff, weekly: action.data}
            };
        default:
            return state;
    }
};
