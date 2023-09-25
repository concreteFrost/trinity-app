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

    }).then(res => resolve(res)).catch(e => reject(e))
  })
}

export function GetSummaryReviewAPI(token, date, summaryCode) {
  return new Promise((resolve, reject) => {
    axios.get(
      `${baseUrl}/Report/SummaryReview?system=C&workingDate=${date}&summaryCode=${summaryCode}`,
      {
        headers: headers(token)
      }).then((res) => {
        console.log('get summary review success', res)
        resolve(res)
      }).catch((e) => {
        console.log('get summary review error', e)
        reject(e)
      })
  })
}

// export function 


