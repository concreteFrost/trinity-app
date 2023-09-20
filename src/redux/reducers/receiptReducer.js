import { SET_RECEIPT_DATA } from "../types";


const initialState = {
  title: '',
  systemToCheck: '',
  data: {}
};

export const receiptReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_RECEIPT_DATA:
      return {
        ...state, title: action.title, systemToCheck: action.systemToCheck, data: action.data
      }
    default: {
      return initialState
    }
  }

}
