const initialState = {
    doorstaff: [],
    costs: [],
    currentType: "S",
    dateFrom: new Date().toISOString().split("T")[0],
    dateTo: new Date().toISOString().split("T")[0]
}

export const pubManagerAnalyticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_DOORSTAFF_ANALYTICS":
            return {
                ...state,
                doorstaff: action.data,
            }
        case "GET_COSTS_ANALYTICS":
            return {
                ...state,
                costs: action.data,
            }
        case "SET_DATE_FROM_ANALYTICS":
            return {
                ...state, dateFrom: action.data
            }
        case "SET_DATE_TO_ANALYTICS":
            return {
                ...state, dateTo: action.data
            }
        case "SET_CURRENT_TYPE": {
            return {
                ...state, currentType: action.data
            }
        }

        default: return initialState;
    }
}