// import { baseUrl } from "../../contexts/baseUrl";
// import { GET_AREA_MANAGER_ANALYTICS_COSTS, GET_AREA_MANAGER_ANALYTICS_DOORSTAFF, GET_AREA_MANAGER_ANALYTICS_LOCATIONS } from "../types";
// import axios from "axios";

// export function GetAreaManagerLocations(token) {
//     return function (dispatch) {
//         return axios
//             .get(`${baseUrl}/Report/CriteriaLocationList`, {
//                 headers: {
//                     Authorization: "Bearer " + token,
//                     "Content-Type": "application/json",
//                 },
//             })
//             .then((res) => {

//                 dispatch({
//                     type: GET_AREA_MANAGER_ANALYTICS_LOCATIONS,
//                     data: res.data.record,
//                 })
//             })
//             .catch((e) => console.log(e));
//     };
// }
// export function GetAreaManagerAnalytics(system, user, analytics) {
//     return function (dispatch) {
//         const requests = analytics.locations
//             .filter((location) => location.isChecked)
//             .map((location) =>
//                 axios({
//                     url: baseUrl + "/Report/ActivityList?system=" + system,
//                     headers: {
//                         Authorization: "Bearer " + user.access_token,
//                         "Content-Type": "application/json",
//                     },
//                     method: "POST",
//                     data: {
//                         dateFrom: analytics.dateFrom,
//                         dateTo: analytics.dateTo,
//                         locationId: location.id,
//                         locationGroupId: 0,
//                         supplierId: 0,
//                         reference: 0,
//                         paymentStatusId: -1,
//                     },
//                 }).then((res) => {
//                     return res.data.reportRecord;
//                 })
//             );

//         return Promise.all(requests)
//             .then((results) => {
//                 const concatenatedResults = results.reduce((acc, curr) => acc.concat(curr), []);
//                 switch (system) {
//                     case "A":
//                         dispatch({ type: GET_AREA_MANAGER_ANALYTICS_COSTS, data: concatenatedResults });
//                         break;
//                     case "S":
//                         dispatch({ type: GET_AREA_MANAGER_ANALYTICS_DOORSTAFF, data: concatenatedResults });
//                         break;
//                 }
//             })
//             .catch((error) => {
//                 console.error("Error:", error);
//             });
//     };
// }
