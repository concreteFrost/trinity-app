import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";

export function GetDoorstaffSummary(token, date, summaryCode) {
  return function (dispatch) {
    return axios
      .get(
        `${baseUrl}/Report/SummaryReview?system=S&workingDate=${date}&summaryCode=${summaryCode}`,
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res);
        switch (summaryCode) {
          case "D":
            dispatch({
              type: "GET_DOORSTAFF_SUMMARY_DAILY",
              data: res.data.summaryRecords,
            });
            break;
          case "W":
            dispatch({
              type: "GET_DOORSTAFF_SUMMARY_WEEKLY",
              data: res.data.summaryRecords,
            });
            break;
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
}
