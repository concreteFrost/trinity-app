import axios from "axios";
import { GetSiaData } from "../actions";

export function GetSIAdataAPI(token,sia){
    return function(dispatch){
        return  axios.get('https://testapi.etrinity.services/TrinityWebAPI/api/Activity/CheckMember/' + sia, {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res =>{ 
            console.log(res)
            dispatch(GetSiaData(res.data))
        }).catch(e=>console.log(e))
    }
}