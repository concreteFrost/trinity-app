import * as DoorstaffTypes from "../types/doorstaffTypes"

//DOORSTAFF ACTIONS

export function GetDoorstaffRecent(reportRecord) {
    return { type: DoorstaffTypes.GET_RECENT_DOORSTAFF, data: reportRecord }
  }
  
  export function SetSiaData(data) {
    return { type: DoorstaffTypes.GET_SIA_DATA, data };
  }
  
  export function ClearSiaData() {
    return { type: DoorstaffTypes.CLEAR_SIA_DATA };
  }
  
  export function GetDoorstaffSupplierOptions(suppliers) {
    return { type: DoorstaffTypes.GET_DOORSTAFF_SUPPLIER_OPT, data: suppliers };
  }
  
  export function SetDoorstaffCurrentSupplier(supplier) {
    return { type: DoorstaffTypes.SET_DOORSTAFF_SUPPLIER, data: supplier };
  }
  
  export function GetDoorstaffPositionsOptions(positions) {
    return { type: DoorstaffTypes.GET_DOORSTAFF_POSITION_OPT, data: positions };
  }
  
  export function SetDoorstaffCurrentPosition(position) {
    return { type: DoorstaffTypes.SET_DOORSTAFF_POSITION, data: position };
  }
  
  export function GetDooorstaffRateOptions(rates) {
    return { type: DoorstaffTypes.GET_DOORSTAFF_RATE_OPT, data: rates };
  }
  
  export function SetDoorstaffCurrentRate(rateId) {
    return { type: DoorstaffTypes.SET_DOORSTAFF_RATE, data: rateId };
  }
  
  export function SetDoorStaffList(data) {
    return { type: DoorstaffTypes.GET_DOORSTAFF_LIST, data };
  }

  
  export function SetDoorstaffStartTime(time) {
    return {
      type: DoorstaffTypes.SET_DOORSTAFF_START_TIME,
      data: time,
    };
  }
  
  export function ToggleDoorstaffToSignOut(staffId) {
    return {
      type: DoorstaffTypes.TOGGLE_DOORSTAFF_TO_SIGN_OUT,
      data: staffId,
    };
  }
  
  export function SetDoorstaffSignOutDate(staffId, signOutDate) {
    return {
      type: DoorstaffTypes.SET_DOORSTAFF_SIGNOUT_DATE,
      data: {
        id: staffId,
        signOutDate: signOutDate,
      },
    };
  }
  
  export function SetDoorstaffSignOutTime(staffId, signOutTime) {
    return {
      type: DoorstaffTypes.SET_DOORSTAFF_SIGNOUT_TIME,
      data: {
        id: staffId,
        signOutTime: signOutTime,
      },
    };
  }
  
  export function SetDoorstaffStartDate(date) {
    return {
      type: DoorstaffTypes.SET_DOORSTAFF_START_DATE,
      data: date,
    };
  }
  
  
  
  export function SelectAllDoorstaffToSingOut() {
    return { type: DoorstaffTypes.SELECT_ALL_DOORSTAFF_TO_SIGN_OUT };
  }
  
  export function DeselectAllDoorstaffToSignOut() {
    return { type: DoorstaffTypes.DESELECT_ALL_DOORSTAFF_TO_SIGN_OUT };
  }
  
  export function SignOffSelectedDoorstaff(time, date) {
    return {
      type: DoorstaffTypes.SIGN_OFF_SELECTED_DOORSTAFF,
      data: { signOutTime: time, signOutDate: date },
    };
  }

  
//SUMMARY ON HOME PAGE
export function GetDoorstaffDaily(summaryRecords) {
    return { type: DoorstaffTypes.GET_DOORSTAFF_SUMMARY_DAILY, data: summaryRecords }
  }
  
  export function GetDoorstaffWeekly(summaryRecords) {
    return { type: DoorstaffTypes.GET_DOORSTAFF_SUMMARY_WEEKLY, data: summaryRecords }
  }
  
  //*DISPUTED
  
  export function GetDisputedDoorstaff(reportRecord) {
    return { type: DoorstaffTypes.GET_DISPUTED_DOORSTAFF, data: reportRecord }
  
  }

  export function GetDoorstaffSummaryDaily(summaryRecords) {
    return {
      type: DoorstaffTypes.GET_COSTS_DOORSTAFF_DAILY,
      data: summaryRecords.slice(0, 3),
    }
  }
  
  export function GetDoorstaffSummaryWeekly(summaryRecords) {
    return {
      type: DoorstaffTypes.GET_COSTS_DOORSTAFF_WEEKLY,
      data: summaryRecords.slice(0, 3),
    }
  }
  
  export function GetDoorstaffSummaryMonthly(summaryRecords) {
    return {
      type: DoorstaffTypes.GET_COSTS_DOORSTAFF_MONTHLY,
      data: summaryRecords.slice(0, 3),
    }
  }
  