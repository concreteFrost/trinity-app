import * as DoorstaffTypes from "../types/doorstaffTypes"

const initialState = {
  current: [],
  recent: [],
  disputed: [],
  errorMessage: "",
  showSignOffModal: false,
};

export const doorstaffReducer = (state = initialState, action) => {
  switch (action.type) {
    case DoorstaffTypes.GET_DOORSTAFF_LIST:
      const fetchedDoorstaff = action.data.map((dstaff) => ({
        ...dstaff,
        isChecked: false,
        signOutDate: new Date().toISOString().split("T")[0],
        signOutTime: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      }));
      return {
        ...state,
        current: fetchedDoorstaff,
      };

    case DoorstaffTypes.TOGGLE_DOORSTAFF_TO_SIGN_OUT: {
      return {
        ...state,
        current: [
          ...state.current.map((e) =>
            e.staffId === action.data ? { ...e, isChecked: !e.isChecked } : e
          ),
        ],
      };
    }
    case DoorstaffTypes.SELECT_ALL_DOORSTAFF_TO_SIGN_OUT: {
      return {
        ...state,
        current: state.current.map((e) => ({ ...e, isChecked: true })),
      };
    }
    case DoorstaffTypes.DESELECT_ALL_DOORSTAFF_TO_SIGN_OUT: {
      return {
        ...state,
        current: state.current.map((e) => ({ ...e, isChecked: false })),
      };
    }
    case DoorstaffTypes.SET_DOORSTAFF_SIGNOUT_TIME: {
      return {
        ...state,
        current: [
          ...state.current.map((e) =>
            e.staffId === action.data.id
              ? { ...e, signOutTime: action.data.signOutTime }
              : e
          ),
        ],
      };
    }

    case DoorstaffTypes.SET_DOORSTAFF_SIGNOUT_DATE: {
      return {
        ...state,
        current: [
          ...state.current.map((e) =>
            e.staffId === action.data.id
              ? { ...e, signOutDate: action.data.signOutDate }
              : e
          ),
        ],
      };
    }
    case DoorstaffTypes.SIGN_OFF_SELECTED_DOORSTAFF: {
      return {
        ...state,
        current: [
          ...state.current.map((x) =>
            x.isChecked
              ? {
                  ...x,
                  signOutTime: action.data.signOutTime,
                  signOutDate: action.data.signOutDate,
                }
              : x
          ),
        ],
      };
    }

    case DoorstaffTypes.SHOW_SIGN_OFF_MODAL: {
      return {
        ...state,
        showSignOffModal: true,
      };
    }

    case DoorstaffTypes.HIDE_SIGN_OFF_MODAL: {
      return {
        ...state,
        showSignOffModal: false,
      };
    }

    case DoorstaffTypes.GET_RECENT_DOORSTAFF:
      return {
        ...state,
        recent: action.data,
      };
    case DoorstaffTypes.GET_DISPUTED_DOORSTAFF:
      return {
        ...state,
        disputed: action.data,
      };

    case DoorstaffTypes.SET_DOORSTAFF_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.data,
      };
    case DoorstaffTypes.CLEAR_DOORSTAFF_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: "",
      };
    default:
      return state;
  }
};
