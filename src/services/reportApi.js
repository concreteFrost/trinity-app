import axios from "axios";
import { baseUrl } from "../contexts/baseUrl";

const headers = (token) => {
  return {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  };
};
//returns pdf results
export function GetTimesheetDataAPI(token, system, activityId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${baseUrl}/Report/Timesheet?system=${system}&activityId=${activityId}`,
        {
          headers: headers(token),
        }
      )
      .then((res) => {
        console.log("get timesheet data success", res);
        resolve(res);
      })
      .catch((e) => {
        console.log("get timesheet data error", e);
        reject(e);
      });
  });
}

//returns recent doorstaff
export function GetDoorstaffRecentAPI(user, fromDate, toDate, system) {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + "/Report/ActivityList?system=" + system,
      headers: headers(user.access_token),
      method: "POST",
      data: {
        dateFrom: fromDate,
        dateTo: toDate.split("T")[0] + "T23:59:999.000Z",
        locationId: parseInt(user.locationId),
        locationGroupId: 0,
        supplierId: 0,
        reference: 0,
        paymentStatusId: 0,
      },
    })
      .then((res) => {
        console.log("get activity recent success", res);
        resolve(res);
      })
      .catch((e) => {
        console.log("get activity recent error", e);
        reject(e);
      });
  });
}

//returns current or recent activities
export function GetActivityAPI(token, dateFrom, dateTo) {
  return new Promise((resolve, reject) => {
    axios({
      url: `${baseUrl}/Report/CostReview`,
      headers: headers(token),
      method: "POST",
      data: {
        dateFrom: dateFrom,
        dateTo: dateTo,
      },
    })
      .then((res) => {
        console.log("get cost review success", res)
        resolve(res)
      })
      .catch((e) => {
        console.log("get cost review error", e)
        reject(e)
      });
  });
}

//return searched staff in search component
export function GetSearchStaffAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Report/CriteriaStaffList`, {
        headers: headers(token),
      })
      .then((res) => {
        console.log("get search staff success", res);
        resolve(res);
      })
      .catch((e) => {
        console.log("get search staff error", e);
        reject(e);
      });
  });
}

//return searched supplier and group in search component
export function GetSearchSuppliersAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Report/CriteriaSupplierList`, {
        headers: headers(token),
      })
      .then((res) => {
        console.log("get search suppliers success", res)
        resolve(res);
      })
      .catch((e) => {
        console.log("get search suppliers error", e)
        reject(e);
      });
  });
}

export function GetSearchLocationsAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Report/CriteriaLocationList`, {
        headers: headers(token),
      })
      .then((res) => {
        console.log("get search locations success", res)
        resolve(res)
      })
      .catch((e) => {
        console.log("get search locations error", e)
        reject(e)
      });
  });
}

export function GetSearchLocationsGroupAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Report/CriteriaLocationGroupList`, {
        headers: headers(token),
      })
      .then((res) => {
        console.log("get search locations group success", res)
        resolve(res)
      })
      .catch((e) => {
        console.log("get search locations group error", e)
        reject(e)
      });
  });
}

export function GetSearchPaymentStatusAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Report/CriteriaPaymentStatusList`, {
        headers: headers(token),
      })
      .then((res) => {
        console.log("get search payment status success", res)
        resolve(res)
      })
      .catch((e) => {
        console.log("get search payment status error", e)
        reject(e)
      });
  });
}

export function GetSearchPaymentStatusGroupAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Report/CriteriaPaymentReportStatusList`, {
        headers: headers(token),
      })
      .then((res) => {
        console.log("get search payment status group success", res)
        resolve(res)
      })
      .catch((e) => {
        console.log("get search payment status group error", e)
        reject(e)
      });
  });
}

export function GetSearchedDataAPI(system, token, locationId, _data) {
  return new Promise((resolve, reject) => {
    axios(`${baseUrl}/Report/ActivityList?system=` + system, {
      method: "POST",
      headers: headers(token),
      data: {
        dateFrom: _data.dateFrom,
        dateTo: _data.dateTo,
        locationId: locationId,
        locationGroupId: 0,
        supplierId: 0,
        reference: 0,
        paymentStatusId: -1,
      },
    })
      .then((res) => {
        console.log("get activity list success", res)
        resolve(res)
      })
      .catch((e) => {
        console.log("get activity list error", e)
        reject(e)
      });
  });
}

export function GetSummaryReviewAPI(token, date, summaryCode) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${baseUrl}/Report/SummaryReview?system=C&workingDate=${date}&summaryCode=${summaryCode}`,
        {
          headers: headers(token),
        }
      )
      .then((res) => {
        console.log("get summary review success", res);
        resolve(res);
      })
      .catch((e) => {
        console.log("get summary review error", e);
        reject(e);
      });
  });
}
