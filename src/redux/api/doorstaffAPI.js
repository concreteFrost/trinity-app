import axios from "axios";
import { SetDoorStaffList, ClearSiaData } from "../actions";

//API
export function DeleteDoorStaff(data, token, signOutTIme) {
    return function (dispatch) {
      return axios({
        method: "POST",
        url: "https://testapi.etrinity.services/TrinityWebApi/api/Activity/SignOffMembers",
        data: {
          staffLogin: [
            {
              activityId: data.activityId,
              staffId: data.staffId,
              staffName: data.staffName,
              positionId: data.positionId,
              position: data.position,
              locationId: data.locationId,
              supplierId: data.supplierId,
              supplierName: data.supplierName,
              startTime: data.startTime,
              endTime: signOutTIme,
              rateGroupId: data.rateGroupId,
            },
          ],
          success: true,
          message: "",
        },
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
            if(!res.data.success){
                dispatch({type:'SET_DOORSTAFF_ERROR_MESSAGE', data: res.data.message})
                setTimeout(()=>{
                    dispatch({type:'CLEAR_DOORSTAFF_ERROR_MESSAGE'});
                },3000)
            }
          dispatch(GetDoorstaff(token));
        })
        .catch((e) => console.log(e));
    };
  }
  
  export function GetDoorstaff(token) {
    return function (dispatch) {
      return axios
        .get(
          "https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupCurrentMembers",
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          dispatch(SetDoorStaffList(res.data.staffLogin));
        })
        .catch((e) => {
          console.log(e);
        });
    };
  }
  
  export function SetDoorStaff(token, data) {
    return function (dispatch) {
      return axios({
        method: "POST",
        url: "https://testapi.etrinity.services/TrinityWebApi/api/Activity/SignOnMember",
        data: data,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.data.success) {
            dispatch({ type: "SET_SIA_ERROR_MESSAGE", data: res.data.message });
            setTimeout(() => dispatch({ type: "CLEAR_SIA_ERROR_MESSAGE" }), 3000);
          }
          else{
            dispatch(GetDoorstaff(token));
            dispatch(ClearSiaData())
          }
        })
        .catch((e) => {
          console.log(e.message);
        });
    };
  }