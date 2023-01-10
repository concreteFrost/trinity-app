import { GET_AUTHORISE_DOORSTAFF,GET_AUTHORISE_COSTS, 
    CHECK_AUTHORISE_DOORSTAFF, CHECK_ALL_AUTHORISE_DOORSTAFF,
    UNCHECK_ALL_AUTHORISE_DOORSTAFF,CHECK_AUTHORISE_COSTS,UNCHECK_AUTHORISE_COSTS,
    CHECK_ALL_AUTHORISE_COSTS,UNCHECK_ALL_AUTHORISE_COSTS
} from "../types"


const initialState = {
    doorstaff: [],
    costs: [],
    checkedDoorstaff: []
}

export const authoriseReducer = (state = initialState, action) => {

    switch (action.type) {
        case GET_AUTHORISE_DOORSTAFF:
            return {
                ...state, doorstaff: action.data.map(el => ({ ...el, selected: false }))
            }
        case GET_AUTHORISE_COSTS:
            return {
                ...state, costs: action.data.map(el => ({ ...el, selected: false }))
            }
        case CHECK_AUTHORISE_DOORSTAFF:
            return {
                ...state, doorstaff: [...state.doorstaff.map(e => e.activityId === action.data.id ? { ...e, selected: action.data.selected } : e)]
            }
        case CHECK_ALL_AUTHORISE_DOORSTAFF:
            return {
                ...state, doorstaff: [...state.doorstaff.map(e => e.selected === true ? e : { ...e, selected: true })]
            }
        case UNCHECK_ALL_AUTHORISE_DOORSTAFF:
            return {
                ...state, doorstaff: [...state.doorstaff.map(e => e.selected === false ? e : { ...e, selected: false })]
            }

        case CHECK_AUTHORISE_COSTS:
            return {
                ...state, costs: [...state.costs.map(e => e.activityId === action.data.id ? { ...e, selected: action.data.selected } : e)]
            }
        case CHECK_ALL_AUTHORISE_COSTS:
            return {
                ...state, costs: [...state.costs.map(e => e.selected === true ? e : { ...e, selected: true })]
            }
        case UNCHECK_ALL_AUTHORISE_COSTS:
            return {
                ...state, costs: [...state.costs.map(e => e.selected === false ? e : { ...e, selected: false })]
            }
        default: return state;
    }
}