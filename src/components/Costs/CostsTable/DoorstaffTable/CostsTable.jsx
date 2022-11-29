import s from "./CostsTable.module.scss"
import { useSelector } from "react-redux"
import { v4 as uuid } from 'uuid'

export const CostsTable = (props) => {

    return (
        <div className={s.container}>
            <div>
                <h4>DAILY {props.data.daily.length>0 ? props.data.daily[0].dateFrom.split('T')[0] : null}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>GROUP</th>
                            <th>COST(COUNT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.daily.length>0 ? props.data.daily.map((e) => { return <tr key={uuid()}><td>{e.staffGroupName}</td><td>{e.actualDetail}</td></tr> }) : null}
                    </tbody>
                </table>
            </div>

            <div>
                <h4>WEEKLY {props.data.weekly.length>0 ? props.data.weekly[0].dateFrom.split('T')[0] + "/" + props.data.weekly[0].dateTo.split('T')[0] : null}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>AVERAGE (avg per day)</th>
                            <th>COST(COUNT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.weekly.length>0 ? props.data.weekly.map((e) => { return <tr key={uuid()}><td>{e.averageValue}</td><td>{e.actualDetail}</td></tr> }) : null}
                    </tbody>
                </table></div>

            <div>
                <h4>MONTHLY {props.data.monthly.length>0 ? props.data.monthly[0].dateFrom.split('T')[0] + "/" + props.data.monthly[0].dateTo.split('T')[0] : null}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>AVERAGE (avg per day)</th>
                            <th>COST(COUNT)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.data.monthly.length>0 ? props.data.monthly.map((e) => { return <tr key={uuid()}><td>{e.averageValue}</td><td>{e.actualDetail}</td></tr> }) : null}
                    </tbody>
                </table></div>

        </div>
    )
}
