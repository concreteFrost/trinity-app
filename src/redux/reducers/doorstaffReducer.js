import {
  GET_DOORSTAFF_LIST, GET_RECENT_DOORSTAFF,
  GET_DISPUTED_DOORSTAFF, SET_DOORSTAFF_ERROR_MESSAGE,
  CLEAR_DOORSTAFF_ERROR_MESSAGE, TOGGLE_DOORSTAFF_TO_SIGN_OUT,
  SELECT_ALL_DOORSTAFF_TO_SIGN_OUT, DESELECT_ALL_DOORSTAFF_TO_SIGN_OUT, SET_DOORSTAFF_SIGNOUT_DATE,
  SET_DOORSTAFF_SIGNOUT_TIME, SIGN_OFF_SELECTED_DOORSTAFF, SHOW_SIGN_OFF_MODAL, HIDE_SIGN_OFF_MODAL
} from "../types";

const initialState = {
  current: [],
  recent: [],
  disputed: [],
  errorMessage: "",
  showSignOffModal: false
};

export const doorstaffReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_DOORSTAFF_LIST:
      const fetchedDoorstaff = action.data.map((dstaff) => ({
        ...dstaff,
        isChecked: false,
        signOutDate: new Date().toISOString().split("T")[0],
        signOutTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }));
      return {
        ...state,
        current: fetchedDoorstaff,
      };

    case TOGGLE_DOORSTAFF_TO_SIGN_OUT: {
      return {
        ...state, current: [...state.current.map(e => e.staffId === action.data ? { ...e, isChecked: !e.isChecked } : e)]
      }
    }
    case SELECT_ALL_DOORSTAFF_TO_SIGN_OUT: {
      return {
        ...state, current: state.current.map(e => ({ ...e, isChecked: true }))
      }
    }
    case DESELECT_ALL_DOORSTAFF_TO_SIGN_OUT: {
      return {
        ...state, current: state.current.map(e => ({ ...e, isChecked: false }))
      }
    }
    case SET_DOORSTAFF_SIGNOUT_TIME: {
      return {
        ...state, current: [...state.current.map(e => e.staffId === action.data.id ? { ...e, signOutTime: action.data.signOutTime } : e)]
      }
    }

    case SET_DOORSTAFF_SIGNOUT_DATE: {
      return {
        ...state, current: [...state.current.map(e => e.staffId === action.data.id ? { ...e, signOutDate: action.data.signOutDate } : e)]
      }
    }
    case SIGN_OFF_SELECTED_DOORSTAFF: {
      return {
        ...state, current: [...state.current.map(x => x.isChecked ? {
          ...x,
          signOutTime: action.data.signOutTime,
          signOutDate: action.data.signOutDate
        } : x)]
      }
    }

    case SHOW_SIGN_OFF_MODAL: {
      return {
        ...state, showSignOffModal: true
      }
    }

    case HIDE_SIGN_OFF_MODAL: {
      return {
        ...state, showSignOffModal: false
      }
    }


    case GET_RECENT_DOORSTAFF:
      return {
        ...state,
        recent: action.data,
      }
    case GET_DISPUTED_DOORSTAFF:
      return {
        ...state,
        disputed: action.data,
      }

    case SET_DOORSTAFF_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.data,
      };
    case CLEAR_DOORSTAFF_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
};
