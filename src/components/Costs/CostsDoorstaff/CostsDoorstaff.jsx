import s from "./CostsDoorstaff.module.scss"
import { useSelector } from "react-redux"


export const CostsDoorstaff = () => {

    const doorstaff = useSelector(state => state.costsReducer.doorstaff)
    console.log(doorstaff.monthly)

    return (
        <div className={s.container}>
            <div>
                <h4>DAILY {doorstaff.daily[0] ? doorstaff.daily[0].dateFrom.split('T')[0] : null}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>GROUP</th>
                            <th>COST(COUNT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>DOOR PERSON</td>
                            <td>{doorstaff.daily[0] ? doorstaff.daily[0].actualDetail : '0'}</td></tr>
                        <tr><td>HEAD DOOR PERSON</td>
                            <td>{doorstaff.daily[1] ? doorstaff.daily[1].actualDetail : '0'}</td></tr>
                        <tr><td>STEWARD</td>
                            <td>{doorstaff.daily[1] ? doorstaff.daily[2].actualDetail : '0'}</td></tr>
                    </tbody>
                </table>
            </div>

            <div>
                <h4>WEEKLY {doorstaff.weekly[0] ? doorstaff.weekly[0].dateFrom.split('T')[0] + "/" + doorstaff.weekly[0].dateTo.split('T')[0] : null}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>AVERAGE (avg per day)</th>
                            <th>COST(COUNT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>{doorstaff.weekly[0] ? doorstaff.weekly[0].averageDetail : '0'}</td>
                            <td>{doorstaff.weekly[0] ? doorstaff.weekly[0].actualDetail : '0'}</td></tr>
                        <tr><td>{doorstaff.weekly[1] ? doorstaff.weekly[1].averageDetail : '0'}</td>
                            <td>{doorstaff.weekly[1] ? doorstaff.weekly[1].actualDetail : '0'}</td></tr>
                        <tr><td>{doorstaff.weekly[2] ? doorstaff.weekly[2].averageDetail : '0'}</td>
                            <td>{doorstaff.weekly[2] ? doorstaff.weekly[2].actualDetail : '0'}</td></tr>
                    </tbody>
                </table></div>

            <div>
                <h4>MONTHLY {doorstaff.monthly[0] ? doorstaff.monthly[0].dateFrom.split('T')[0] + "/" + doorstaff.monthly[0].dateTo.split('T')[0] : null}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>AVERAGE (avg per day)</th>
                            <th>COST(COUNT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>{doorstaff.monthly[0] ? doorstaff.monthly[0].averageDetail : '0'}</td>
                            <td>{doorstaff.monthly[0] ? doorstaff.monthly[0].actualDetail : '0'}</td></tr>
                        <tr><td>{doorstaff.monthly[1] ? doorstaff.monthly[1].averageDetail : '0'}</td>
                            <td>{doorstaff.monthly[1] ? doorstaff.monthly[1].actualDetail : '0'}</td></tr>
                        <tr><td>{doorstaff.monthly[2] ? doorstaff.monthly[2].averageDetail : '0'}</td>
                            <td>{doorstaff.monthly[2] ? doorstaff.monthly[2].actualDetail : '0'}</td></tr>
                    </tbody>
                </table></div>

        </div>
    )
}
