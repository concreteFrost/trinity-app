import axios from "axios";
import { baseUrl } from "../contexts/baseUrl";


export function GenerateUniqueReference() {
  return new Promise((resolve, reject) => {
    axios
      .get(baseUrl + "/Auth/GenerateUniqueReference")
      .then((res) => {
        const generatedClientID = res.data.message;
        localStorage.setItem("clientID", generatedClientID);
        console.log("get unique id success",res)
        resolve(generatedClientID);
      })
      .catch((error) => {
        console.log("get unique id error",error)
        reject(error);
      });
  });
}


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
      console.log("get token success",res)
        localStorage.setItem("user", JSON.stringify(res.data));
        resolve(res.data)
    }).catch((error)=>{
      console.log("get token error",error)
      reject(error)})
})}
