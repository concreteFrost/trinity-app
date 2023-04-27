const initialState = {
    locations: [],
    currentLocation: { id: 0, name: null },
    dateFrom: new Date().toISOString().split("T")[0],
    dateTo: new Date().toISOString().split("T")[0]
}

export const areaManagerAnalyticsReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_AREA_MANAGER_ANALYTICS_LOCATIONS": {
            return { ...state, locations: action.data }

        }
        case "SET_AREA_MANAGER_ANALYTICS_CURRENT_LOCATION": {
            return { ...state, currentLocation: { id: action.data.id, name: action.data.name } }

        }
        case "SET_AREA_MANAGER_ANALYTICS_DATE_FROM": {
            return { ...state, dateFrom: action.data }
        }
        case "SET_AREA_MANAGER_ANALYTICS_DATE_TO": {
            return { ...state, dateTo: action.data }
        }

        default: return initialState;
    }
}