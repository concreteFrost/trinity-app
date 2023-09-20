import axios from "axios";
import { baseUrl } from "../contexts/baseUrl";

const headers = (token) => {
  return {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  }
}
//returns pdf results
export function GetTimesheetDataAPI(token, system, activityId) {
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${baseUrl}/Report/Timesheet?system=${system}&activityId=${activityId}`,
        {
          headers: headers(token)
        }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((e) => {
        reject(e);
      });
  });
}

//returns recent doorstaff
export function GetDoorstaffRecentAPI(user, fromDate, toDate) {
  return new Promise((resolve, reject) => {
    axios({
      url: baseUrl + "/Report/ActivityList?system=S",
      headers: headers(user.access_token),
      method: "POST",
      data: {
        dateFrom: fromDate,
        dateTo: toDate.split("T")[0] + "T23:59:999.000Z",
        locationId: parseInt(user.locationId),
        locationGroupId: 0,
        supplierId: 0,
        reference: 0,
        paymentStatusId: 0
      },
    })
      .then((res) => { resolve(res) })
      .catch(e => reject(e))
  })
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
        dateTo: dateTo
      }
    }).then(res => resolve(res)).catch(e => reject(e));
  })
}

//return searched staff in search component
export function GetSearchStaffAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Report/CriteriaStaffList`, {
        headers: headers(token),
      }).then((res) => resolve(res)).catch((e) => reject(e))
  })
}

//return searched supplier and group in search component
export function GetSearchSuppliersAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Report/CriteriaSupplierList`, {
        headers: headers(token),
      }).then((res) => { resolve(res) }).catch((e) => {
        reject(e);
      })
  })
}

export function GetSearchLocationsAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Report/CriteriaLocationList`, {
        headers: headers(token),
      }).then(res => resolve(res)).catch(e => reject(e))
  })
}

export function GetSearchLocationsGroupAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Report/CriteriaLocationGroupList`, {
        headers: headers(token)
      }).then(res => resolve(res)).catch(e => reject(e))
  })
}

export function GetSearchPaymentStatusAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Report/CriteriaPaymentStatusList`, {
        headers: headers(token),
      }).then(res => resolve(res)).catch(e => reject(e))
  })
}

// export function GetSearchPaymentStatus(token) {
//   return function (dispatch) {
//     return axios
//       .get(`${baseUrl}/Report/CriteriaPaymentStatusList`, {
//         headers: {
//           Authorization: "Bearer " + token,
//           "Content-Type": "application/json",
//         },
//       })
//       .then((res) =>
//         dispatch({
//           type: GET_ACTIVITIES_SEARCH_PAYMENT_STATUS_OPT,
//           data: res.data.record,
//         })
//       )
//       .catch((e) => console.log(e));
//   };
// }

