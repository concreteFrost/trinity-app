//*ACTIVITY 

//GET
export const GET_ACTIVITY_TYPE_OPT = "GET_ACTIVITY_TYPE_OPT"
export const GET_ACTIVITY_SUPPLIER_OPT = "GET_ACTIVITY_SUPPLIER_OPT"
export const GET_ACTIVITY_RATE = "GET_ACTIVITY_RATE"
export const GET_CURRENT_ACTIVITY = "GET_CURRENT_ACTIVITY"
export const GET_RECENT_ACTIVITY = "GET_RECENT_ACTIVITY"
export const GET_DISPUTED_ACTIVITY = "GET_DISPUTED_ACTIVITY"
export const GET_DISPUTED_COUNT = "GET_DISPUTED_COUNT"

//SET
export const SET_ACTIVITY_TYPE = "SET_ACTIVITY_TYPE"
export const SET_ACTIVITY_SUPPLIER = "SET_ACTIVITY_SUPPLIER"
export const SET_ACTIVITY_HOURS_WORKED = "SET_ACTIVITY_HOURS_WORKED"
export const SET_ACTIVITY_COST_VALUE = "SET_ACTIVITY_COST_VALUE"
export const CLEAR_ACTIVITY = "CLEAR_ACTIVITY"


//*COSTS

//GET
export const GET_COSTS_DOORSTAFF_DAILY = "GET_COSTS_DOORSTAFF_DAILY"
export const GET_COSTS_DOORSTAFF_WEEKLY = "GET_COSTS_DOORSTAFF_WEEKLY"
export const GET_COSTS_DOORSTAFF_MONTHLY = "GET_COSTS_DOORSTAFF_MONTHLY"
export const GET_COSTS_ACTIVITY_DAILY = "GET_COSTS_ACTIVITY_DAILY"
export const GET_COSTS_ACTIVITY_WEEKLY = "GET_COSTS_ACTIVITY_WEEKLY"
export const GET_COSTS_ACTIVITY_MONTHLY = "GET_COSTS_ACTIVITY_MONTHLY"

//SET
export const SET_COSTS_DATE = "SET_COSTS_DATE"


//*DOORSTAFF

//GET
export const GET_DOORSTAFF_LIST = "GET_DOORSTAFF_LIST"
export const GET_RECENT_DOORSTAFF = "GET_RECENT_DOORSTAFF"
export const GET_DISPUTED_DOORSTAFF = "GET_DISPUTED_DOORSTAFF"
export const GET_DOORSTAFF_POSITION_OPT = 'GET_DOORSTAFF_POSITION_OPT'
export const GET_DOORSTAFF_SUPPLIER_OPT = "GET_DOORSTAFF_SUPPLIER_OPT"
export const GET_DOORSTAFF_RATE_OPT = "GET_DOORSTAFF_RATE_OPT"

export const TOGGLE_DOORSTAFF_TO_SIGN_OUT = "TOGGLE_DOORSTAFF_TO_SIGN_OUT"
export const SELECT_ALL_DOORSTAFF_TO_SIGN_OUT = "SELECT_ALL_DOORSTAFF_TO_SIGN_OUT"
export const DESELECT_ALL_DOORSTAFF_TO_SIGN_OUT = "DESELECT_ALL_DOORSTAFF_TO_SIGN_OUT"
export const SET_DOORSTAFF_SIGNOUT_TIME = "SET_DOORSTAFF_SIGNOUT_TIME"
export const SET_DOORSTAFF_SIGNOUT_DATE = "SET_DOORSTAFF_SIGNOUT_DATE"
export const SIGN_OFF_SELECTED_DOORSTAFF = "SIGN_OFF_SELECTED_DOORSTAFF"
export const SHOW_SIGN_OFF_MODAL = "SHOW_SIGN_OFF_MODAL"
export const HIDE_SIGN_OFF_MODAL = "HIDE_SIGN_OFF_MODAL"

//SET
export const SET_DOORSTAFF_ERROR_MESSAGE = "SET_DOORSTAFF_ERROR_MESSAGE"
export const SET_DOORSTAFF_POSITION = "SET_DOORSTAFF_POSITION"
export const SET_DOORSTAFF_SUPPLIER = "SET_DOORSTAFF_SUPPLIER"
export const SET_DOORSTAFF_RATE = "SET_DOORSTAFF_RATE"
export const SET_DOORSTAFF_START_DATE = "SET_DOORSTAFF_START_DATE"
export const SET_DOORSTAFF_START_TIME = "SET_DOORSTAFF_START_TIME"


//CLEAR
export const CLEAR_DOORSTAFF_ERROR_MESSAGE = "CLEAR_DOORSTAFF_ERROR_MESSAGE"


//*SIA

//GET
export const GET_SIA_DATA = "GET_SIA_DATA"

//SET
export const SET_SIA_NUMBER = "SET_SIA_NUMBER"
export const SET_SIA_ERROR_MESSAGE = "SET_SIA_ERROR_MESSAGE"

//CLEAR
export const CLEAR_SIA_ERROR_MESSAGE = "CLEAR_SIA_ERROR_MESSAGE"
export const CLEAR_SIA_DATA = "CLEAR_SIA_DATA"

//*SUMMARY

//GET
export const GET_DOORSTAFF_SUMMARY_DAILY = "GET_DOORSTAFF_SUMMARY_DAILY"
export const GET_DOORSTAFF_SUMMARY_WEEKLY = "GET_DOORSTAFF_SUMMARY_WEEKLY"

//*MODAL MESSAGE

