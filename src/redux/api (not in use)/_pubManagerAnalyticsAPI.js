// import axios from "axios"
// import {baseUrl} from "../../contexts/baseUrl"


// export function GetAnalytics(token, fromDate, toDate, user,system) {
//     return function (dispatch) {
//         const _data ={
//             dateFrom: fromDate,
//             dateTo: toDate.split("T")[0] + "T23:59:999.000Z",
//             locationId: parseInt(user.locationId),
//             locationGroupId: 0,
//             supplierId: 0,
//             reference: 0,
//             paymentStatusId: 0
//         }
//         return axios({
//             url: baseUrl+ "/Report/ActivityList?system=" + system,
//             headers: {
//                 Authorization: "Bearer " + token,
//                 "Content-Type": "application/json",
//             },
//             method: "POST",
//             data: _data
//         })
//             .then((res) => {

//                 switch(system){
//                     case "S":
//                         dispatch({ type: "GET_DOORSTAFF_ANALYTICS", data: res.data.reportRecord })
//                         break;
//                     case "A":
//                         dispatch({ type: "GET_COSTS_ANALYTICS", data: res.data.reportRecord })
//                         break;                
//                 }
            
//             })
//     }
// }
