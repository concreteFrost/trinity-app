import { baseUrl } from "../../contexts/baseUrl";
import { GET_AREA_MANAGER_ANALYTICS_LOCATIONS } from "../types";
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

                dispatch({
                    type: GET_AREA_MANAGER_ANALYTICS_LOCATIONS,
                    data: res.data.record,
                })
            })
            .catch((e) => console.log(e));
    };
}