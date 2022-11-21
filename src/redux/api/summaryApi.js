import axios from 'axios'

export function GetDoorstaffSummary(token,date,summaryCode) {
    return function (dispatch) {
      return axios
        .get(
          `https://testapi.etrinity.services/TrinityWebApi/api/Report/SummaryReview?workingDate=${date}&summaryCode=${summaryCode}`,
          {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )
        .then((res) => {
          
          switch(summaryCode){
            case "D": dispatch({type:"GET_DOORSTAFF_SUMMARY_DAILY", data:res.data.summaryRecords})
            break;
            case "W": dispatch({type:"GET_DOORSTAFF_SUMMARY_WEEKLY", data:res.data.summaryRecords})
          }
        })
        .catch((e) => {
          console.log(e);
        });
    };
  }