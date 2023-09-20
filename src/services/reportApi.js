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

export function GetSearchPaymentStatusGroupAPI(token) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${baseUrl}/Report/CriteriaPaymentReportStatusList`, {
        headers: headers(token)
      }).then(res => resolve(res)).catch(e => reject(e))
  })
}

export function GetSearchedDataAPI(system, token, _data) {
  return new Promise((resolve, reject) => {
    axios(`${baseUrl}/Report/ActivityList?system=` + system, {
      method: "POST",
      headers: headers(token),
      data: _data,

    }).then(res => resolve(res)).catch(e => reject(e))
  })
}

// export function GetSearchedData(system, token, _data) {
//   return function (dispatch) {
//     return axios(`${baseUrl}/Report/ActivityList?system=` + system, {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer " + token,
//         "Content-Type": "application/json",
//       },
//       data: _data,
//     }).then((res) => {
//       switch (system) {
//         case "S":
//           dispatch({
//             type: "GET_SEARCHED_ACTIVITES",
//             data: res.data.reportRecord,
//           });
//           break;

//         case "A":
//           dispatch({
//             type: "GET_SEARCHED_COSTS",
//             data: res.data.reportRecord,
//           });
//           break;
//       }
//       if (res.data.success === false) {
//         dispatch({ type: SHOW_MODAL_MESSAGE, data: res.data.message });
//       }
//     });
//   };
// }
