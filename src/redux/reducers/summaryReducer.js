import * as DoorstaffTypes from "../types/doorstaffTypes"

const initialState = {
    doorstaff: {
        daily:[],
        weekly:[],
    },

    date: new Date().toISOString()
    
};

export const summaryReducer = (state = initialState, action) => {

    switch (action.type) {
        case DoorstaffTypes.GET_DOORSTAFF_SUMMARY_DAILY:
            return {
                ...state,
                doorstaff: {...state.doorstaff,daily: action.data}
            };
        case DoorstaffTypes.GET_DOORSTAFF_SUMMARY_WEEKLY:
            return {
                ...state,
                doorstaff: {...state.doorstaff, weekly: action.data}
            };
        default:
            return state;
    }
};
