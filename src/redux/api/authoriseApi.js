import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";
import {
  GET_AUTHORISE_DOORSTAFF,
  GET_AUTHORISE_COSTS,
  SHOW_MODAL_MESSAGE,
} from "../types";

export function RecallActivity(data, token) {
  return function (dispatch) {
    return axios({
      method: "POST",
      url: `${baseUrl}/Activity/RecallActivity`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        dispatch({ type: "HIDE_ACTION_MODAL" });
        console.log("ACTIVITY RECALL SUCCESS", res.data)
      })
      .catch((e) => console.log("ACTIVITY RECALL FAIL", e));
  };
}

export function DeleteActivity(data, token) {
  return function (dispatch) {
    return axios({
      method: "POST",
      url: `${baseUrl}/Activity/DeleteActivity`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        dispatch({ type: "HIDE_ACTION_MODAL" });
        console.log("ACTIVITY DELETE SUCCESS", res.data)
      })
      .catch((e) => console.log("ACTIVITY DELETE FAIL", e));
  };
}

export function GetAuthorise(system, token) {
  return function (dispatch) {
    return axios
      .get(`${baseUrl}/AreaManager/AuthorisePaymentList?system=` + system, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        switch (system) {
          case "S":
            dispatch({
              type: GET_AUTHORISE_DOORSTAFF,
              data: res.data.reportRecord,
            });
            break;
          case "A":
            dispatch({
              type: GET_AUTHORISE_COSTS,
              data: res.data.reportRecord,
            });
            break;
        }

      });
  };
}

export function ApproveActivity(system, token, element) {
  return function (dispatch) {
    return axios(
      `${baseUrl}/AreaManager/ApproveActivity?system=${system}&paymentAuthId=${element.paymentAuthId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    ).then((res) => dispatch(GetAuthorise(system, token)));
  };
}

export function ViewNote(token, activityId) {
  return function (dispatch) {
    return axios
      .get(`${baseUrl}/CentralCosts/GetNote/${activityId}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.data.message.length > 0)
          dispatch({ type: SHOW_MODAL_MESSAGE, data: res.data.message });
      });
  };
}
