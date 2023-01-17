import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";
import {
  GET_ACTIVITIES_SEARCH_LOCATIONS_GROUP_OPT,
  GET_ACTIVITIES_SEARCH_SUPPLIERS_OPT,
  GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_GROUP_OPT,
  GET_ACTIVITIES_SEARCH_LOCATIONS_OPT,
  GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_OPT,
  GET_ACTIVITIES_SEARCH_STAFF_OPT,SHOW_MODAL_MESSAGE
} from "../types";

export function GetSearchSuppliers(token) {
  return function (dispatch) {
    return axios
      .get(`${baseUrl}/Report/CriteriaSupplierList`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        dispatch({
          type: GET_ACTIVITIES_SEARCH_SUPPLIERS_OPT,
          data: res.data.record,
        })
      )
      .catch((e) => console.log(e));
  };
}

export function GetSearchLocations(token) {
  return function (dispatch) {
    return axios
      .get(`${baseUrl}/Report/CriteriaLocationList`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        dispatch({
          type: GET_ACTIVITIES_SEARCH_LOCATIONS_OPT,
          data: res.data.record,
        })
      )
      .catch((e) => console.log(e));
  };
}

export function GetSearchLocationsGroup(token) {
  return function (dispatch) {
    return axios
      .get(`${baseUrl}/Report/CriteriaLocationGroupList`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        dispatch({
          type: GET_ACTIVITIES_SEARCH_LOCATIONS_GROUP_OPT,
          data: res.data.record,
        })
      )
      .catch((e) => console.log(e));
  };
}

export function GetSearchStaff(token) {
  return function (dispatch) {
    return axios
      .get(`${baseUrl}/Report/CriteriaStaffList`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        dispatch({
          type: GET_ACTIVITIES_SEARCH_STAFF_OPT,
          data: res.data.record,
        })
      )
      .catch((e) => console.log(e));
  };
}

export function GetSearchPaymentStatus(token) {
  return function (dispatch) {
    return axios
      .get(`${baseUrl}/Report/CriteriaPaymentStatusList`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        dispatch({
          type: GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_OPT,
          data: res.data.record,
        })
      )
      .catch((e) => console.log(e));
  };
}

export function GetSearchPaymentStatusGroup(token) {
  return function (dispatch) {
    return axios
      .get(`${baseUrl}/Report/CriteriaPaymentReportStatusList`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) =>
        dispatch({
          type: GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_GROUP_OPT,
          data: res.data.record,
        })
      )
      .catch((e) => console.log(e));
  };
}

export function GetSearchedData(system, token, _data) {
  return function (dispatch) {
    return axios(`${baseUrl}/Report/ActivityList?system=` + system, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: _data,
    }).then((res) => {
      switch (system) {
        case "S":
          dispatch({
            type: "GET_SEARCHED_ACTIVITES",
            data: res.data.reportRecord,
          });
          break;

        case "A":
          dispatch({
            type: "GET_SEARCHED_COSTS",
            data: res.data.reportRecord,
          });
          break;
      }
      if (res.data.success === false) {
        dispatch({ type: SHOW_MODAL_MESSAGE, data: res.data.message });
      }
    });
  };
}
