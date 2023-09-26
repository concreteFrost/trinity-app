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
        console.log("get authorise payment list success", res)
        resolve(res.data.reportRecord);
      })
      .catch((e) => {
        console.log("get authorise payment list error", e)
        reject(e)});
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
        console.log("get disputed note success", res)
        resolve(res.data.record)})
      .catch((e) => {
        console.log("get disputed note error", e)
        reject(e)});
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
        console.log("send disputed note success", res)
        resolve(res)})
      .catch((e) => {
        console.log("send disputed note error", e)
        reject(e)});
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
      .then((res) =>{ 
        console.log("approve activity success", res)
        resolve(res)})
      .catch((e) =>{ 
        console.log("approve activity error",e)
        reject(e)});
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
        console.log("recall activity success", res)
        resolve(res.data);
      })
      .catch((e) => {
        console.log("recall activity error", e)
        reject(e);
      });
  });
}
