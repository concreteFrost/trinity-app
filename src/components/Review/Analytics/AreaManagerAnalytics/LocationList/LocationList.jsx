import s from "./LocationList.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { GetAreaManagerLocations } from "../../../../../redux/api/areaManagerAnalyticsAPI";
import { baseUrl } from "../../../../../contexts/baseUrl.js";
import axios from "axios"


export const LocationList = () => {

    const dispatch = useDispatch();
    const locationsList = useSelector(state => state.areaManagerAnalyticsReducer.locations);
    const user = useSelector(state => state.userReducer.user);

    useEffect(() => {
        axios
            .get(`${baseUrl}/Report/CriteriaLocationGroupList`, {
                headers: {
                    Authorization: "Bearer " + user.access_token,
                    "Content-Type": "application/json",
                },
            })
            .then((res) => {
                dispatch({ type: "GET_AREA_MANAGER_ANALYTICS_LOCATIONS", data: res.data.record })
                dispatch({ type: "SET_AREA_MANAGER_ANALYTICS_CURRENT_LOCATION", data: { id: res.data.record[0].id, name: res.data.record[0].name } })
            }
            )
            .catch((e) => console.log(e));
    }, [])

    function SetCurrentLocation(e) {
        const name = e.target[e.target.selectedIndex].text;
        const id = e.target.value;
        dispatch({ type: "SET_AREA_MANAGER_ANALYTICS_CURRENT_LOCATION", data: { id: id, name: name } })
    }

    return (
        <div className={s.location}>
            <label htmlFor="select-doorstaff">LOCATION</label>
            <select
                name="select-type"
                id="selecet-type"
                onChange={SetCurrentLocation}
            >
                {locationsList.length > 0 ? locationsList.map((e) => { return <option key={e.id} value={e.id}>{e.name}</option> }) : null}
            </select>
        </div>
    )
}