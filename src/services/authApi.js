import axios from "axios";
import { baseUrl } from "../contexts/baseUrl";


export function GenerateUniqueReference() {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Auth/GenerateUniqueReference")
      .then((res) => {
        const generatedClientID = res.data.message;
        localStorage.setItem("clientID", generatedClientID);
        console.log("unique id reference was generated successfully");
        resolve(generatedClientID);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

// export function GetToken(username, clientID) {
//   return function (dispatch) {
//     return axios({
//       method: "POST",
//       url: `${baseUrl}/Login`,
//       data: {
//         username: username,
//         client_id: clientID,
//         grant_type: "password",
//       },
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//     })
//       .then((res) => {
//         localStorage.setItem("user", JSON.stringify(res.data));
//         dispatch(SetLoginDetails(res.data));
//       })
//       .catch((e) => {
//         dispatch(SetErrorOnLogin());
//         setTimeout(() => dispatch(ClearErrorOnLogin()), 7000);
//       });
//   };
// }

export function GetToken(username,clientID){
    return new Promise((resolve,reject)=>{
        axios({
            method: "POST",
            url: `${baseUrl}/Login`,
            data: {
              username: username,
              client_id: clientID,
              grant_type: "password",
            },
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            }
    }).then((res)=>{
        localStorage.setItem("user", JSON.stringify(res.data));
        resolve(res.data)
    }).catch((error)=>{reject(error)})
})}
