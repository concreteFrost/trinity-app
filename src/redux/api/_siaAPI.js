// import axios from "axios";
// import { baseUrl } from "../../contexts/baseUrl";
// import { ClearSiaData, SetSiaData } from "../actions";
// import { SHOW_MODAL_MESSAGE } from "../types";
// import { GetDoorstaffPositions } from "./doorstaffAPI";

// export function GetSIAdataAPI(token,sia){

//     const headers = {
//         "Authorization": "Bearer " + token,
//         "Content-Type": "application/x-www-form-urlencoded"
//     }
//     return function(dispatch){
//         return  axios.get(`${baseUrl}/Activity/CheckMember/` + sia, {
//             headers: headers
//         }).then(async(res) =>{ 
//              if(res.data.message !== null ){
//                 dispatch({type:SHOW_MODAL_MESSAGE, data: res.data.message})
//                 dispatch(ClearSiaData())
//              }
//              else{     
//                 await dispatch(SetSiaData(res.data))
//                 await dispatch(GetDoorstaffPositions(headers))
//              }
         
//         }).catch(e=>console.log(e))
//     }
// }