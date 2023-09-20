import {
  GET_DOORSTAFF_LIST,
  GET_SIA_DATA,
  CLEAR_SIA_DATA,
  LOGOFF,
  LOGIN,
  SHOW_ERROR_ON_LOGIN,
  CLEAR_ERROR_ON_LOGIN,
  SHOW_MODAL_MESSAGE,
  GET_DOORSTAFF_POSITION_OPT,
  SET_DOORSTAFF_POSITION,
  SET_DOORSTAFF_SUPPLIER,
  GET_DOORSTAFF_SUPPLIER_OPT,
  GET_DOORSTAFF_RATE_OPT,
  SET_DOORSTAFF_RATE,
  SET_DOORSTAFF_START_TIME,
  SET_DOORSTAFF_START_DATE,
  SHOW_ACTION_MODAL,
  SET_DOORSTAFF_SIGNOUT_TIME,
  SET_DOORSTAFF_SIGNOUT_DATE,
  TOGGLE_DOORSTAFF_TO_SIGN_OUT,
  SIGN_OFF_SELECTED_DOORSTAFF,
  SELECT_ALL_DOORSTAFF_TO_SIGN_OUT,
  DESELECT_ALL_DOORSTAFF_TO_SIGN_OUT,
  GET_RECENT_DOORSTAFF,
  SET_RECEIPT_DATA,
  GET_CURRENT_ACTIVITY,
  GET_RECENT_ACTIVITY,
  GET_ACTIVITIES_SEARCH_STAFF_OPT,
  GET_ACTIVITIES_SEARCH_SUPPLIERS_OPT,
  GET_ACTIVITIES_SEARCH_LOCATIONS_OPT,
  GET_ACTIVITIES_SEARCH_LOCATIONS_GROUP_OPT,
  GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_OPT
} from "./types";

//LOGIN ACTIONS
export function SetLoginDetails(data) {
  return { type: LOGIN, data };
}

export function UserLogOff() {
  return { type: LOGOFF };
}

//DOORSTAFF ACTIONS

export function GetDoorstaffRecent(reportRecord) {
  return { type: GET_RECENT_DOORSTAFF, data: reportRecord }
}

export function SetSiaData(data) {
  return { type: GET_SIA_DATA, data };
}

export function ClearSiaData() {
  return { type: CLEAR_SIA_DATA };
}

export function GetDoorstaffSupplierOptions(suppliers) {
  return { type: GET_DOORSTAFF_SUPPLIER_OPT, data: suppliers };
}

export function SetDoorstaffCurrentSupplier(supplier) {
  return { type: SET_DOORSTAFF_SUPPLIER, data: supplier };
}

export function GetDoorstaffPositionsOptions(positions) {
  return { type: GET_DOORSTAFF_POSITION_OPT, data: positions };
}

export function SetDoorstaffCurrentPosition(position) {
  return { type: SET_DOORSTAFF_POSITION, data: position };
}

export function GetDooorstaffRateOptions(rates) {
  return { type: GET_DOORSTAFF_RATE_OPT, data: rates };
}

export function SetDoorstaffCurrentRate(rateId) {
  return { type: SET_DOORSTAFF_RATE, data: rateId };
}

export function SetDoorStaffList(data) {
  return { type: GET_DOORSTAFF_LIST, data };
}

export function SetErrorOnLogin() {
  return { type: SHOW_ERROR_ON_LOGIN };
}

export function ClearErrorOnLogin() {
  return { type: CLEAR_ERROR_ON_LOGIN };
}

export function SetDoorstaffStartTime(time) {
  return {
    type: SET_DOORSTAFF_START_TIME,
    data: time,
  };
}

export function ToggleDoorstaffToSignOut(staffId) {
  return {
    type: TOGGLE_DOORSTAFF_TO_SIGN_OUT,
    data: staffId,
  };
}

export function SetDoorstaffSignOutDate(staffId, signOutDate) {
  return {
    type: SET_DOORSTAFF_SIGNOUT_DATE,
    data: {
      id: staffId,
      signOutDate: signOutDate,
    },
  };
}

export function SetDoorstaffSignOutTime(staffId, signOutTime) {
  return {
    type: SET_DOORSTAFF_SIGNOUT_TIME,
    data: {
      id: staffId,
      signOutTime: signOutTime,
    },
  };
}

export function SetDoorstaffStartDate(date) {
  return {
    type: SET_DOORSTAFF_START_DATE,
    data: date,
  };
}



export function SelectAllDoorstaffToSingOut() {
  return { type: SELECT_ALL_DOORSTAFF_TO_SIGN_OUT };
}

export function DeselectAllDoorstaffToSignOut() {
  return { type: DESELECT_ALL_DOORSTAFF_TO_SIGN_OUT };
}

export function SignOffSelectedDoorstaff(time, date) {
  return {
    type: SIGN_OFF_SELECTED_DOORSTAFF,
    data: { signOutTime: time, signOutDate: date },
  };
}

//*ACTIVITY ACTIONS

//GET
export function GetActivityCurrent(records) {
  return { type: GET_CURRENT_ACTIVITY, data: records }
}

export function GetActivityRecents(records) {
  return { type: GET_RECENT_ACTIVITY, data: records }
}


//*SEARCH ACTIONS

//GET
export function GetSearchStaff(record) {
  return {
    type: GET_ACTIVITIES_SEARCH_STAFF_OPT,
    data: record,
  }
}

export function GetSearchSuppliers(record) {
  return {
    type: GET_ACTIVITIES_SEARCH_SUPPLIERS_OPT,
    data: record,
  }
}

export function GetSearchLocations(record) {
  return {
    type: GET_ACTIVITIES_SEARCH_LOCATIONS_OPT,
    data: record,
  }
}

export function GetSearchLocationGroup(record) {
  return {
    type: GET_ACTIVITIES_SEARCH_LOCATIONS_GROUP_OPT,
    data: record,
  }
}

export function GetSearchPaymentStatus(record) {
  return {
    type: GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_OPT,
    data: record,
  }
}
//MODAL ACTIONS
export function ShowModalMessage(message) {
  return { type: SHOW_MODAL_MESSAGE, data: message };
}

export function ShowCancelModal(activityIdToCancel) {
  return {
    type: SHOW_ACTION_MODAL,
    activityToModify: activityIdToCancel,
    activityType: "CANCEL",
  };
}

//REPORT ACTIONS

export function SetReceiptData(receiptTitle, system, res) {
  return { type: SET_RECEIPT_DATA, title: receiptTitle, systemToCheck: system, data: res }
}
