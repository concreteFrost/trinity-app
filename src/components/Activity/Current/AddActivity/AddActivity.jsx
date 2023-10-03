import s from "./AddActivity.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {
  GetActivitySupplierOptAPI,
  GetActivityTypeOptAPI,
  GetRateAPI,
  SubmitActivityAPI,
} from "../../../../services/activityApi";
import {
  ShowLoader,
  HideLoader,
} from "../../../../redux/actions/loaderActions";
import * as ActivityActions from "../../../../redux/actions/activityActions";
import * as ModalActions from "../../../../redux/actions/modalActions";
import { RefreshActivityList } from "../../../../services/utils/activityUtils";
import {
  GetBadResponse,
  GetResponse,
} from "../../../../redux/actions/debugConsoleActions";

export const AddActivity = () => {
  const activityOpt = useSelector(
    (state) => state.activityReducer.GetOpt.activityTypeOpt
  );
  const supplierOpt = useSelector(
    (state) => state.activityReducer.GetOpt.supplierOpt
  );
  const token = useSelector((state) => state.userReducer.user.access_token);
  const locationId = useSelector((state) => state.userReducer.user.locationId);
  const supplierProvided = useSelector(
    (state) => state.activityReducer.supplierProvided
  );
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

  function _GetActivityAPI() {
    GetActivityTypeOptAPI(token)
      .then((res) => {
        dispatch(ActivityActions.GetActivityTypeOpt(res.data.record));
        dispatch(ActivityActions.SetActivityType(res.data.record[0].id));
        GetActivitySupplierOptAPI(token, res.data.record[0].id);
        dispatch(
          GetResponse("get activity cost group success", res, "activity")
        );
      })
      .catch((e) => {
        dispatch(
          GetBadResponse("get activity cost group success", e, "activity")
        );
      });
  }

  useEffect(() => {
    _GetActivityAPI();
  }, []);

  function GetSupplierOpt(e) {
    dispatch(ActivityActions.SetActivityType(e.target.value));
    GetActivitySupplierOptAPI(token, e.target.value)
      .then((res) => {
        dispatch(ActivityActions.GetActivitySupplierOpt(res.data.suppliers));
        dispatch(
          GetResponse("get activity supplier group success", res, "activity")
        );
      })
      .catch((e) => {
        dispatch(
          GetBadResponse("get activity supplier group success", e, "activity")
        );
      });
  }

  function CompareRates() {
    if (parseInt(costValue) !== rate.costValue) {
      dispatch(ModalActions.ShowModalMessage("NOTES input is now required"));
      setNoteIsRequired(true);
    } else {
      setNoteIsRequired(false);
    }
    dispatch(ActivityActions.SetActivityCostValue(costValue));
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
    GetRateAPI(token, data)
      .then((res) => {
        if (res.data.message) {
          dispatch(ModalActions.ShowModalMessage(res.data.message));
          dispatch(ActivityActions.isActivitySupplierProvided(false));
        } else {
          dispatch(ActivityActions.GetActivityRate(res.data));
          dispatch(ActivityActions.isActivitySupplierProvided(true));
          dispatch(ActivityActions.SetActivityCostValue(res.data.costValue));
        }
        dispatch(GetResponse("get rate success", res, "activity"));
      })
      .catch((e) => {
        dispatch(GetBadResponse("get rate error", e, "activity"));
      })
      .finally(() => {
        dispatch(HideLoader());
      });
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
    SubmitActivityAPI(token, _data)
      .then((res) => {
        dispatch(GetResponse("submit activity success", res,'activity'));
        dispatch(ActivityActions.ClearActivity());
      })
      .catch((e) => {
        dispatch(GetBadResponse("submit activity error", e,'activity'));
      })
      .finally(() => {
        const today = new Date();
        const yesterday = new Date(new Date().setDate(today.getDate() - 1));
        RefreshActivityList(
          token,
          new Date(yesterday).toISOString(),
          new Date(today).toISOString(),
          dispatch,
          "C"
        );
        _GetActivityAPI();
      });
  }
  return (
    <div className={s.container}>
      <form onSubmit={FirstSubmit} className={s.first_form}>
        <div className={s.general}>
          <label htmlFor="type" disabled={activityOpt.length === 0}>
            TYPE
          </label>
          <select
            name="type"
            onChange={(e) => {
              GetSupplierOpt(e);
            }}
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
          <select
            name="supplier"
            disabled={supplierOpt.length === 0}
            onChange={(e) => {
              dispatch(ActivityActions.SetActivitySupplier(e.target.value));
            }}
          >
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
      {supplierProvided === true ? (
        <form onSubmit={SecondSubmit} className={s.rate_form}>
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
              onChange={(e) => {
                dispatch(
                  ActivityActions.SetActivityHoursWorked(e.target.value)
                );
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
                dispatch(ActivityActions.SetActivityCostValue(e.target.value));
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
      ) : null}
    </div>
  );
};
