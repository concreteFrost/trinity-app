import axios from 'axios'

export function GetCosts(token, date, system) {
    let summaryCode = "D"
    return function (dispatch) {
        return GetByParameter(token, date, summaryCode, system)
            .then((res) => {
                switch (system) {
                    case "S":
                        dispatch({ type: "GET_DOORSTAFF_DAILY", data: res.data.summaryRecords })
                        break;
                    case "A":
                        dispatch({ type: "GET_COSTS_DAILY", data: res.data.summaryRecords })
                        break;
                }
                summaryCode = "W"
            })
            .then(() => GetByParameter(token, date, summaryCode, system).then((res) => {
                switch (system) {
                    case "S":
                        dispatch({ type: "GET_DOORSTAFF_WEEKLY", data: res.data.summaryRecords })
                        break;
                    case "A":
                        dispatch({ type: "GET_COSTS_WEEKLY", data: res.data.summaryRecords })
                        break;
                }
                summaryCode = "M"
            }))
            .then(() =>
                GetByParameter(token, date, summaryCode, system).then((res) => {
                    switch (system) {
                        case "S":
                            dispatch({ type: "GET_DOORSTAFF_MONTHLY", data: res.data.summaryRecords })
                            break;
                        case "A":
                            dispatch({ type: "GET_COSTS_MONTHLY", data: res.data.summaryRecords })
                            break;
                    }
                })
            )

    };
}

function GetByParameter(token, date, summaryCode, system) {
    return axios
        .get(
            `https://testapi.etrinity.services/TrinityWebApi/api/Report/SummaryReview?system=${system}&workingDate=${date}&summaryCode=${summaryCode}`,
            {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        )
}
