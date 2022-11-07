import s from "./CostsDoorstaff.module.scss"


export const CostsDoorstaff = (props) => (
    <div className={s.container}>

        <div>
            <h4>DAILY</h4>
            <table>
                <thead>
                    <tr>
                        <th>GROUP</th>
                        <th>COST(COUNT)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>DOOR PERSON</td>
                        <td>0.00 (0)</td></tr>
                    <tr><td>HEAD DOOR PERSON</td>
                        <td>0.00 (0)</td></tr>
                    <tr><td>STEWARD</td>
                        <td>0.00 (0)</td></tr>
                </tbody>
            </table>
        </div>

        <div>
            <h4>WEEKLY</h4>
            <table>
                <thead>
                    <tr>
                        <th>AVARAGE (avg per day)</th>
                        <th>COST(COUNT)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>0.00 (0.1)</td>
                        <td>0.00 (0)</td></tr>
                    <tr><td>0.00 (0.1)</td>
                        <td>0.00 (0)</td></tr>
                    <tr><td>0.00 (0.1)</td>
                        <td>0.00 (0)</td></tr>
                </tbody>
            </table></div>

        <div>
            <h4>MONTHLY</h4>
            <table>
                <thead>
                    <tr>
                        <th>AVARAGE (avg per day)</th>
                        <th>COST(COUNT)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>0.00 (0.1)</td>
                        <td>0.00 (0)</td></tr>
                    <tr><td>0.00 (0.1)</td>
                        <td>0.00 (0)</td></tr>
                    <tr><td>0.00 (0.1)</td>
                        <td>0.00 (0)</td></tr>
                </tbody>
            </table></div>

    </div>
);
