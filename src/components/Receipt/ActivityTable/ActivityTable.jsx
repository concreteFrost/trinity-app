import s from "./ActivityTable.module.scss"

export const ActivityTable = (props) => {
    return (<div className={s.activity_info}>
        <table><thead><tr>
            <th>Activity</th>
            <th>Recorded</th></tr></thead>
            <tbody>
                <tr>
                    <td>{props.receiptData.jobRole ? props.receiptData.jobRole : null}</td>
                    <td>{props.receiptData.startTime ? props.formatDate(props.receiptData.startTime) : null} </td>
                </tr>
            </tbody></table>
        <div className={s.to_fill_up_container}>
            <div className={s.to_fill_up}></div>
            <br />
            <div className={s.to_fill_up}></div>
        </div>

    </div>)
}