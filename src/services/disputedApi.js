import axios from "axios";
import { baseUrl } from "../contexts/baseUrl";

export function GetDisputedActivityAPI(token, system) {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl + '/Disputed/ActivityList?system=' + system, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then((res) => {
            console.log('get disputed activity success', res)
            resolve(res)
        }).catch((e) => {
            console.log('get disputed activity error ', e);
            reject(e);
        })
    })
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
                name: itemToDispute.disputedNote
            }
        }).then((res) => {
            console.log("send disputed item success", res)
            resolve(res)
        }).catch((e) => {
            console.log("send disputed item error", e)
            reject(e)
        })
    })
}

export function ViewDisputedNoteAPI(token, system, activityID) {
    return new Promise((resolve, reject) => {
        axios.get(baseUrl + `/Disputed/GetNotes/${system}/${activityID}`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then((res) => {
            console.log('view disputed note success', res)
            resolve(res)
        }).catch((e) => {
            console.log('view disputed note error', e)
            reject(e)
        })
    })
}


// export function ViewDisputedNote(token, system, activityID) {
//     return function (dispatch) {
//         return axios.get(baseUrl + `/Disputed/GetNotes/${system}/${activityID}`, {
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "Content-Type": "application/x-www-form-urlencoded",
//             }
//         }).then(res => {
//             if (res.data.record.length > 0)
//                 dispatch({ type: SHOW_MODAL_MESSAGE, data: res.data.record[res.data.record.length - 1].name })
//         })
//     }
// }
