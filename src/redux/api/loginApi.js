
import { SetLoginDetails } from "../../redux/actions";
import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";

export function GetToken(username, clientID) {
    return function (dispatch) {
        return axios({
            method: "POST",
            url: `${baseUrl}/Login`,
            data: {
                username: username,
                client_id: clientID,
                grant_type: "password",
            },
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then((res) => {
                localStorage.setItem("user", JSON.stringify(res.data));
                dispatch(SetLoginDetails(res.data));
            })
            .catch((e) => {
                console.log(e)
            });
    }
}