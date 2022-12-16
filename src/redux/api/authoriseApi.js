import axios from "axios";

export function GetAuthorise(system,token){
    return function(dispatch){
        return  axios.get('https://testapi.etrinity.services/TrinityWebApi/api/AreaManager/AuthorisePaymentList?system=' + system,{
                headers: {
                     Authorization: "Bearer " + token,
                     "Content-Type": "application/json",
                   },
               
           }).then(res=>{ 
            switch(system){
                case "S":
                    dispatch({type:"GET_AUTHORISE_DOORSTAFF", data:res.data.reportRecord})
                case "A":
                    dispatch({type:"GET_AUTHORISE_COSTS", data:res.data.reportRecord})
            }
           
        })
        
    }
}

export function ApproveActivity(system,token,element){
    return function(dispatch){
        return  axios(`https://testapi.etrinity.services/TrinityWebApi/api/AreaManager/ApproveActivity?system=${system}&activityId=${element.activityId}`, {
            headers: {
                 Authorization: "Bearer " + token,
                 "Content-Type": "application/json",
            },
            method: "POST"
       }).then(res => dispatch(GetAuthorise(system, token))) 
    }
}

export function ViewNote(token,system,activityId){
    return function(dispatch){
        return  axios.get(`https://testapi.etrinity.services/TrinityWebApi/api/AreaManager/GetNotes/${system}/${activityId}`,{
            headers: {
                 Authorization: "Bearer " + token,
                 "Content-Type": "application/json",
            },
       }).then(res=>console.log(res))
    }
}
