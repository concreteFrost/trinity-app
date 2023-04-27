import s from "./PubManagerAnalytics.module.scss"
import { SwitchType } from "./SwitchType/SwitchType"
import { DatesForm } from "./DatesForm/DatesForm"
import { Chart } from "../../../Shared/Chart/Chart"
import { useSelector } from "react-redux"

export const PubManagerAnalytics = () => {
    const analytics = useSelector(state => state.pubManagerAnalyticsReducer);
    console.log(analytics);
    return (
        <div className={s.container}>
            <div className={s.switch_type}><SwitchType></SwitchType></div>
            <div className={s.form}><DatesForm></DatesForm></div>
            <div className={s.chart}>
                {analytics.currentType === "S" ? <Chart activity={analytics.doorstaff} system={"S"}></Chart> : null}
                {analytics.currentType === "A" ? <Chart activity={analytics.costs} system={"A"}></Chart> : null}

            </div>
            <button className={s.print_button}>Print</button>

        </div>
    )
}