import s from "./CurrentTable.module.scss";
import { useDispatch } from "react-redux/es/exports";
import { SignOffMemberAPI } from "../../../../services/activityApi";
import { RefreshDoorstaffList } from "../../../../services/utils/activityUtils";
import * as DoorstaffActions from "../../../../redux/actions/doorstaffActions";
import * as ModalActions from "../../../../redux/actions/modalActions";

export const CurrentTable = (props) => {
  const dispatch = useDispatch();
  function SingleSignOff(e) {
    e.preventDefault();
    if (e.target[0].value && e.target[1].value) {
      const data = JSON.parse(e.target.dataset.staff);
      const signOutTIme = e.target[1].value + "T" + e.target[0].value;

      SignOffMemberAPI(data, props.token.access_token, signOutTIme)
        .then((res) => {
          if (!res.data.success) {
            dispatch(ModalActions.ShowModalMessage(res.data.message));
          } else {
            RefreshDoorstaffList(props.token.access_token, dispatch);
          }
        })
      
    }
  }

  function showCancelModal(activityIdToCancel) {
    dispatch(ModalActions.ShowCancelModal(activityIdToCancel));
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
                <td>{e.startTime.split("T")[1].substring(0, 5)}</td>
                <td>{e.startTime.split("T")[0]}</td>
                {props.isVisible ? (
                  <td>
                    <form
                      onSubmit={SingleSignOff}
                      data-staff={JSON.stringify(e)}
                    >
                      <div className={s.signoff}>
                        <div className={s.time}>
                          <div>
                            <label>TIME</label>
                            <input
                              type="time"
                              value={e.signOutTime}
                              onChange={(x) => {
                                dispatch(
                                  DoorstaffActions.SetDoorstaffSignOutTime(
                                    e.staffId,
                                    x.target.value
                                  )
                                );
                              }}
                              required
                            />
                          </div>
                          <div>
                            <label>DATE</label>
                            <input
                              type="date"
                              value={e.signOutDate}
                              onChange={(x) => {
                                dispatch(DoorstaffActions.SetDoorstaffSignOutDate(e.staffId, x.target.value))
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            checked={e.isChecked}
                            onChange={() =>
                              dispatch(DoorstaffActions.ToggleDoorstaffToSignOut(e.staffId))
                            }
                          ></input>
                          <button>SIGN OUT</button>
                        </div>
                      </div>
                    </form>
                  </td>
                ) : null}
                {props.isVisible ? (
                  <td className={s.cancel_operations}>
                    <button
                      onClick={() => {
                        showCancelModal(e.activityId);
                      }}
                    >
                      CANCEL
                    </button>
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
  );
};