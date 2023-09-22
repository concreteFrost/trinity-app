import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import s from "./HistoryForm.module.scss";
import { GetSearchStaffAPI } from "../../../../services/reportApi";

export const HistoryForm = () => {
  const token = useSelector((state) => state.userReducer.user.access_token);
  const data = useSelector(
    (state) => state.searchHistoryReducer
  );

  const dispatch = useDispatch();

  useEffect(() => {

    //old API
    // dispatch(GetHistoryAuditType(token));
    // dispatch(GetHistorySearchStaff(token));
    // dispatch(GetHistorySearchLocations(token));

    //new API
    // GetSearchStaffAPI(token).then((res) => {

    // })
  }, []);

  function Submit(e) {
    e.preventDefault();
  }

  return (
    <div className={s.container}>
      <form onSubmit={Submit}>
        <div className={s.user_staff}>
          <label htmlFor="user">USER</label>
          <select name="user" id="user" disabled={data.options.users.length === 0}>

          </select>

          <label htmlFor="staff">STAFF</label>
          <select name="staff" id="staff" disabled={data.options.staff.length === 0}>
            {data.options.staff.length > 0
              ? data.options.staff.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))
              : null}
          </select>
        </div>

        <div className={s.location_type}>
          <label htmlFor="location">LOCATION</label>
          <select name="location" id="location" disabled={data.options.locations.length === 0}>
            {data.options.locations.length > 0
              ? data.options.locations.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))
              : null}
          </select>

          <label htmlFor="type">TYPE</label>
          <select name="type" id="type" disabled={data.options.auditType.length === 0}>
            {data.options.auditType.length > 0
              ? data.options.auditType.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))
              : null}
          </select>
        </div>

        <div className={s.reference}>
          <label htmlFor="reference">REFERENCE NUMBER</label>
          <input type="number" name="reference" id="reference" />
        </div>

        <div className={s.dates}>
          <div>
            {" "}
            <label htmlFor="from-date">FROM</label>
            <input type="date" name="from-date" id="fro-date" value={data.dateFrom} onChange={(e) =>
              dispatch({
                type: "SET_HISTORY_AUDIT_FROM_DATE",
                data: e.target.value,
              })
            } />
          </div>
          <div>
            {" "}
            <label htmlFor="to-date">TO</label>
            <input type="date" name="to-date" id="to-date" value={data.dateTo} onChange={(e) =>
              dispatch({
                type: "SET_HISTORY_AUDIT_TO_DATE",
                data: e.target.value,
              })
            } />
          </div>
        </div>

        <div className={s.button_col}>
          <button>SEARCH</button>
        </div>
      </form>
    </div>
  );
};
