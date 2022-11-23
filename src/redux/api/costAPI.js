import axios from 'axios'

export function GetCosts(token, date) {
  let summaryCode = "D"
  return function (dispatch) {
    return GetByParameter(token, date, summaryCode)
      .then((res) => {
        dispatch({ type: "GET_DOORSTAFF_DAILY", data: res.data.summaryRecords.slice(0, 3) })
        dispatch({ type: "GET_COSTS_DAILY", data: res.data.summaryRecords.slice(3, res.data.summaryRecords.length) })
        summaryCode = "W"
      })
      .then(() => GetByParameter(token, date, summaryCode).then((res) => {
        dispatch({ type: "GET_DOORSTAFF_WEEKLY", data: res.data.summaryRecords.slice(0, 3) })
        dispatch({ type: "GET_COSTS_WEEKLY", data: res.data.summaryRecords.slice(3, res.data.summaryRecords.length) })
        summaryCode = "M"
      }))
      .then(() =>
        GetByParameter(token, date, summaryCode).then((res) => {
          dispatch({ type: "GET_DOORSTAFF_MONTHLY", data: res.data.summaryRecords.slice(0, 3) })
          dispatch({ type: "GET_COSTS_MONTHLY", data: res.data.summaryRecords.slice(3, res.data.summaryRecords.length) })
        })
      )

  };
}

function GetByParameter(token, date, summaryCode) {
  return axios
    .get(
      `https://testapi.etrinity.services/TrinityWebApi/api/Report/SummaryReview?system=C&workingDate=${date}&summaryCode=${summaryCode}`,
      {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
}

