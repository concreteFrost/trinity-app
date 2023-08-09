import s from "./DoorstaffTable.module.scss"

export const DoorstaffTable = (props)=>{
    return(
        <div className={s.doorstaff_info}>
                    <table><thead><tr>
                        <th>Name of Door Person</th>
                        <th>SIA Number</th>
                        <th>Position</th>
                        <th>Start/End Times</th>
                        <th>Hours</th>
                    </tr></thead>
                        <tbody>
                            <tr>
                                <td>{props.receiptData.staffName ? props.receiptData.staffName : null}</td>
                                <td>{props.receiptData.siaNumber ? props.receiptData.siaNumber : null}</td>
                                <td>{props.receiptData.jobRole ? props.receiptData.jobRole : null}</td>
                                <td><div>{props.receiptData.startTime ? props.formatDate(props.receiptData.startTime) : null}</div>
                                    <div>{props.receiptData.endTime ? props.formatDate(props.receiptData.endTime) : null}</div></td>
                                <td>{props.receiptData.hoursWorked ? props.receiptData.hoursWorked : null}</td>
                            </tr>
                        </tbody></table>
                </div>
    )
}