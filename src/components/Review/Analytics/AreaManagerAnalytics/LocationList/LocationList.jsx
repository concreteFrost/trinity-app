import s from "./LocationList.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react";
import { GetSearchLocationsAPI } from "../../../../../services/reportApi";
import { GetAreaManagerAnalyticsLocations, ToggleAreaManagerAnalyticsLocations } from "../../../../../redux/actions/analyticsActions";

export const LocationList = (props) => {

    const dispatch = useDispatch();
    const locationsList = useSelector(state => state.areaManagerAnalyticsReducer.locations);
    const user = useSelector(state => state.userReducer.user);

    useEffect(() => {
        GetSearchLocationsAPI(user.access_token).then((res) => {
            dispatch(GetAreaManagerAnalyticsLocations(res.data.record))
        });
    }, [])

    return (
        <div className={s.location}>
            <label htmlFor="select-doorstaff">LOCATIONS</label>
            <div className={s.dropdown}>
                <button onClick={props.toggleShowLocations} className={s.dropdown_button}>{props.showDropdown ? "Close" : "Show"}</button>
                {props.showDropdown ? <div className={s.dropdown_content}>
                    {locationsList.length > 0 ? locationsList.map((e) => {
                        return <label key={e.id} ><input type="checkbox" name={e.name} value={e.id} checked={e.isChecked} onChange={() => { dispatch(ToggleAreaManagerAnalyticsLocations(e.id)) }}
                        />{e.name} </label>
                    }) : null}
                </div> : null}
            </div>
        </div>
    )
}