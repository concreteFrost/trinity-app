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
  GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_OPT,
  GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_GROUP_OPT,
  GET_SEARCHED_COSTS,
  GET_SEARCHED_ACTIVITES,
  HIDE_ACTION_MODAL,
  GET_COSTS_DOORSTAFF_WEEKLY,
  GET_COSTS_DOORSTAFF_MONTHLY,
  GET_COSTS_ACTIVITY_WEEKLY,
  GET_COSTS_ACTIVITY_MONTHLY,
  GET_COSTS_ACTIVITY_DAILY,
  GET_COSTS_DOORSTAFF_DAILY,
  SHOW_LOADER,
  HIDE_LOADER,
  GET_DOORSTAFF_SUMMARY_DAILY,
  GET_DOORSTAFF_SUMMARY_WEEKLY,
  GET_ACTIVITY_TYPE_OPT,
  SET_ACTIVITY_TYPE,
  GET_ACTIVITY_SUPPLIER_OPT,
  GET_ACTIVITY_RATE,
  SET_ACTIVITY_SUPPLIER,
  SET_ACTIVITY_COST_VALUE,
  SUPPLIER_PROVIDED,
  SET_ACTIVITY_HOURS_WORKED,
  CLEAR_ACTIVITY,
  GET_AREA_MANAGER_ANALYTICS_DOORSTAFF,
  GET_AREA_MANAGER_ANALYTICS_COSTS,
  SET_AREA_MANAGER_ANALYTICS_DATE_TO,
  SET_AREA_MANAGER_ANALYTICS_DATE_FROM,
  GET_AREA_MANAGER_ANALYTICS_LOCATIONS,
  TOGGLE_ARREA_MANAGER_ANALYTICS_LOCATIONS,
  GET_DISPUTED_DOORSTAFF,
  GET_DISPUTED_ACTIVITY,
  RESET_MODAL_ACTIVITY,
  SHOW_MODAL_PROMPT,
  SET_DISPUTED_PAYMENT_ID,
  GET_DOORSTAFF_ANALYTICS,
  GET_COSTS_ANALYTICS
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


export function GetActivityTypeOpt(record) {
  return { type: GET_ACTIVITY_TYPE_OPT, data: record }
}

export function SetActivityType(recordId) {
  return { type: SET_ACTIVITY_TYPE, data: recordId }
}

export function GetActivitySupplierOpt(suppliers) {
  return { type: GET_ACTIVITY_SUPPLIER_OPT, data: suppliers }
}

export function SetActivitySupplier(supplierID) {
  return { type: SET_ACTIVITY_SUPPLIER, data: supplierID }
}

export function SetActivityCostValue(costValue) {
  return { type: SET_ACTIVITY_COST_VALUE, data: costValue }
}

export function isActivitySupplierProvided(isProvided) {
  return { type: SUPPLIER_PROVIDED, data: isProvided }
}

export function GetActivityRate(rate) {
  return { type: GET_ACTIVITY_RATE, data: rate }
}


export function GetActivityCurrent(records) {
  return { type: GET_CURRENT_ACTIVITY, data: records }
}

export function GetActivityRecents(records) {
  return { type: GET_RECENT_ACTIVITY, data: records }
}

export function SetActivityHoursWorked(hours) {
  return { type: SET_ACTIVITY_HOURS_WORKED, data: hours }
}

export function ClearActivity() {
  return { type: CLEAR_ACTIVITY }
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

export function GetDoorstaffSummaryDaily(summaryRecords) {
  return {
    type: GET_COSTS_DOORSTAFF_DAILY,
    data: summaryRecords.slice(0, 3),
  }
}

export function GetDoorstaffSummaryWeekly(summaryRecords) {
  return {
    type: GET_COSTS_DOORSTAFF_WEEKLY,
    data: summaryRecords.slice(0, 3),
  }
}

export function GetDoorstaffSummaryMonthly(summaryRecords) {
  return {
    type: GET_COSTS_DOORSTAFF_MONTHLY,
    data: summaryRecords.slice(0, 3),
  }
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



//SUMMARY ON HOME PAGE
export function GetDoorstaffDaily(summaryRecords) {
  return { type: GET_DOORSTAFF_SUMMARY_DAILY, data: summaryRecords }
}

export function GetDoorstaffWeekly(summaryRecords) {
  return { type: GET_DOORSTAFF_SUMMARY_WEEKLY, data: summaryRecords }
}

//*DISPUTED

export function GetDisputedDoorstaff(reportRecord) {
  return { type: GET_DISPUTED_DOORSTAFF, data: reportRecord }

}

export function GetDisputedActivity(reportRecord) {
  return { type: GET_DISPUTED_ACTIVITY, data: reportRecord }

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
