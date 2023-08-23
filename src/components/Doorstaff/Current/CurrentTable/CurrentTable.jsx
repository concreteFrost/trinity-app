import s from "./CurrentTable.module.scss";
import {
    SET_DOORSTAFF_SIGNOUT_DATE,
    SET_DOORSTAFF_SIGNOUT_TIME,
    TOGGLE_DOORSTAFF_TO_SIGN_OUT,
} from "../../../../redux/types";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { DeleteDoorStaff } from "../../../../redux/api/doorstaffAPI";


export const CurrentTable = (props) => {
    const dispatch = useDispatch();

    function SingleSignOff(e) {
        e.preventDefault()
        if (e.target[0].value && e.target[1].value) {
            const data = JSON.parse(e.target.dataset.staff);
            const signOutTIme = e.target[1].value + "T" + e.target[0].value
            dispatch(DeleteDoorStaff(data, props.token.access_token, signOutTIme));
        }
    }

    function showCancelModal(activityIdToCancel) {
        dispatch({ type: "SHOW_CANCEL_MODAL", data: activityIdToCancel })
    }

    return (
        <div className={s.wrapper}>
            <table className={s.doorstaff_table}>
                <thead>
                    <tr>
                        <th>NAME</th>
                        <th>JOB ROLE</th>
                        <th>START TIME</th>
                        <th>DATE</th>
                        {props.doorstaff.length > 0 ? <th>SIGN OUT</th> : null}
                        {props.doorstaff.length > 0 ? <th>CANCEL</th> : null}
                    </tr>
                </thead>
                <tbody>
                    {props.doorstaff.length > 0 ? (
                        props.doorstaff.map((e) => (
                            <tr key={e.staffId}>
                                <td>{e.staffName}</td>
                                <td>{e.position}</td>
                                <td>{e.startTime.split('T')[1].substring(0, 5)}</td>
                                <td>{e.startTime.split('T')[0]}</td>
                                {props.isVisible ? (
                                    <td>
                                        <form onSubmit={SingleSignOff} data-staff={JSON.stringify(e)}>

                                            <div className={s.signoff}>
                                                <div className={s.time}>
                                                    <div>
                                                        <label >TIME</label>
                                                        <input
                                                            type="time"
                                                            value={e.signOutTime}
                                                            onChange={(x) => { dispatch({ type: SET_DOORSTAFF_SIGNOUT_TIME, data: { id: e.staffId, signOutTIme: x.target.value } }) }}
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label>DATE</label>
                                                        <input
                                                            type="date"
                                                            value={e.signOutDate}
                                                            onChange={(x) => { dispatch({ type: SET_DOORSTAFF_SIGNOUT_DATE, data: { id: e.staffId, signOutTIme: x.target.value } }) }}
                                                            required
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <input type="checkbox" checked={e.isChecked} onChange={() => dispatch({ type: TOGGLE_DOORSTAFF_TO_SIGN_OUT, data: e.staffId })}></input>
                                                    <button>
                                                        SIGN OUT
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </td>

                                ) : null}
                                {props.isVisible ? <td><button onClick={() => { showCancelModal(e.activityId) }} >CANCEL</button></td> : null}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={6}>Nothing to show</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>

    )
}