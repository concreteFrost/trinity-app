
import * as AuthoriseTypes from "../types/authoriseTypes"


const initialState = {
    doorstaff: [],
    costs: [],
    checkedDoorstaff: []
}

export const authoriseReducer = (state = initialState, action) => {

    switch (action.type) {
        case AuthoriseTypes.GET_AUTHORISE_DOORSTAFF:
            return {
                ...state, doorstaff: action.data.map(el => ({ ...el, selected: false, moreActionsVisible: false }))
            }
        case AuthoriseTypes.GET_AUTHORISE_COSTS:
            return {
                ...state, costs: action.data.map(el => ({ ...el, selected: false, moreActionsVisible: false }))
            }
        case AuthoriseTypes.CHECK_AUTHORISE_DOORSTAFF:
            return {
                ...state, doorstaff: [...state.doorstaff.map(e => e.activityId === action.data.id ? { ...e, selected: action.data.selected } : e)]
            }
        case AuthoriseTypes.CHECK_ALL_AUTHORISE_DOORSTAFF:
            return {
                ...state, doorstaff: [...state.doorstaff.map(e => e.selected === true ? e : { ...e, selected: true })]
            }
        case AuthoriseTypes.UNCHECK_ALL_AUTHORISE_DOORSTAFF:
            return {
                ...state, doorstaff: [...state.doorstaff.map(e => e.selected === false ? e : { ...e, selected: false })]
            }

        case AuthoriseTypes.CHECK_AUTHORISE_COSTS:
            return {
                ...state, costs: [...state.costs.map(e => e.activityId === action.data.id ? { ...e, selected: action.data.selected } : e)]
            }
        case AuthoriseTypes.CHECK_ALL_AUTHORISE_COSTS:
            return {
                ...state, costs: [...state.costs.map(e => e.selected === true ? e : { ...e, selected: true })]
            }
        case AuthoriseTypes.UNCHECK_ALL_AUTHORISE_COSTS:
            return {
                ...state, costs: [...state.costs.map(e => e.selected === false ? e : { ...e, selected: false })]
            }
        case AuthoriseTypes.TOGGLE_MORE_ACTIONS_FOR_DOORSTAFF:
            return {
                ...state, doorstaff: [...state.doorstaff.map(e => e.activityId === action.data ? { ...e, moreActionsVisible: !e.moreActionsVisible } : e)]
            }
        case AuthoriseTypes.TOGGLE_MORE_ACTIONS_FOR_COSTS:
           
            return {
                ...state, costs: [...state.costs.map(e => e.activityId === action.data ? { ...e, moreActionsVisible: !e.moreActionsVisible } : e)]
            }
        case AuthoriseTypes.GET_DOORSTAFF_DISPUTED_NOTE_LIST:
            return {
                ...state, doorstaff: [...state.doorstaff.map((e) => e.activityId === action.activityID ? { ...e, disputedNotes: action.data } : e)]
            }
        case AuthoriseTypes.GET_COSTS_DISPUTED_NOTE_LIST:
            return {
                ...state, costs: [...state.costs.map((e) => e.activityId === action.activityID ? { ...e, disputedNotes: action.data } : e)]
            }

        default: return state;
    }
}