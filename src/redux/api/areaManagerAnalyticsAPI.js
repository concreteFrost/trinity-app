import { baseUrl } from "../../contexts/baseUrl";
import axios from "axios";

export function GetAreaManagerLocations(token) {
    return function (dispatch) {
        return axios
            .get(`${baseUrl}/Report/CriteriaLocationList`, {
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
            console.log('locations data',res.data.record)
                  dispatch({
                    type: "GET_AREA_MANAGER_ANALYTICS_LOCATIONS",
                    data: res.data.record,
                  })
                })
            .catch((e) => console.log(e));
    };
}