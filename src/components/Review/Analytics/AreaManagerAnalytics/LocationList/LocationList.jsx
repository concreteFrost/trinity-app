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
        dispatch(GetAreaManagerLocations(user.access_token))
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