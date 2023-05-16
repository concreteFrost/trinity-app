import { useSelector } from "react-redux"
import s from "./Total.module.scss"

export const Total = () => {

    const analytics = useSelector(state => state.areaManagerAnalyticsReducer)

    const doorstaffTotal = parseFloat(analytics.doorstaff.reduce((a, b) => a + b.cost, 0)).toFixed(2)
    const costsTotal = parseFloat(analytics.costs.reduce((a, b) => a + b.cost, 0)).toFixed(2)
    const total = parseFloat((doorstaffTotal) + parseFloat(costsTotal)).toFixed(2);

    return (
        <div>
            <h2>IN TOTAL</h2>
            <div className={s.grid}>
                <div className={s.dates}>
                    <h2>From : <span>{analytics.dateFrom}</span> to : <span>{analytics.dateTo}</span></h2>
                </div>
                <div className={s.doorstaff}>
                    <h3>Doorstaff:</h3>
                    <p>{doorstaffTotal}</p>
                </div>
                <div className={s.cost}>
                    <h3>Costs:</h3>
                    <p>{costsTotal}</p>
                </div>
                <div className={s.combined}>
                    <h3>Combined:</h3>
                    <p>{total}</p>
                </div>
            </div>
        </div>
    )
}