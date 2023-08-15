import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";
import { GetSiaData } from "../actions";
import { SHOW_MODAL_MESSAGE } from "../types";

export function GetSIAdataAPI(token,sia){
    return function(dispatch){
        return  axios.get(`${baseUrl}/Activity/CheckMember/` + sia, {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res =>{ 
             if(res.data.message !== null ){
                dispatch({type:SHOW_MODAL_MESSAGE, data: res.data.message})
             }
            dispatch(GetSiaData(res.data))
        }).catch(e=>console.log(e))
    }
}