import s from "./CurrentModal.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { DeleteDoorStaff } from "../../../../redux/api/doorstaffAPI";

export const CurrentModal = (props) => {

    const [signOffSelectedDate, setSignOffSelectedDate] = useState(new Date().toISOString().split("T")[0])
    const [signOffSelectedTime, setSignOffSelectedTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))

    const dispatch = useDispatch();

    function SignoffSelected(e) {
        e.preventDefault();
        dispatch({ type: "SIGN_OFF_SELECTED_DOORSTAFF", data: { signOutTime: e.target[0].value, signOutDate: e.target[1].value } })
        const signOutTIme = e.target[1].value + "T" + e.target[0].value
        props.doorstaff.forEach((x) => {
            if (x.isChecked) {
                dispatch(DeleteDoorStaff(x, props.token.access_token, signOutTIme));
            }
        })
        props.setIsSignOffModalVisible(false)
    }

    return (
        <div className={s.sign_all_out}>
            <form onSubmit={SignoffSelected}>
                <h3>SIGN OFF TIME</h3>
                <div>
                    <label htmlFor="sign_off_time">TIME</label>
                    <input
                        type="time"
                        name="sign_off_time"
                        value={signOffSelectedTime}
                        onChange={(e) => setSignOffSelectedTime(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sign_off_date">DATE</label>
                    <input
                        type="date"
                        value={signOffSelectedDate}
                        onChange={(e) => setSignOffSelectedDate(e.target.value)}
                        name="sign_off_date"
                        required
                    />
                </div>
                <div className={s.sign_all_out_btn_container}>
                    <button className={s.btn_confirm}>CONFIRM</button>
                    <button onClick={() => { props.setIsSignOffModalVisible(false) }} className={s.btn_cancel}>CANCEL</button>
                </div>
                {props.errorMessage.length > 0 ? <div className={s.error}>{props.errorMessage}</div> : null}
            </form>

        </div>
    )
}