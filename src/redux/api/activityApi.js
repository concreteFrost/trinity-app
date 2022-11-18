import axios from "axios";

export function GetActivityTypeOpt(token) {
    return function (dispatch) {
      return axios
        .get(
          `https://testapi.etrinity.services/TrinityWebAPI/api/CentralCosts/LookupCostGroups`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
            dispatch({type:"SET_ACTIVITY_TYPE_OPT", data : res.data.record})
            dispatch({type:"SET_ACTIVITY", data : res.data.record[0]})
            dispatch(GetSupplierOpt(token, res.data.record[0].id))
        })
        .catch((e) => {
         
        });
    };
  }

export function GetSupplierOpt(token, activityId){

    return function (dispatch) {
        return axios
          .get(
            `https://testapi.etrinity.services/TrinityWebAPI/api/CentralCosts/LookupSuppliers/` + activityId,
            {
              headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          )
          .then((res) => {
            dispatch({type:"SET_SUPPLIER_OPT", data : res.data.suppliers})
          })
          .catch((e) => {
            console.log(e);
          });
      };
}

// export function GetRate(token, data){

//     return function (dispatch) {
//         return axios
//           .get(
//             "https://testapi.etrinity.services/TrinityWebApi/api/CentralCosts/LookupRate",
         
//             {
//               headers: {
//                 Authorization: "Bearer " + token,
//                 "Content-Type": "application/json",
//               },
//               body:{
//                 costGroupId : parseInt(data.activityID),
//                 supplierId : parseInt(data.supplierID),
//                 costEntryTime: new Date().toLocaleDateString("en-US")
//               }
//             }

//           )
//           .then((res) => {
//             console.log(data)
//             console.log(res)
//           })
//           .catch((e) => {
//             console.log(parseInt(data.activityID))
//             console.log(parseInt(data.supplierID))
//             console.log(new Date().toLocaleDateString("en-US"))
//           });
//       };
// }
