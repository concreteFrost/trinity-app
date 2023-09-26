import {

  LOGOFF,
  LOGIN,
  SHOW_MODAL_MESSAGE,
  SHOW_ACTION_MODAL,
  SET_RECEIPT_DATA,
  GET_ACTIVITIES_SEARCH_STAFF_OPT,
  GET_ACTIVITIES_SEARCH_SUPPLIERS_OPT,
  GET_ACTIVITIES_SEARCH_LOCATIONS_OPT,
  GET_ACTIVITIES_SEARCH_LOCATIONS_GROUP_OPT,
  GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_OPT,
  GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_GROUP_OPT,
  GET_SEARCHED_COSTS,
  GET_SEARCHED_ACTIVITES,
  HIDE_ACTION_MODAL,
  GET_COSTS_DOORSTAFF_DAILY,
  GET_COSTS_DOORSTAFF_WEEKLY,
  GET_COSTS_DOORSTAFF_MONTHLY,
  GET_COSTS_ACTIVITY_WEEKLY,
  GET_COSTS_ACTIVITY_MONTHLY,
  GET_COSTS_ACTIVITY_DAILY,

  SHOW_LOADER,
  HIDE_LOADER,
  GET_AREA_MANAGER_ANALYTICS_DOORSTAFF,
  GET_AREA_MANAGER_ANALYTICS_COSTS,
  SET_AREA_MANAGER_ANALYTICS_DATE_TO,
  SET_AREA_MANAGER_ANALYTICS_DATE_FROM,
  GET_AREA_MANAGER_ANALYTICS_LOCATIONS,
  TOGGLE_ARREA_MANAGER_ANALYTICS_LOCATIONS,
  RESET_MODAL_ACTIVITY,
  SHOW_MODAL_PROMPT,
  SET_DISPUTED_PAYMENT_ID,
  GET_DOORSTAFF_ANALYTICS,
  GET_COSTS_ANALYTICS,
  CLEAR_ERROR_ON_LOGIN,
  SHOW_ERROR_ON_LOGIN
} from "./types";

//LOGIN ACTIONS
export function SetLoginDetails(data) {
  return { type: LOGIN, data };
}

export function UserLogOff() {
  return { type: LOGOFF };
}

  
export function SetErrorOnLogin() {
  return { type: SHOW_ERROR_ON_LOGIN };
}

export function ClearErrorOnLogin() {
  return { type: CLEAR_ERROR_ON_LOGIN };
}

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

export function GetSearchPaymentStatusGroup(record) {
  return {
    type: GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_GROUP_OPT,
    data: record,
  }
}

export function GetSearchedActivities(reportRecord) {
  return {
    type: GET_SEARCHED_ACTIVITES,
    data: reportRecord,
  }
}

export function GetSearchedCosts(reportRecord) {
  return {
    type: GET_SEARCHED_COSTS,
    data: reportRecord,
  }
}




//*REPORT ACTIONS

export function SetReceiptData(receiptTitle, system, res) {
  return { type: SET_RECEIPT_DATA, title: receiptTitle, systemToCheck: system, data: res }
}



export function GetCostsSummaryDaily(summaryRecords) {
  return {
    type: GET_COSTS_ACTIVITY_DAILY,
    data: summaryRecords.slice(3, summaryRecords.length),
  }
}

export function GetCostsSummaryWeekly(summaryRecords) {
  return {
    type: GET_COSTS_ACTIVITY_WEEKLY,
    data: summaryRecords.slice(3, summaryRecords.length),
  }
}

export function GetCostsSummaryMonthly(summaryRecords) {
  return {
    type: GET_COSTS_ACTIVITY_MONTHLY,
    data: summaryRecords.slice(3, summaryRecords.length),
  }
}

//ANALYTICS

export function GetAreaManagerAnalyticsLocations(locations) {
  return ({
    type: GET_AREA_MANAGER_ANALYTICS_LOCATIONS,
    data: locations
  })
}
export function SetAreaManagerAnalyticsDateFrom(dateFrom) {
  return { type: SET_AREA_MANAGER_ANALYTICS_DATE_FROM, data: dateFrom }
}

export function SetAreaManagerAnalyticsDateTo(dateTo) {
  return { type: SET_AREA_MANAGER_ANALYTICS_DATE_TO, data: dateTo }
}

export function GetAreaManagerAnalyticsCosts(concatenatedResults) {
  return { type: GET_AREA_MANAGER_ANALYTICS_COSTS, data: concatenatedResults }
}

export function GetAreaManagerAnalyticsDoorstaff(concatenatedResults) {
  return { type: GET_AREA_MANAGER_ANALYTICS_DOORSTAFF, data: concatenatedResults }
}

export function ToggleAreaManagerAnalyticsLocations(id) {
  return { type: TOGGLE_ARREA_MANAGER_ANALYTICS_LOCATIONS, data: id }
}

export function GetDoorstaffAnalytics(reportRecord) {
  return { type: GET_DOORSTAFF_ANALYTICS, data: reportRecord }
}

export function GetCostsAnalytics(reportRecord) {
  return { type: GET_COSTS_ANALYTICS, data: reportRecord }
}





export function SetDisputedPaymentID(id) {
  return { type: SET_DISPUTED_PAYMENT_ID, data: id }
}



//*LOADER

export function ShowLoader() {

  return { type: SHOW_LOADER }
}

export function HideLoader() {
  return { type: HIDE_LOADER }
}


//*MODAL ACTIONS
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

export function ShowModalPrompt() {
  return { type: SHOW_MODAL_PROMPT }
}

export function HideActionModal() {
  return { type: HIDE_ACTION_MODAL }
}

export function ResetModalActivity() {
  return { type: RESET_MODAL_ACTIVITY }
}
