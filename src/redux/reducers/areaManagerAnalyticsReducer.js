import {
    GET_AREA_MANAGER_ANALYTICS_COSTS,
    GET_AREA_MANAGER_ANALYTICS_DOORSTAFF,
    GET_AREA_MANAGER_ANALYTICS_LOCATIONS,
    TOGGLE_ARREA_MANAGER_ANALYTICS_LOCATIONS,
    SET_AREA_MANAGER_ANALYTICS_DATE_FROM,
    SET_AREA_MANAGER_ANALYTICS_DATE_TO
} from "../types";

const initialState = {
    locations: [],
    costs: [],
    doorstaff: [],
    dateFrom: new Date().toISOString().split("T")[0],
    dateTo: new Date().toISOString().split("T")[0]
}

export const areaManagerAnalyticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_AREA_MANAGER_ANALYTICS_LOCATIONS: {
            const updatedLocations = action.data.map((location) => ({
                ...location,
                isChecked: true
            }));
            return { ...state, locations: updatedLocations };
        }
        case TOGGLE_ARREA_MANAGER_ANALYTICS_LOCATIONS: {
            return { ...state, locations: [...state.locations.map(e => e.id === action.data ? { ...e, isChecked: !e.isChecked } : e)] }
        }
        case GET_AREA_MANAGER_ANALYTICS_COSTS: {
            return { ...state, costs: action.data }
        }
        case GET_AREA_MANAGER_ANALYTICS_DOORSTAFF: {
            return { ...state, doorstaff: action.data }
        }
        case SET_AREA_MANAGER_ANALYTICS_DATE_FROM: {
            return { ...state, dateFrom: action.data }
        }
        case SET_AREA_MANAGER_ANALYTICS_DATE_TO: {
            return { ...state, dateTo: action.data }
        }

        default: return initialState;
    }
}
