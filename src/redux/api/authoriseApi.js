import axios from "axios";

export function GetAuthorise(system, token) {
    return function (dispatch) {
        return axios.get('https://testapi.etrinity.services/TrinityWebApi/api/AreaManager/AuthorisePaymentList?system=' + system, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },

        }).then(res => {
            switch (system) {
                case "S":
                    dispatch({ type: "GET_AUTHORISE_DOORSTAFF", data: res.data.reportRecord })
                    break;
                case "A":
                    dispatch({ type: "GET_AUTHORISE_COSTS", data: res.data.reportRecord })
                    break;
            }

        })

    }
}

export function ApproveActivity(system, token, element) {
    return function (dispatch) {
        return axios(`https://testapi.etrinity.services/TrinityWebApi/api/AreaManager/ApproveActivity?system=${system}&paymentAuthId=${element.paymentAuthId}`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            method: "POST"
        }).then(res => dispatch(GetAuthorise(system, token)))
    }
}

export function ViewNote(token,activityId) {
    return function (dispatch) {
        return axios.get(`https://testapi.etrinity.services/TrinityWebApi/api/CentralCosts/GetNote/${activityId}`, {
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
        }).then(res => {
            if (res.data.message.length > 0)
                dispatch({ type: "SHOW_MODAL_MESSAGE", data: res.data.message })

            console.log(res.data)
        })
    }
}
