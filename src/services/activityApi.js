import axios from "axios";
import { baseUrl } from "../contexts/baseUrl";
import { reject } from "q";

export function GetSiaData(sia, token) {
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    axios
      .get(`${baseUrl}/Activity/CheckMember/` + sia, {
        headers: headers,
      })
      .then((res) => resolve(res.data))
      .catch((e) => reject(e));
  });
}

export function GetDoorstaffPositions(token) {
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    axios
      .get(`${baseUrl}/Activity/LookupPositions`, {
        headers: headers,
      })
      .then((res) => resolve(res.data.position))
      .catch((e) => reject(e));
  });
}

export function GetDoorstaffSupplier(positionId, token) {
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Activity/LookupSuppliers/` + positionId, {
        headers: headers,
      })
      .then((res) => {
        resolve(res.data.suppliers);
      })
      .catch((e) => reject(e));
  });
}

export function GetDoorstaffRates(token, position, supplier, date) {
  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  return new Promise((resolve, reject) => {
    axios
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
      .then((res) => resolve(res.data))
      .catch((e) => reject(e));
  });
}

export function SignOnMember(token, sia) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${baseUrl}/Activity/SignOnMember`,
      data: {
        staffId: sia.doorstaff.staffId,
        staffName: sia.doorstaff.firstName + " " + sia.doorstaff.lastName,
        positionId: parseInt(sia.position),
        position: sia.position.positionName,
        locationId: parseInt(token.locationId),
        supplierId: parseInt(sia.supplier.supplierId),
        supplierName: sia.supplier.supplierName,
        startTime: sia.date + "T" + sia.time,
        rateGroupId: sia.rate,
      },
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => resolve(res.data))
      .catch((e) => reject(e));
  });
}

export function SignOffMember(data, token, signOutTime) {
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
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${baseUrl}/Activity/SignOffMembers`,
      data: {
        staffLogin: toLogOut,
      },
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => resolve(res))
      .catch((e) => reject(e));
  });
}

export function CancelDoorstaff(data, token) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: `${baseUrl}/Activity/CancelActivity`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => reject(e));
  });
}

// export function CancelDoorStaff(data, token) {
//   return function (dispatch) {
//     return axios({
//       method: "POST",
//       url: `${baseUrl}/Activity/CancelActivity`,
//       headers: {
//         Authorization: "Bearer " + token,
//         "Content-Type": "application/json",
//       },
//       data: data,
//     })
//       .then(() => {
//         dispatch({ type: "HIDE_ACTION_MODAL" });
//         dispatch(GetDoorstaff(token));
//       })
//       .catch((e) => console.log(e));
//   };
// }

export function GetDoorstaffList(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Activity/LookupCurrentMembers`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        resolve(res.data.staffLogin);
      })
      .catch((e) => reject(e));
  });
}
