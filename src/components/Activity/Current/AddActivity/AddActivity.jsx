import s from "./AddActivity.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  GetActivityTypeOpt,
  GetRate,
  GetSupplierOpt,
  SubmitActivity
} from "../../../../redux/api/activityApi";
import { SET_ACTIVITY_COST_VALUE, SET_ACTIVITY_HOURS_WORKED, SET_ACTIVITY_TYPE } from "../../../../redux/types";

export const AddActivity = () => {
  const activityOpt = useSelector(
    (state) => state.activityReducer.GetOpt.activityTypeOpt
  );
  const supplierOpt = useSelector(
    (state) => state.activityReducer.GetOpt.supplierOpt
  );
  const rate = useSelector((state) => state.activityReducer.getRate);
  const token = useSelector((state) => state.userReducer.user.access_token);
  const locationId = useSelector((state) => state.userReducer.user.locationId);
  const supplierId = useSelector((state) => state.activityReducer.supplier);
  const costGroupId = useSelector(
    (state) => state.activityReducer.activityType
  );

  const costValue = useSelector((state) => state.activityReducer.costValue);
  const hoursWorked = useSelector((state) => state.activityReducer.hoursWorked);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );
  const [noteIsRequired, setNoteIsRequired] = useState(false);
  const [notes, setNotes] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetActivityTypeOpt(token));
  }, []);

  function CompareRates() {
    if (parseInt(costValue) !== rate.costValue) {
      dispatch({ type: "SHOW_MODAL_MESSAGE", data: "NOTES input is now required" })
      setNoteIsRequired(true);
    } else {
      setNoteIsRequired(false);
    }
    dispatch({ type: SET_ACTIVITY_COST_VALUE, data: costValue});
    console.log(costValue)
  }

  async function FirstSubmit(e) {
    e.preventDefault();
    const activityID = e.target[0].value;
    const supplierID = e.target[1].value;
    const _time = e.target[2].value;
    const data = {
      activityID: activityID,
      supplierID: supplierID,
      time: _time,
    };

    await dispatch({type:"SHOW_LOADER"})
    await dispatch(GetRate(token, data));
    await dispatch({type:"HIDE_LOADER"})
  }

  function SecondSubmit(e) {
    e.preventDefault();
    const _data = {
      locationId: parseInt(locationId),
      supplierId: parseInt(supplierId),
      costGroupId: parseInt(costGroupId),
      rateGroupId: rate.rateGroupId,
      rateTypeId: rate.rateTypeId,
      startTime: date + "T" + time + ":00Z",
      costValue: parseFloat(costValue),
      description: notes,
      hoursWorked: parseFloat(hoursWorked),
    };

    dispatch(SubmitActivity(token, _data))


  }
  return (
    <div className={s.container}>
      <form onSubmit={FirstSubmit} className={s.first_form}>
        <div className={s.general}>
          <label htmlFor="type">TYPE</label>
          <select
            name="type"
            onChange={(e) => {
              dispatch(GetSupplierOpt(token, e.target.value));
              dispatch({ type: SET_ACTIVITY_TYPE, data: e.target.value });
            }}
          >
            {activityOpt.length > 0
              ? activityOpt.map((e) => {
                return (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                );
              })
              : null}
          </select>

          <label htmlFor="supplier">SUPPLIER</label>
          <select name="supplier">
            {supplierOpt.length > 0
              ? supplierOpt.map((e) => {
                return (
                  <option key={e.supplierId} value={e.supplierId}>
                    {e.supplierName}
                  </option>
                );
              })
              : null}
          </select>
        </div>

        <div className={s.date}>
          <label htmlFor="date">DATE</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />

          <label htmlFor="time">TIME</label>
          <input
            type="time"
            name="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div className={s.check_rate}>
          <button>CHECK RATE</button>
        </div>
      </form>
      <form onSubmit={SecondSubmit}>
        <div className={s.rate}>
          <label>RATE</label>
          <div className={s.radio}>
            <label htmlFor="fixed">fixed</label>
            <input
              type="radio"
              name="rate"
              id="fixed"
              checked={rate.rateTypeId === 4 ? true : false}
              readOnly
            />

            <label htmlFor="custom">custom</label>
            <input
              type="radio"
              name="rate"
              id="custom"
              checked={rate.rateTypeId === 5 ? true : false}
              readOnly
            />
          </div>
        </div>

        <div className={s.hours}>
          <label htmlFor="hours-worked">HOURS WORKED</label>
          <input
            type="number"
            name="hours-worked"
            step={0.01}
            value={hoursWorked ? hoursWorked : ""}
            onChange={(e) => {
              dispatch({
                type:SET_ACTIVITY_HOURS_WORKED,
                data: e.target.value,
              });
            }}
            required
          />

          <label htmlFor="value">VALUE</label>
          <input
            type="number"
            name="value"
            readOnly={rate.rateTypeId === 4 ? true : false}
            value={costValue ? costValue : 0}
            onChange={(e) => {
              dispatch({
                type: SET_ACTIVITY_COST_VALUE,
                data: e.target.value,
              });
            }}
            onBlur={CompareRates}
          />
        </div>

        <div className={s.notes}>
          <label htmlFor="notes">NOTES</label>
          <textarea
            name="notes"
            cols="30"
            rows="10"
            required={noteIsRequired ? true : false}
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          ></textarea>
        </div>

        <div className={s.buttons}>
          <button className={s.clear}>CLEAR</button>
          <button className={s.add}>ADD</button>
        </div>
      </form>
    </div>
  );
};
