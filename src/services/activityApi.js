import axios from "axios";
import { baseUrl } from "../contexts/baseUrl";

export function GetSiaDataAPI(sia, token) {
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    axios
      .get(`${baseUrl}/Activity/CheckMember/` + sia, {
        headers: headers,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function GetDoorstaffPositionsAPI(token) {
  return new Promise((resolve, reject) => {
    const headers = {
      Authorization: "Bearer " + token,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    axios
      .get(`${baseUrl}/Activity/LookupPositions`, {
        headers: headers,
      })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function GetDoorstaffSupplierAPI(positionId, token) {
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
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function GetDoorstaffRatesAPI(token, position, supplier, date) {
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
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function SignOnMemberAPI(token, sia) {
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
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function SignOffMemberAPI(data, token, signOutTime) {
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
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

export function CancelDoorstaffAPI(data, token) {
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
      .catch((e) => {
        reject(e);
      });
  });
}

export function GetDoorstaffListAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Activity/LookupCurrentMembers`, {
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

//ACTIVITY

export function GetActivityTypeOptAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/CentralCosts/LookupCostGroups`, {
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

export function GetActivitySupplierOptAPI(token, activityId) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/CentralCosts/LookupSuppliers/` + activityId, {
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

export function GetRateAPI(token, data) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}/CentralCosts/LookupRate`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      data: {
        costGroupId: data.activityID,
        supplierId: data.supplierID,
        costEntryTime: data.time,
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

export function SubmitActivityAPI(token, _data) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}/CentralCosts/CostEntry`,
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      data: _data,
    })
      .then((res) => {
        resolve(res);
      })
      .catch((e) => {
        reject(e);
      });
  });
}
