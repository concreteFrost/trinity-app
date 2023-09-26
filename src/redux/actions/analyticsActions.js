import * as AnalyticsTypes from "../types/analyticsTypes";


export function GetAreaManagerAnalyticsLocations(locations) {
    return ({
      type: AnalyticsTypes.GET_AREA_MANAGER_ANALYTICS_LOCATIONS,
      data: locations
    })
  }
  export function SetAreaManagerAnalyticsDateFrom(dateFrom) {
    return { type: AnalyticsTypes.SET_AREA_MANAGER_ANALYTICS_DATE_FROM, data: dateFrom }
  }
  
  export function SetAreaManagerAnalyticsDateTo(dateTo) {
    return { type: AnalyticsTypes.SET_AREA_MANAGER_ANALYTICS_DATE_TO, data: dateTo }
  }
  
  export function GetAreaManagerAnalyticsCosts(concatenatedResults) {
    return { type: AnalyticsTypes.GET_AREA_MANAGER_ANALYTICS_COSTS, data: concatenatedResults }
  }
  
  export function GetAreaManagerAnalyticsDoorstaff(concatenatedResults) {
    return { type: AnalyticsTypes.GET_AREA_MANAGER_ANALYTICS_DOORSTAFF, data: concatenatedResults }
  }
  
  export function ToggleAreaManagerAnalyticsLocations(id) {
    return { type: AnalyticsTypes.TOGGLE_ARREA_MANAGER_ANALYTICS_LOCATIONS, data: id }
  }
  
  export function GetDoorstaffAnalytics(reportRecord) {
    return { type: AnalyticsTypes.GET_DOORSTAFF_ANALYTICS, data: reportRecord }
  }
  
  export function GetCostsAnalytics(reportRecord) {
    return { type: AnalyticsTypes.GET_COSTS_ANALYTICS, data: reportRecord }
  }
  