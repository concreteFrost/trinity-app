// import axios from "axios";
// import { baseUrl } from "../../contexts/baseUrl";
// import {
//   GET_COSTS_DOORSTAFF_DAILY,
//   GET_COSTS_DOORSTAFF_WEEKLY,
//   GET_COSTS_DOORSTAFF_MONTHLY,
//   GET_COSTS_ACTIVITY_DAILY,
//   GET_COSTS_ACTIVITY_WEEKLY,
//   GET_COSTS_ACTIVITY_MONTHLY,
// } from "../types";

// export function GetCosts(token, date) {
//   let summaryCode = "D";
//   return function (dispatch) {
//     return GetByParameter(token, date, summaryCode)
//       .then((res) => {
//         dispatch({
//           type: GET_COSTS_DOORSTAFF_DAILY,
//           data: res.data.summaryRecords.slice(0, 3),
//         });

//         dispatch({
//           type: GET_COSTS_ACTIVITY_DAILY,
//           data: res.data.summaryRecords.slice(3, res.data.summaryRecords.length),
//         });
//         summaryCode = "W";
//       })
//       .then(() =>
//         GetByParameter(token, date, summaryCode).then((res) => {
//           dispatch({
//             type: GET_COSTS_DOORSTAFF_WEEKLY,
//             data: res.data.summaryRecords.slice(0, 3),
//           });
//           dispatch({
//             type: GET_COSTS_ACTIVITY_WEEKLY,
//             data: res.data.summaryRecords.slice(3, res.data.summaryRecords.length),
//           });

//           summaryCode = "M";
//         })
//       )
//       .then(() =>
//         GetByParameter(token, date, summaryCode).then((res) => {
//           dispatch({
//             type: GET_COSTS_DOORSTAFF_MONTHLY,
//             data: res.data.summaryRecords.slice(0, 3),
//           });

//           dispatch({
//             type: GET_COSTS_ACTIVITY_MONTHLY,
//             data: res.data.summaryRecords.slice(3, res.data.summaryRecords.length),
//           });
//         })
//       );
//   };
// }

// function GetByParameter(token, date, summaryCode) {
//   return axios.get(
//     `${baseUrl}/Report/SummaryReview?system=C&workingDate=${date}&summaryCode=${summaryCode}`,
//     {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     }
//   );
// }
