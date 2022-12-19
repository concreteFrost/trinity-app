import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";


export function ViewDisputeNote(token,system,activityID) {
    return function (dispatch) {
      return axios.get(baseUrl + `/Disputed/GetNotes/${system}/${activityID}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }).then(res => {
        console.log(res.data.record[0].name)
        dispatch({ type: "SHOW_MODAL_MESSAGE", data: res.data.record[0].name })
      })
    }
  }
  