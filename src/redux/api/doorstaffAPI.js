import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";
import { SetDoorStaffList, ClearSiaData } from "../actions";
import {
  SET_DOORSTAFF_ERROR_MESSAGE,
  CLEAR_DOORSTAFF_ERROR_MESSAGE,
  GET_DOORSTAFF_POSITION_OPT,
  SET_DOORSTAFF_POSITION,
  SET_DOORSTAFF_RATE,
  SHOW_MODAL_MESSAGE,
  GET_DOORSTAFF_SUPPLIER_OPT,
  SET_DOORSTAFF_SUPPLIER,
  GET_DOORSTAFF_RATE_OPT,
} from "../types";

export function CancelDoorStaff(data, token) {
  return function (dispatch) {
    return axios({
      method: "POST",
      url: `${baseUrl}/Activity/CancelActivity`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then(() => {
        dispatch({ type: "HIDE_ACTION_MODAL" });
        dispatch(GetDoorstaff(token));
      })
      .catch((e) => console.log(e));
  };
}

export function DeleteDoorStaff(data, token, signOutTime) {
  const toLogOut = Array.isArray(data)
    ? data.map((staff) => ({
        activityId: staff.activityId,
        staffId: staff.staffId,
        staffName: staff.staffName,
        positionId: staff.positionId,
        position: staff.position,
        locationId: staff.locationId,
        supplierId: staff.supplierId,
        supplierName: staff.supplierName,
        startTime: staff.startTime,
        endTime: signOutTime,
        rateGroupId: staff.rateGroupId,
      }))
    : [
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
          endTime: signOutTime,
          rateGroupId: data.rateGroupId,
        },
      ];

  return (dispatch) =>
    axios({
      method: "POST",
      url: `${baseUrl}/Activity/SignOffMembers`,
      data: {
        staffLogin: toLogOut,
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
          dispatch({
            type: SET_DOORSTAFF_ERROR_MESSAGE,
            data: res.data.message,
          });
          setTimeout(() => {
            dispatch({ type: CLEAR_DOORSTAFF_ERROR_MESSAGE });
          }, 3000);
        } else {
          dispatch(GetDoorstaff(token));
        }
      })
      .catch((e) => console.log(e));
}

export function GetDoorstaffPositions(headers) {
  return function (dispatch) {
    return axios
      .get(`${baseUrl}/Activity/LookupPositions`, {
        headers: headers,
      })
      .then((res) => {
        dispatch({ type: GET_DOORSTAFF_POSITION_OPT, data: res.data.position });
        dispatch({ type: SET_DOORSTAFF_POSITION, data: res.data.position[0] });
      })
      .catch((e) => console.log("no positions available"));
  };
}

export function GetDoorstaffSuppliers(headers, positionId) {
  return function (dispatch) {
    return axios
      .get(`${baseUrl}/Activity/LookupSuppliers/` + positionId, {
        headers: headers,
      })
      .then((res) => {
   
        dispatch({
          type: GET_DOORSTAFF_SUPPLIER_OPT,
          data: res.data.suppliers,
        });
        dispatch({ type: SET_DOORSTAFF_SUPPLIER, data: res.data.suppliers[0] });
      })
      .catch((e) =>  dispatch({
        type: GET_DOORSTAFF_SUPPLIER_OPT,
        data: [],
      }));
  };
}

export function GetDoorstaffRates(position, supplier, date, headers) {
  return function (dispatch) {
    return axios
      .get(
        `${baseUrl}/Activity/LookupRates/` +
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
      
        if (res.data.success === false) {
          dispatch({
            type: SHOW_MODAL_MESSAGE,
            data: "Please select the correct supplier",
          });
        }
        dispatch({ type: GET_DOORSTAFF_RATE_OPT, data: res.data.rates });
        dispatch({ type: SET_DOORSTAFF_RATE, data: res.data.rates[0] });
      }).catch(e=>{
        dispatch({ type: GET_DOORSTAFF_RATE_OPT, data: [] });
      });
  };
}

export function GetDoorstaff(token) {
  return function (dispatch) {
    return axios
      .get(`${baseUrl}/Activity/LookupCurrentMembers`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        dispatch(SetDoorStaffList(res.data.staffLogin));
      })
      .catch((e) => {

      });
  };
}

export function SetDoorStaff(token, sia) {
  return function (dispatch) {
    return axios({
      method: "POST",
      url: `${baseUrl}/Activity/SignOnMember`,
      data: {
        staffId: sia.doorstaff.staffId,
        staffName: sia.doorstaff.firstName + " " + sia.doorstaff.lastName,
        positionId: parseInt(sia.position.positionId),
        position: sia.position.positionName,
        locationId: parseInt(token.locationId),
        supplierId: parseInt(sia.supplier.supplierId),
        supplierName: sia.supplier.supplierName,
        startTime: sia.date + "T" + sia.time,
        rateGroupId: sia.rate.rateGroupId,
      },
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.data.success) {
          dispatch({ type: SHOW_MODAL_MESSAGE, data: res.data.message });
        } else {
          dispatch(GetDoorstaff(token));
          dispatch(ClearSiaData());
        }
      })
      .catch((e) => {
        console.log(e.message);
      });
  };
}
