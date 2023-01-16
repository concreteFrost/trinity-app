import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";
import {GET_HISTORY_AUDIT_LOCATIONS_OPT, GET_HISTORY_AUDIT_STAFF_OPT,GET_HISTORY_AUDIT_TYPE_OPT} from '../types'

export function GetHistoryAuditType(token){
    return function(dispatch){
        return axios.get(baseUrl+"/Report/CriteriaAuditTypeList",{
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
              },
        }).then((res)=>{dispatch(
            {type: GET_HISTORY_AUDIT_TYPE_OPT, data: res.data.record})
            console.log(res.data)
        }
        )
    }
}

export function GetHistorySearchLocations(token) {
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
            type: GET_HISTORY_AUDIT_LOCATIONS_OPT,
            data: res.data.record,
          })
        )
        .catch((e) => console.log(e));
    };
  }

  export function GetHistorySearchStaff(token) {
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
            type: GET_HISTORY_AUDIT_STAFF_OPT,
            data: res.data.record,
          })
        )
        .catch((e) => console.log(e));
    };
  }
  