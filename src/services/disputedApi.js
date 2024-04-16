import axios from "axios";
import { baseUrl } from "../contexts/baseUrl";

export function GetDisputedActivityAPI(token, system) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Disputed/ActivityList?system=" + system, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
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

export function SendBackDisputedAPI(token, itemToDispute, system) {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + "/Disputed/ReturnActivity?system=" + system,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      data: {
        id: itemToDispute.paymentActivityID,
        name: itemToDispute.disputedNote,
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

export function ViewDisputedNoteAPI(token, system, activityID) {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + `/Disputed/GetNotes/${system}/${activityID}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
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