export const SHOW_MODAL_MESSAGE = "SHOW_MODAL_MESSAGE"
export const HIDE_MODAL_MESSAGE = "HIDE_MODAL_MESSAGE"
export const SHOW_LOGOUT_MODAL = "SHOW_LOGOUT_MODAL"
export const HIDE_LOGOUT_MODAL = "HIDE_LOGOUT_MODAL"
export const SET_MODAL_MESSAGE_HEADER = "SET_MODAL_MESSAGE_HEADER"
export const SET_DISPUTED_SIA_COUNT_MODAL = "SET_DISPUTED_SIA_COUNT_MODAL"
export const SET_DISPUTED_CC_COUNT_MODAL = "SET_DISPUTED_CC_COUNT_MODAL"



//*MODAL PROMPT
export const SHOW_MODAL_PROMPT = "SHOW_MODAL_PROMPT"
export const HIDE_MODAL_PROMPT = "HIDE_MODAL_PROMPT"
export const SET_DISPUTED_NOTE = "SET_DISPUTED_NOTE"
export const SET_DISPUTED_PAYMENT_ID = "SET_DISPUTED_PAYMENT_ID"
export const RESET_MODAL_ACTIVITY = "RESET_MODAL_ACTIVITY"


//*AUTHORISE

//GET
export const GET_AUTHORISE_DOORSTAFF = "GET_AUTHORISE_DOORSTAFF"
export const GET_AUTHORISE_COSTS = "GET_AUTHORISE_COSTS"

//CHECK
export const CHECK_AUTHORISE_DOORSTAFF = "CHECK_AUTHORISE_DOORSTAFF"
export const CHECK_AUTHORISE_COSTS = "CHECK_AUTHORISE_COSTS"
export const CHECK_ALL_AUTHORISE_DOORSTAFF = "CHECK_ALL_AUTHORISE_DOORSTAFF"
export const CHECK_ALL_AUTHORISE_COSTS = "CHECK_ALL_AUTHORISE_COSTS"

//UNCHECK
export const UNCHECK_AUTHORISE_DOORSTAFF = "UNCHECK_AUTHORISE_DOORSTAFF"
export const UNCHECK_AUTHORISE_COSTS = "UNCHECK_AUTHORISE_COSTS"
export const UNCHECK_ALL_AUTHORISE_DOORSTAFF = "UNCHECK_ALL_AUTHORISE_DOORSTAFF"
export const UNCHECK_ALL_AUTHORISE_COSTS = "UNCHECK_ALL_AUTHORISE_COSTS"


//*SEARCH

//GET
export const GET_ACTIVITIES_SEARCH_LOCATIONS_GROUP_OPT = "GET_ACTIVITIES_SEARCH_LOCATIONS_GROUP_OPT"
export const GET_ACTIVITIES_SEARCH_SUPPLIERS_OPT = "GET_ACTIVITIES_SEARCH_SUPPLIERS_OPT"
export const GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_GROUP_OPT = "GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_GROUP_OPT"
export const GET_ACTIVITIES_SEARCH_LOCATIONS_OPT = "GET_ACTIVITIES_SEARCH_LOCATIONS_OPT"
export const GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_OPT = "GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_OPT"
export const GET_ACTIVITIES_SEARCH_STAFF_OPT = "GET_ACTIVITIES_SEARCH_STAFF_OPT"
export const GET_SEARCHED_ACTIVITES = "GET_SEARCHED_ACTIVITES"

//SET
export const SET_ACTIVITIES_SEARCH_FROM_DATE = "SET_ACTIVITIES_SEARCH_FROM_DATE"
export const SET_ACTIVITIES_SEARCH_TO_DATE = "SET_ACTIVITIES_SEARCH_TO_DATE"

//*HISTORY

//GET
export const GET_HISTORY_AUDIT_TYPE_OPT = "GET_HISTORY_AUDIT_TYPE_OPT"
export const GET_HISTORY_AUDIT_LOCATIONS_OPT = "GET_HISTORY_AUDIT_LOCATIONS_OPT"
export const GET_HISTORY_AUDIT_STAFF_OPT = "GET_HISTORY_AUDIT_STAFF_OPT"
export const GET_HISTORY_AUDIT_USER_OPT = "GET_HISTORY_AUDIT_USER_OPT"

//SET 
export const SET_HISTORY_AUDIT_FROM_DATE = "SET_HISTORY_AUDIT_FROM_DATE"
export const SET_HISTORY_AUDIT_TO_DATE = "SET_HISTORY_AUDIT_TO_DATE"

//*LOADER

export const SHOW_LOADER = "SHOW_LOADER"
export const HIDE_LOADER = "HIDE_LOADER"

//*LOGIN

export const LOGIN = "LOGIN"
export const LOGOFF = "LOGOFF"
export const SHOW_ERROR_ON_LOGIN = "SHOW_ERROR_ON_LOGIN"
export const CLEAR_ERROR_ON_LOGIN = "CLEAR_ERROR_ON_LOGIN"

//* ANALYTICS

//AREA MANAGER
export const GET_AREA_MANAGER_ANALYTICS_LOCATIONS = "GET_AREA_MANAGER_ANALYTICS_LOCATIONS";
export const TOGGLE_ARREA_MANAGER_ANALYTICS_LOCATIONS = "TOGGLE_ARREA_MANAGER_ANALYTICS_LOCATIONS";
export const GET_AREA_MANAGER_ANALYTICS_COSTS = "GET_AREA_MANAGER_ANALYTICS_COSTS";
export const GET_AREA_MANAGER_ANALYTICS_DOORSTAFF = "GET_AREA_MANAGER_ANALYTICS_DOORSTAFF";
export const SET_AREA_MANAGER_ANALYTICS_DATE_FROM = "SET_AREA_MANAGER_ANALYTICS_DATE_FROM";
export const SET_AREA_MANAGER_ANALYTICS_DATE_TO = "SET_AREA_MANAGER_ANALYTICS_DATE_TO";

