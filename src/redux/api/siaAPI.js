import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";
import { GetSiaData } from "../actions";

export function GetSIAdataAPI(token,sia){
    return function(dispatch){
        return  axios.get(`${baseUrl}/Activity/CheckMember/` + sia, {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res =>{ 
          
            dispatch(GetSiaData(res.data))
        }).catch(e=>console.log(e))
    }
}