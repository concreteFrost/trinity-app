import * as ActivityTypes from "../types/activityTypes"

export function GetActivityTypeOpt(record) {
    return { type: ActivityTypes.GET_ACTIVITY_TYPE_OPT, data: record }
  }
  
  export function SetActivityType(recordId) {
    return { type: ActivityTypes.SET_ACTIVITY_TYPE, data: recordId }
  }
  
  export function GetActivitySupplierOpt(suppliers) {
    return { type: ActivityTypes.GET_ACTIVITY_SUPPLIER_OPT, data: suppliers }
  }
  
  export function SetActivitySupplier(supplierID) {
    return { type: ActivityTypes.SET_ACTIVITY_SUPPLIER, data: supplierID }
  }
  
  export function SetActivityCostValue(costValue) {
    return { type: ActivityTypes.SET_ACTIVITY_COST_VALUE, data: costValue }
  }
  
  export function isActivitySupplierProvided(isProvided) {
    return { type: ActivityTypes.SUPPLIER_PROVIDED, data: isProvided }
  }
  
  export function GetActivityRate(rate) {
    return { type: ActivityTypes.GET_ACTIVITY_RATE, data: rate }
  }
  
  
  export function GetActivityCurrent(records) {
    return { type: ActivityTypes.GET_CURRENT_ACTIVITY, data: records }
  }
  
  export function GetActivityRecents(records) {
    return { type: ActivityTypes.GET_RECENT_ACTIVITY, data: records }
  }
  
  export function SetActivityHoursWorked(hours) {
    return { type: ActivityTypes.SET_ACTIVITY_HOURS_WORKED, data: hours }
  }
  
  export function ClearActivity() {
    return { type: ActivityTypes.CLEAR_ACTIVITY }
  }

  export function GetDisputedActivity(reportRecord) {
    return { type: ActivityTypes.GET_DISPUTED_ACTIVITY, data: reportRecord }
  
  }

  export function SetCostsDate(date){
    return {type: ActivityTypes.SET_COSTS_DATE, data: date}
  }

  
export function GetCostsSummaryDaily(summaryRecords) {
  return {
    type: ActivityTypes.GET_COSTS_ACTIVITY_DAILY,
    data: summaryRecords.slice(3, summaryRecords.length),
  }
}

export function GetCostsSummaryWeekly(summaryRecords) {
  return {
    type: ActivityTypes.GET_COSTS_ACTIVITY_WEEKLY,
    data: summaryRecords.slice(3, summaryRecords.length),
  }
}

export function GetCostsSummaryMonthly(summaryRecords) {
  return {
    type: ActivityTypes.GET_COSTS_ACTIVITY_MONTHLY,
    data: summaryRecords.slice(3, summaryRecords.length),
  }
}
  