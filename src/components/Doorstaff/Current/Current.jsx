import s from "./Current.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GetDoorstaff, DeleteDoorStaff } from "../../../redux/api/doorstaffAPI";
import { useEffect, useState } from "react";
import {
  SET_DOORSTAFF_SIGNOUT_DATE,
  SET_DOORSTAFF_SIGNOUT_TIME,
  TOGGLE_DOORSTAFF_TO_SIGN_OUT,
  SELECT_ALL_DOORSTAFF_TO_SIGN_OUT,
  DESELECT_ALL_DOORSTAFF_TO_SIGN_OUT
} from "../../../redux/types";

export const Current = (props) => {

  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user);
  const doorstaff = useSelector(
    (state) => state.doorstaffReducer.current
  );

  const [isSignOffModalVisible, setIsSignOffModalVisible] = useState(false);
  const [signOffSelectedDate, setSignOffSelectedDate] = useState(new Date().toISOString().split("T")[0])
  const [signOffSelectedTime, setSignOffSelectedTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }))
  const errorMessage = useSelector((state => state.doorstaffReducer.errorMessage))

  useEffect(() => {
    dispatch(GetDoorstaff(token.access_token));
  }, []);

  function SingleSignOff(e) {
    e.preventDefault()
    if (e.target[0].value && e.target[1].value) {
      const data = JSON.parse(e.target.dataset.staff);
      const signOutTIme = e.target[1].value + "T" + e.target[0].value
      dispatch(DeleteDoorStaff(data, token.access_token, signOutTIme));
    }
  }

  function SignoffSelected(e) {
    e.preventDefault();
    dispatch({ type: "SIGN_OFF_SELECTED_DOORSTAFF", data: { signOutTime: e.target[0].value, signOutDate: e.target[1].value } })
    const signOutTIme = e.target[1].value + "T" + e.target[0].value
    doorstaff.forEach((x) => {
      if (x.isChecked) {
        dispatch(DeleteDoorStaff(x, token.access_token, signOutTIme));
      }
    })
    setIsSignOffModalVisible(false)
  }

  function ShowSignOffSelectedModal() {
    if (doorstaff.some(x => x.isChecked)) {
      setIsSignOffModalVisible(true)
    }
  }

  return (
    <div className={s.container}>
      {errorMessage.length > 0 && !isSignOffModalVisible ? <div className={s.error}>{errorMessage}</div> : null}
      <div className={s.wrapper}>
        <table className={s.doorstaff_table}>
          <thead>
            <tr>
              <th>NAME</th>
              <th>JOB ROLE</th>
              <th>START TIME</th>
              <th>DATE</th>
              {props.isVisible ? <th>SIGN OUT</th> : null}
            </tr>
          </thead>
          <tbody>
            {doorstaff.length > 0 ? (
              doorstaff.map((e) => (
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
      {props.isVisible && doorstaff.length > 0 ?
        <div className={s.button_footer}>
          <div><button onClick={() => dispatch({ type: SELECT_ALL_DOORSTAFF_TO_SIGN_OUT })}> SELECT ALL</button></div>
          <div><button onClick={() => dispatch({ type: DESELECT_ALL_DOORSTAFF_TO_SIGN_OUT })}> DESELECT ALL</button></div>
          <div><button onClick={ShowSignOffSelectedModal}>SIGN OUT</button> </div>
        </div>
        : null}

      {props.isVisible && isSignOffModalVisible ? <div className={s.sign_all_out}>
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
            <button onClick={() => { setIsSignOffModalVisible(false) }} className={s.btn_cancel}>CANCEL</button>
          </div>
          {errorMessage.length > 0 ? <div className={s.error}>{errorMessage}</div> : null}
        </form>

      </div> : null}
    </div>
  );
};
