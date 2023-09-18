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
      url: `${baseUrl}/AreaManager/RecallActivity`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        if (!res.data.success) {
          dispatch({ type: SHOW_MODAL_MESSAGE, data: res.data.message })
        }
        else {
          dispatch(GetAuthorise("S", token))
          dispatch(GetAuthorise("A", token))
        }
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



export function ApproveActivity(system, token, element) {
  return function (dispatch) {
    return axios(
      `${baseUrl}/AreaManager/ApproveActivity?system=${system}&activityId=${element.activityId}`,
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

        return res.data.reportRecord

      }).then(data => data.forEach(element => dispatch(GetAreaDisputedNotes(token, system, element.activityId))))
  };
}


export function GetAreaDisputedNotes(token, system, activityID) {
  return function (dispatch) {
    return axios.get(baseUrl + `/AreaManager/GetNotes/${system}/${parseInt(activityID)}`, {
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded",
      }
    }).then(res => {
      if (res.data.record.length > 0) {

        switch (system) {
          case "S":

            dispatch({ type: "GET_DOORSTAFF_DISPUTED_NOTE_LIST", activityID: activityID, data: res.data.record })
            break;
          case "A":
            dispatch({ type: "GET_COSTS_DISPUTED_NOTE_LIST", activityID: activityID, data: res.data.record })
            break;
        }

      }
    })
  }
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

