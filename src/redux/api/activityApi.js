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
        dispatch({ type: "GET_ACTIVITY_TYPE_OPT", data: res.data.record });
        dispatch({ type: "SET_ACTIVITY_TYPE", data: res.data.record[0].id });
        dispatch(GetSupplierOpt(token, res.data.record[0].id));
      })
      .catch((e) => {});
  };
}

export function GetSupplierOpt(token, activityId) {
  return function (dispatch) {
    return axios
      .get(
        `https://testapi.etrinity.services/TrinityWebAPI/api/CentralCosts/LookupSuppliers/` +
          activityId,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        dispatch({ type: "GET_SUPPLIER_OPT", data: res.data.suppliers }); 
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export function GetRate(token, data) {
  return function (dispatch) {
    return axios({
      url: "https://testapi.etrinity.services/TrinityWebApi/api/CentralCosts/LookupRate",
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
        console.log('result of get rate',res)
        if(res.data.message){
          dispatch({type:"SHOW_MODAL_MESSAGE", data: res.data.message})
        }
        else{
        dispatch({type:"GET_RATE", data: res.data})
        dispatch({type:"SET_ACTIVITY_SUPPLIER", data : data.supplierID})
        dispatch({type:"SET_ACTIVITY_COST_VALUE", data : res.data.costValue})
        }
        
      })
      .catch((e) => {
        console.log(e);
      });
  };
}

export function SubmitActivity(token,_data){
  return function (dispatch){
    return   axios({
      url: "https://testapi.etrinity.services/TrinityWebApi/api/CentralCosts/CostEntry",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      data: _data,
    })
      .then((res) => {
          dispatch({ type: "CLEAR_ACTIVITY" });
          dispatch(GetActivityTypeOpt(token));
        
      })
      .catch((e) => {
        console.log(e)
        dispatch({type:"SHOW_MODAL_MESSAGE", data: e.message})
      });
  }
}
