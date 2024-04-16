import axios from "axios";
import { baseUrl } from "../contexts/baseUrl";

export function GetAuthorise(token, system) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/AreaManager/AuthorisePaymentList?system=` + system, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function GetAreaDisputedNotes(token, system, activityID) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        baseUrl + `/AreaManager/GetNotes/${system}/${parseInt(activityID)}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function SendDisputed(system, token, toDispute) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}/AreaManager/DisputeActivity?system=` + system,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      data: {
        id: toDispute.paymentActivityID,
        name: toDispute.disputedNote,
      },
    })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function ApproveActivity(token, system, element) {
  return new Promise((resolve, reject) => {
    axios(
      `${baseUrl}/AreaManager/ApproveActivity?system=${system}&activityId=${element.activityId}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        method: "POST",
      }
    )
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function RecallActivity(token, data) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${baseUrl}/AreaManager/RecallActivity`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
