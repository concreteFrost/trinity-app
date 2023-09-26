import * as SearchTypes from "../types/searchTypes"

//GET
export function GetSearchStaff(record) {
    return {
      type: SearchTypes.GET_ACTIVITIES_SEARCH_STAFF_OPT,
      data: record,
    }
  }
  
  export function GetSearchSuppliers(record) {
    return {
      type: SearchTypes.GET_ACTIVITIES_SEARCH_SUPPLIERS_OPT,
      data: record,
    }
  }
  
  export function GetSearchLocations(record) {
    return {
      type: SearchTypes.GET_ACTIVITIES_SEARCH_LOCATIONS_OPT,
      data: record,
    }
  }
  
  export function GetSearchLocationGroup(record) {
    return {
      type: SearchTypes.GET_ACTIVITIES_SEARCH_LOCATIONS_GROUP_OPT,
      data: record,
    }
  }
  
  export function GetSearchPaymentStatus(record) {
    return {
      type: SearchTypes.GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_OPT,
      data: record,
    }
  }
  
  export function GetSearchPaymentStatusGroup(record) {
    return {
      type: SearchTypes.GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_GROUP_OPT,
      data: record,
    }
  }
  
  export function GetSearchedActivities(reportRecord) {
    return {
      type: SearchTypes.GET_SEARCHED_ACTIVITES,
      data: reportRecord,
    }
  }
  
  export function GetSearchedCosts(reportRecord) {
    return {
      type: SearchTypes.GET_SEARCHED_COSTS,
      data: reportRecord,
    }
  }
  
  