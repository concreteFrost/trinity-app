import s from "./CurrentTable.module.scss";
import { useDispatch } from "react-redux/es/exports";
import { SignOffMemberAPI } from "services/activityApi";
import { RefreshDoorstaffList } from "services/utils/activityUtils";
import * as DoorstaffActions from "redux/actions/doorstaffActions";
import * as ModalActions from "redux/actions/modalActions";
import isErrorStatus from "utils/checkStatusCode";
import { GetBadResponse } from "redux/actions/debugConsoleActions";
import { formatTime } from "utils/generateTimeOptions";

export const CurrentTable = (props) => {
  const dispatch = useDispatch();
  function SingleSignOff(e) {
    e.preventDefault();

    if (e.target[0].value && e.target[1].value) {
      const data = JSON.parse(e.target.dataset.staff);
      const signOutTIme =
        e.target[2].value +
        "T" +
        formatTime(e.target[0].value, e.target[1].value);

      SignOffMemberAPI(data, props.token.access_token, signOutTIme)
        .then((res) => {
          if (!res.data.success) {
            dispatch(ModalActions.ShowModalMessage(res.data.message));
            if (isErrorStatus(res)) {
              dispatch(GetBadResponse("sign off member", res, "doorstaff"));
            }
          } else {
            RefreshDoorstaffList(props.token.access_token, dispatch);
          }
        })
        .catch((e) => {
          dispatch(ModalActions.ShowModalMessage(e.response.data));
          dispatch(GetBadResponse("sign off member", e, "doorstaff"));
        });
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
            props.doorstaff.map((doorstaff) => (
              <tr key={doorstaff.staffId}>
                <td>{doorstaff.staffName}</td>
                <td>{doorstaff.position}</td>
                <td>{doorstaff.startTime.split("T")[1].substring(0, 5)}</td>
                <td>{doorstaff.startTime.split("T")[0]}</td>
                {props.isVisible ? (
                  <td>
                    <form
                      onSubmit={SingleSignOff}
                      data-staff={JSON.stringify(doorstaff)}
                    >
                      <div className={s.signoff}>
                        <div className={s.time}>
                          <div>
                            <label>TIME</label>
                            <div className={s.time_inputs}>
                              <input
                                className={s.hours}
                                type="number"
                                id="hours"
                                min="0"
                                max="23"
                                placeholder="HH"
                                value={doorstaff.signOutTime.hour}
                                onChange={(x) => {
                                  dispatch(
                                    DoorstaffActions.SetDoorstaffSignOutTime(
                                      doorstaff.staffId,
                                      {
                                        ...doorstaff.signOutTime,
                                        hour: x.target.value,
                                      }
                                    )
                                  );
                                }}
                              />{" "}
                              :
                              <select
                                className={s.minutes}
                                id="minutes"
                                value={doorstaff.signOutTime.minutes}
                                onChange={(x) => {
                                  dispatch(
                                    DoorstaffActions.SetDoorstaffSignOutTime(
                                      doorstaff.staffId,
                                      {
                                        ...doorstaff.signOutTime,
                                        minutes: x.target.value,
                                      }
                                    )
                                  );
                                }}
                              >
                                <option value="00">00</option>
                                <option value="15">15</option>
                                <option value="30">30</option>
                                <option value="45">45</option>
                              </select>
                            </div>
                            {/* <input
                              type="time"
                              value={doorstaff.signOutTime}
                              onChange={(x) => {
                                dispatch(
                                  DoorstaffActions.SetDoorstaffSignOutTime(
                                    doorstaff.staffId,
                                    x.target.value
                                  )
                                );
                              }}
                              required
                            /> */}
                          </div>
                          <div>
                            <label>DATE</label>
                            <input
                              type="date"
                              value={doorstaff.signOutDate}
                              onChange={(x) => {
                                dispatch(
                                  DoorstaffActions.SetDoorstaffSignOutDate(
                                    doorstaff.staffId,
                                    x.target.value
                                  )
                                );
                              }}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <input
                            type="checkbox"
                            checked={doorstaff.isChecked}
                            onChange={() =>
                              dispatch(
                                DoorstaffActions.ToggleDoorstaffToSignOut(
                                  doorstaff.staffId
                                )
                              )
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
                        showCancelModal(doorstaff.activityId);
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
