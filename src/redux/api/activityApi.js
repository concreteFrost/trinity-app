import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";
import {
  GET_ACTIVITY_TYPE_OPT, GET_ACTIVITY_SUPPLIER_OPT,
  GET_ACTIVITY_RATE, SET_ACTIVITY_TYPE,
  SET_ACTIVITY_SUPPLIER,
  SET_ACTIVITY_COST_VALUE, CLEAR_ACTIVITY,
  GET_DISPUTED_ACTIVITY, SHOW_MODAL_MESSAGE, GET_CURRENT_ACTIVITY, GET_RECENT_ACTIVITY
} from "../types";

export function GetActivityTypeOpt(token) {
  return function (dispatch) {
    return axios
      .get(
        `${baseUrl}/CentralCosts/LookupCostGroups`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        dispatch({ type: GET_ACTIVITY_TYPE_OPT, data: res.data.record });
        dispatch({ type: SET_ACTIVITY_TYPE, data: res.data.record[0].id });
        dispatch(GetSupplierOpt(token, res.data.record[0].id));
      })
      .catch((e) => { });
  };
}

export function GetSupplierOpt(token, activityId) {
  return function (dispatch) {
    return axios
      .get(
        `${baseUrl}/CentralCosts/LookupSuppliers/` +
        activityId,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        dispatch({ type: GET_ACTIVITY_SUPPLIER_OPT, data: res.data.suppliers });
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export function GetRate(token, data) {
  return function (dispatch) {
    return axios({
      url: `${baseUrl}/CentralCosts/LookupRate`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      data: {
        costGroupId: data.activityID,
        supplierId: data.supplierID,
        costEntryTime: data.time,
      },
    })
      .then((res) => {
        console.log('result of get rate', res)
        if (res.data.message) {
          dispatch({ type: SHOW_MODAL_MESSAGE, data: res.data.message })
        }
        else {
          dispatch({ type: GET_ACTIVITY_RATE, data: res.data })
          dispatch({ type: SET_ACTIVITY_SUPPLIER, data: data.supplierID })
          dispatch({ type: SET_ACTIVITY_COST_VALUE, data: res.data.costValue })
        }

      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export function SubmitActivity(token, _data) {
  return function (dispatch) {
    return axios({
      url: `${baseUrl}/CentralCosts/CostEntry`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      data: _data,
    })
      .then((res) => {
        dispatch({ type: CLEAR_ACTIVITY });
        dispatch(GetActivityTypeOpt(token));



      }).then(() => {
        const today = new Date()
        const yesterday = new Date(new Date().setDate(today.getDate() - 1));
        dispatch(GetActivity(token, yesterday, today, "C"))
      })
      .catch((e) => {
        console.log(e)
        dispatch({ type: SHOW_MODAL_MESSAGE, data: e.message })
      });
  }
}

export function GetActivity(token, dateFrom, dateTo, activityType) {
  return function (dispatch) {
    return axios({
      url: `${baseUrl}/Report/CostReview`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      data: {
        dateFrom: dateFrom,
        dateTo: dateTo
      },
    })
      .then((res) => {
        switch (activityType) {
          case "C": dispatch({ type: GET_CURRENT_ACTIVITY, data: res.data.records })
            break;
          case "R": dispatch({ type: GET_RECENT_ACTIVITY, data: res.data.records })
            break;
          case "D": dispatch({ type: GET_DISPUTED_ACTIVITY, data: res.data.records })
            break;

        }

      })
  }
}

