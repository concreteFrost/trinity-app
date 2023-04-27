import s from "./AreaManagerAnalytics.module.scss"
import { LocationList } from "./LocationList/LocationList"
import { DatesForm } from "./DatesForm/DatesForm"
import { Chart } from "../../../Shared/Chart/Chart"
import { useSelector } from "react-redux"
import { useEffect } from "react"

export const AreaManagerAnalytics = () => {
    const location = useSelector(state => state.areaManagerAnalyticsReducer.currentLocation);

    useEffect(() => { }, [location])
    return (
        <div className={s.container}>
            <div className={s.switch_type}><LocationList></LocationList></div>
            <div className={s.form}><DatesForm></DatesForm></div>
            <div className={s.chart}>
                {/* <Chart activity={analytics.doorstaff} system={"S"}></Chart> */}
            </div>
            <div>{location.name}</div>
            <button className={s.print_button}>Print</button>

        </div>
    )
}