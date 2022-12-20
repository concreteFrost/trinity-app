import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";
import { GET_DISPUTED_ACTIVITY, GET_DISPUTED_DOORSTAFF } from '../types'
import { GetAuthorise } from "./authoriseApi";

//FOR PUB MANAGER
export function GetDisputedActivity(token, system) {
    return function (dispatch) {
        return axios.get(baseUrl + '/Disputed/ActivityList?system=' + system, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
            }
        }).then(res => {
            switch(system){
                case "S":
                    dispatch({ type: GET_DISPUTED_DOORSTAFF, data: res.data.reportRecord })
                    break;
                case "A":

                    dispatch({ type: GET_DISPUTED_ACTIVITY, data: res.data.reportRecord })
                    break;
            }
        
        }
        )
    }
}

//FOR PUB MANAGER
export function SendBackDisputed(token, returnDisputed, system) {
    return function (dispatch) {
        return axios({
            url: baseUrl + "/Disputed/ReturnActivity?system="+ system,
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            method: "POST",
            data: {
                id: returnDisputed.paymentActivityID,
                name: returnDisputed.disputedNote
            },
        })
            .then((res) => {
                dispatch({ type: 'RESET_MODAL_ACTIVITY' })
                dispatch(GetDisputedActivity(token, system ))
                console.log(res)

            }).catch(e => console.log(e))
    }
}


//FOR AREA MANAGER
export function SendDisputed(system, token, dispute) {
    return function (dispatch) {
        return axios({
            url: "https://testapi.etrinity.services/TrinityWebApi/api/AreaManager/DisputeActivity?system=" + system,
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            method: "POST",
            data: {
                id: dispute.paymentActivityID,
                name: dispute.disputedNote
            },
        })
            .then(() => {
                dispatch({ type: 'RESET_MODAL_ACTIVITY' })
                dispatch(GetAuthorise(system, token))
            }).catch(e => console.log(e))
    }
}


//FOR PUB MANAGER
export function ViewDisputedNote(token,system,activityID) {
    return function (dispatch) {
      return axios.get(baseUrl + `/Disputed/GetNotes/${system}/${activityID}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }).then(res => {
        if(res.data.record.length > 0)
        dispatch({ type: "SHOW_MODAL_MESSAGE", data: res.data.record[res.data.record.length-1].name })
      })
    }
  }

//FOR AREA MANAGER
export function ViewAreaDisputedNote(token,system,activityID) {
    return function (dispatch) {
      return axios.get(baseUrl + `/AreaManager/GetNotes/${system}/${parseInt(activityID)}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }).then(res => {
        if(res.data.record.length > 0)
        dispatch({ type: "SHOW_MODAL_MESSAGE", data: res.data.record[res.data.record.length-1].name })
      })
    }
  }


