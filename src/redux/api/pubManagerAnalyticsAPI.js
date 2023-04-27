import axios from "axios"
import {baseUrl} from "../../contexts/baseUrl"


export function GetDoorstaffAnalytics(token, fromDate, toDate, user) {
    return function (dispatch) {
        const _data ={
            dateFrom: fromDate,
            dateTo: toDate.split("T")[0] + "T23:59:999.000Z",
            locationId: parseInt(user.locationId),
            locationGroupId: 0,
            supplierId: 0,
            reference: 0,
            paymentStatusId: 0
        }
        return axios({
            url: "https://testapi.etrinity.services/TrinityWebApi/api/Report/ActivityList?system=S",
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            method: "POST",
            data: _data
        })
            .then((res) => {
                dispatch({ type: "GET_DOORSTAFF_ANALYTICS", data: res.data.reportRecord })

            })
    }
}

export function GetCostsAnalytics(token,dateFrom,dateTo) {
    return function (dispatch) {
        return axios({
            url: `${baseUrl}/Report/CostReview`,
            headers: {
                Authorization: "Bearer " + token,
                "Content-Type": "application/json",
            },
            method: "POST",
            data: {
                dateFrom: dateFrom,
                dateTo: dateTo
            },
        })
            .then((res) => {
                dispatch({ type: "GET_COSTS_ANALYTICS", data: res.data.records })
            })

    }
}