import s from "./CurrentModal.module.scss";
import { useDispatch } from "react-redux";
import { useState } from "react";
import {
  ShowModalMessage,
} from "../../../../redux/actions";
import { SignOffMemberAPI } from "../../../../services/activityApi";
import { RefreshDoorstaffList } from "../../../../services/utils/activityUtils";
import * as DoorstaffActions from "../../../../redux/actions/doorstaffActions"

export const CurrentModal = (props) => {
  const [signOffSelectedDate, setSignOffSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [signOffSelectedTime, setSignOffSelectedTime] = useState(
    new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );

  const dispatch = useDispatch();

  function SignoffSelected(e) {
    e.preventDefault();
    const signOutTIme = e.target[1].value + "T" + e.target[0].value;
    const toSignOff = props.doorstaff.filter((staff) => staff.isChecked);

    dispatch(DoorstaffActions.SignOffSelectedDoorstaff(e.target[0].value, e.target[1].value));

    SignOffMemberAPI(toSignOff, props.token.access_token, signOutTIme)
      .then((res) => {
        !res.data.success
          ? dispatch(ShowModalMessage(res.data.message))
          : RefreshDoorstaffList(props.token.access_token, dispatch);
      })
      .catch((e) => console.log(e));
    props.setIsSignOffModalVisible(false);
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
          <button
            onClick={() => {
              props.setIsSignOffModalVisible(false);
            }}
            className={s.btn_cancel}
          >
            CANCEL
          </button>
        </div>
        {props.errorMessage.length > 0 ? (
          <div className={s.error}>{props.errorMessage}</div>
        ) : null}
      </form>
    </div>
  );
};
