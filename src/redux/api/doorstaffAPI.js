import axios from "axios";
import { SetDoorStaffList, ClearSiaData } from "../actions";
import { SET_DOORSTAFF_ERROR_MESSAGE, CLEAR_DOORSTAFF_ERROR_MESSAGE } from "../types";
import { SET_SIA_ERROR_MESSAGE, CLEAR_SIA_ERROR_MESSAGE } from "../types";


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
        if (!res.data.success) {
          dispatch({ type: SET_DOORSTAFF_ERROR_MESSAGE, data: res.data.message })
          setTimeout(() => {
            dispatch({ type: CLEAR_DOORSTAFF_ERROR_MESSAGE });
          }, 3000)
        }
        dispatch(GetDoorstaff(token));
      })
      .catch((e) => console.log(e));
  };
}

export function GetDoorstaffPositions(headers) {
  return function (dispatch) {
    return axios
      .get(
        "https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupPositions",
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(res)
        dispatch({ type: "GET_DOORSTAFF_POSITION_OPT", data: res.data.position })
        dispatch({ type: "SET_DOORSTAFF_POSITION", data: res.data.position[0]})
      })
      .catch((e) => console.log("no positions available"));
  }
}

export function GetDoorstaffSuppliers(headers, positionId) {
  return function (dispatch) {
    return axios
      .get(
        "https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupSuppliers/" +
          positionId,
        {
          headers: headers,
        }
      )
      .then((res) => {
        dispatch({ type: "GET_DOORSTAFF_SUPPLIER_OPT", data: res.data.suppliers })
        dispatch({ type: "SET_DOORSTAFF_SUPPLIER", data: res.data.suppliers[0] })
      })
      .catch((e) => console.log("no supplier ID"));
  }
}

export function GetDoorstaffRates(position,supplier,date,headers){
  return function(dispatch){
    return axios
    .get(
      "https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupRates/" +
      position +
      "/" +
      supplier +
      "/" +
      new Date(date).getTime(),
      {
        headers: headers,
      }
    )
    .then((res) => {
      console.log('rates', res)
      if(res.data.success === false){
        console.log('false req')
        dispatch({type:"SHOW_MODAL_MESSAGE",data: res.data.message})
      }
      dispatch({ type: "GET_DOORSTAFF_RATE_OPT", data: res.data.rates })
      dispatch({ type: "SET_DOORSTAFF_RATE", data: res.data.rates[0] })
      console.log(date)
    })
  }
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
          dispatch({ type: SET_SIA_ERROR_MESSAGE, data: res.data.message });
          setTimeout(() => dispatch({ type: CLEAR_SIA_ERROR_MESSAGE }), 3000);
        }
        else {
          dispatch(GetDoorstaff(token));
          dispatch(ClearSiaData())
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
}