import {
    GET_COSTS_DOORSTAFF_DAILY, GET_COSTS_DOORSTAFF_WEEKLY,
    GET_COSTS_DOORSTAFF_MONTHLY, GET_COSTS_ACTIVITY_DAILY,
    GET_COSTS_ACTIVITY_WEEKLY, GET_COSTS_ACTIVITY_MONTHLY,
    SET_COSTS_DATE
} from "../types";

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

        case  SET_COSTS_DATE:
            return {
                ...state, date: action.data
            }
        case GET_COSTS_DOORSTAFF_DAILY:
            return {
                ...state,
                doorstaff: { ...state.doorstaff, daily: action.data }
            };
        case GET_COSTS_DOORSTAFF_WEEKLY:
            return {
                ...state,
                doorstaff: { ...state.doorstaff, weekly: action.data }
            };
        case GET_COSTS_DOORSTAFF_MONTHLY:
            return {
                ...state,
                doorstaff: { ...state.doorstaff, monthly: action.data }
            };
        case GET_COSTS_ACTIVITY_DAILY:
            return {
                ...state,
                costs: { ...state.costs, daily: action.data }
            };
        case GET_COSTS_ACTIVITY_WEEKLY:
            return {
                ...state,
                costs: { ...state.costs, weekly: action.data }
            };
        case GET_COSTS_ACTIVITY_MONTHLY:
            return {
                ...state,
                costs: { ...state.costs, monthly: action.data }
            };

        default:
            return state;
    }
};
