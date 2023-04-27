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
            .then((res) => console.log(res, 'res isssss')
                //   dispatch({
                //     type: GET_HISTORY_AUDIT_LOCATIONS_OPT,
                //     data: res.data.record,
                //   })
            )
            .catch((e) => console.log(e));
    };
}