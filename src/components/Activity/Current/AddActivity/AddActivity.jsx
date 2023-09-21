import s from "./AddActivity.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetActivitySupplierOptAPI, GetActivityTypeOptAPI, GetRateAPI, SubmitActivityAPI } from "../../../../services/activityApi";
import { ClearActivity, GetActivityRate, GetActivitySupplierOpt, GetActivityTypeOpt, HideLoader, SetActivityCostValue, SetActivityHoursWorked, SetActivitySupplier, SetActivityType, ShowLoader, ShowModalMessage, isActivitySupplierProvided } from "../../../../redux/actions";
import { RefreshActivityList } from "../../../../services/utils/activityUtils";

export const AddActivity = () => {
  const activityOpt = useSelector(
    (state) => state.activityReducer.GetOpt.activityTypeOpt
  );
  const supplierOpt = useSelector(
    (state) => state.activityReducer.GetOpt.supplierOpt
  );
  const token = useSelector((state) => state.userReducer.user.access_token);
  const locationId = useSelector((state) => state.userReducer.user.locationId);
  const supplierProvided = useSelector(state => state.activityReducer.supplierProvided)
  const rate = useSelector((state) => state.activityReducer.getRate);

  const supplierId = useSelector((state) => state.activityReducer.supplierId);
  const activityType = useSelector(
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

    GetActivityTypeOptAPI(token).then((res) => {
      dispatch(GetActivityTypeOpt(res.data.record))
      dispatch(SetActivityType(res.data.record[0].id))
      GetActivitySupplierOptAPI(token, res.data.record[0].id)
    })
  }, []);

  function GetSupplierOpt(e) {
    dispatch(SetActivityType(e.target.value))
    GetActivitySupplierOptAPI(token, e.target.value).then((res) => {
      dispatch(GetActivitySupplierOpt(res.data.suppliers))

    })
  }


  function CompareRates() {

    if (parseInt(costValue) !== rate.costValue) {
      dispatch(ShowModalMessage("NOTES input is now required"));
      setNoteIsRequired(true);
    } else {
      setNoteIsRequired(false);
    }
    dispatch(SetActivityCostValue(costValue));
  }

  function FirstSubmit(e) {
    e.preventDefault();
    const activityID = e.target[0].value;
    const supplierID = e.target[1].value;
    const _time = e.target[2].value;
    const data = {
      activityID: activityID,
      supplierID: supplierID,
      time: _time,
    };

    dispatch(ShowLoader());
    GetRateAPI(token, data).then((res) => {
      if (res.data.message) {
        dispatch(ShowModalMessage(res.data.message))
        dispatch(isActivitySupplierProvided(false))
      }
      else {
        dispatch(GetActivityRate(res.data))
        dispatch(isActivitySupplierProvided(true))
        dispatch(SetActivityCostValue(res.data.costValue))
      }
    }).finally(() => {
      dispatch(HideLoader());
    })

  }

  function SecondSubmit(e) {
    e.preventDefault();

    const _data = {
      locationId: parseInt(locationId),
      supplierId: parseInt(supplierId),
      costGroupId: parseInt(activityType),
      rateGroupId: rate.rateGroupId,
      rateTypeId: rate.rateTypeId,
      startTime: date + "T" + time + ":00Z",
      costValue: parseFloat(costValue),
      description: notes,
      hoursWorked: parseFloat(hoursWorked),
    };
    SubmitActivityAPI(token, _data).then((res) => {
      dispatch(ClearActivity())
    }).finally(() => {
      const today = new Date()
      const yesterday = new Date(new Date().setDate(today.getDate() - 1));
      RefreshActivityList(token, new Date(yesterday).toISOString(), new Date(today).toISOString(), dispatch, "C")
    })

  }
  return (
    <div className={s.container}>
      <form onSubmit={FirstSubmit} className={s.first_form}>
        <div className={s.general}>
          <label htmlFor="type" disabled={activityOpt.length === 0}>TYPE</label>
          <select
            name="type"
            onChange={(e) => { GetSupplierOpt(e) }}
            disabled={activityOpt.length === 0}
          >
            <option value={null}>Select Type</option>
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
          <select name="supplier" disabled={supplierOpt.length === 0} onChange={(e) => {
            dispatch(SetActivitySupplier(e.target.value))
          }}>
            <option value={null}>Select Supplier</option>

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
      {supplierProvided === true ? <form onSubmit={SecondSubmit} className={s.rate_form}>
        <div className={s.rate}>
          <label>RATE</label>
          <div className={s.radio}>
            <div>
              <label htmlFor="fixed">fixed</label>
              <input
                type="radio"
                name="rate"
                id="fixed"
                checked={rate.rateTypeId === 4 ? true : false}
                readOnly
              />
            </div>
            <div>
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
        </div>

        <div className={s.hours}>
          <label htmlFor="hours-worked">HOURS WORKED</label>
          <input
            type="number"
            name="hours-worked"
            step={0.01}
            value={hoursWorked ? hoursWorked : ""}
            onChange={(e) => { dispatch(SetActivityHoursWorked(e.target.value)) }}
            required
          />

          <label htmlFor="value">VALUE</label>
          <input
            type="number"
            name="value"
            readOnly={rate.rateTypeId === 4 ? true : false}
            value={costValue ? costValue : 0}
            onChange={(e) => { dispatch(SetActivityCostValue(e.target.value)) }}
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
      </form> : null}
    </div>
  );
};
