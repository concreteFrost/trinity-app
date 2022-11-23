import s from "./CostsTable.module.scss"
import { useSelector } from "react-redux"


export const CostsTable = (props) => {



    return (
        <div className={s.container}>
            <div>
                <h4>DAILY {props.doorstaff.daily[0] ? props.doorstaff.daily[0].dateFrom.split('T')[0] : null}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>GROUP</th>
                            <th>COST(COUNT)</th>
                        </tr>
                    </thead>
                    <tbody>
                       {props.doorstaff.daily[0] ? props.doorstaff.daily.map((e)=>{return <tr key={Math.floor(Math.random() * 10000)}><td>{e.staffGroupName}</td><td>{e.actualDetail}</td></tr>}): null}
                    </tbody>
                </table>
            </div>

            <div>
                <h4>WEEKLY {props.doorstaff.weekly[0] ? props.doorstaff.weekly[0].dateFrom.split('T')[0] + "/" + props.doorstaff.weekly[0].dateTo.split('T')[0] : null}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>AVERAGE (avg per day)</th>
                            <th>COST(COUNT)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.doorstaff.weekly[0] ? props.doorstaff.weekly.map((e)=>{return <tr key={Math.floor(Math.random() * 10000)}><td>{e.averageValue}</td><td>{e.actualDetail}</td></tr>}): null}
                    </tbody>
                </table></div>

            <div>
                <h4>MONTHLY {props.doorstaff.monthly[0] ? props.doorstaff.monthly[0].dateFrom.split('T')[0] + "/" + props.doorstaff.monthly[0].dateTo.split('T')[0] : null}</h4>
                <table>
                    <thead>
                        <tr>
                            <th>AVERAGE (avg per day)</th>
                            <th>COST(COUNT)</th>
                        </tr>
                    </thead>
                    <tbody>
                    {props.doorstaff.monthly[0] ? props.doorstaff.monthly.map((e)=>{return <tr key={Math.floor(Math.random() * 10000)}><td>{e.averageValue}</td><td>{e.actualDetail}</td></tr>}): null}
                    </tbody>
                </table></div>

        </div>
    )
}
