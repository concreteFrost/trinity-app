import s from "./AddActivity.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
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
import { GetBadResponse } from "../../../../redux/actions/debugConsoleActions";
import isErrorStatus from "../../../../utils/checkStatusCode";
import TypeElement from "./FormElements/TypeElement";
import SupplierElement from "./FormElements/SupplierElement";
import DateTimeElement from "./FormElements/DateTimeElement";
import RateElement from "./FormElements/RateElement";
import HoursWorkedElement from "./FormElements/HoursWorkedElement";
import NoteElement from "./FormElements/NoteElement";

const initialOptions = {
  suppliers: [],
  types: [],
  selectedTypeId: -1,
};

const initialActivity = {
  supplierId: -1,
  rate: {
    rateGroupId: -1,
    rateTypeId: -1,
  },
  cost: {
    costGroupId: -1,
    costValue: 0,
  },
  description: "",
  hoursWorked: 0,
};

export const AddActivity = () => {
  const [newActivity, setNewActivity] = useState(initialActivity);
  const [options, setOptions] = useState(initialOptions);

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );

  const [notes, setNotes] = useState("");

  const [supplierProvided, setSupplierProvided] = useState(false);

  const token = useSelector((state) => state.userReducer.user.access_token);
  const locationId = useSelector((state) => state.userReducer.user.locationId);

  const dispatch = useDispatch();

  async function SubmitActivity(data) {
    try {
      const res = await SubmitActivityAPI(token, data);
      if (isErrorStatus(res)) {
        dispatch(GetBadResponse("submit activity error", res, "activity"));
      }
      setNewActivity(initialActivity);
    } catch (e) {
      dispatch(GetBadResponse("submit activity error", e, "activity"));
    } finally {
      const today = new Date();
      const yesterday = new Date(new Date().setDate(today.getDate() - 1));
      await RefreshActivityList(
        token,
        new Date(yesterday).toISOString(),
        new Date(today).toISOString(),
        dispatch,
        "C"
      );
    }
  }

  async function checkRate(data) {
    try {
      const res = await GetRateAPI(token, data);
      console.log(res.data);
      if (res.data.message) {
        dispatch(ModalActions.ShowModalMessage(res.data.message));
        setSupplierProvided(false);
      } else {
        setSupplierProvided(true);

        setNewActivity((prev) => {
          return {
            ...prev,
            cost: { ...prev.cost, costValue: res.data.costValue },
            rate: {
              ...prev.rate,
              rateGroupId: res.data.rateGroupId,
              rateTypeId: res.data.rateTypeId,
            },
          };
        });
      }

      if (isErrorStatus(res)) {
        dispatch(GetBadResponse("get rate error", res, "activity"));
        setSupplierProvided(false);
      }
    } catch (e) {
      dispatch(ModalActions.ShowModalMessage(e.response?.data || "Error"));
      setSupplierProvided(false);
      dispatch(GetBadResponse("get rate error", e, "activity"));
    } finally {
      dispatch(HideLoader());
    }
  }

  async function FirstSubmit(e) {
    e.preventDefault();

    const activityID = options.selectedTypeId;
    const supplierID = newActivity.supplierId;

    if (activityID === "Select Type") {
      dispatch(ModalActions.ShowModalMessage("Activity is not selected"));
      return;
    }

    if (supplierID === "Select Supplier") {
      dispatch(ModalActions.ShowModalMessage("Supplier is not selected"));
      return;
    }

    const _time = e.target[2].value;
    const data = {
      activityID: activityID,
      supplierID: supplierID,
      time: _time,
    };

    dispatch(ShowLoader());
    checkRate(data);
  }

  async function SecondSubmit(e) {
    e.preventDefault();

    const _data = {
      locationId: parseInt(locationId),
      supplierId: parseInt(newActivity.supplierId),
      costGroupId: parseInt(newActivity.cost.costGroupId),
      rateGroupId: newActivity.rate.rateGroupId,
      rateTypeId: newActivity.rate.rateTypeId,
      startTime: date + "T" + time + ":00Z",
      costValue: parseFloat(newActivity.cost.costValue),
      description: notes,
      hoursWorked: parseFloat(newActivity.hoursWorked),
    };

    console.log(_data);
    // await SubmitActivity(_data);
    // await _GetActivityAPI();
  }

  return (
    <div className={s.container}>
      <form onSubmit={FirstSubmit} className={s.first_form}>
        <div className={s.general}>
          <TypeElement options={options} setOptions={setOptions}></TypeElement>
          <SupplierElement
            options={options}
            setOptions={setOptions}
            activity={newActivity}
            setActivity={setNewActivity}
          ></SupplierElement>
        </div>

        <DateTimeElement
          date={date}
          setDate={setDate}
          time={time}
          setTime={setTime}
        ></DateTimeElement>

        <div className={s.check_rate}>
          <button>CHECK RATE</button>
        </div>
      </form>

      {supplierProvided === true ? (
        <form onSubmit={SecondSubmit} className={s.rate_form}>
          <RateElement rate={newActivity.rate}></RateElement>
          <HoursWorkedElement
            hoursWorked={newActivity.hoursWorked}
            rate={newActivity.rate}
            costValue={newActivity.cost.costValue}
            setNewActivity={setNewActivity}
          ></HoursWorkedElement>

          <NoteElement
            setNewActivity={setNewActivity}
            rate={newActivity.rate}
            notes={notes}
            setNotes={setNotes}
          />
          <div className={s.buttons}>
            <button className={s.clear}>CLEAR</button>
            <button className={s.add}>ADD</button>
          </div>
        </form>
      ) : null}
    </div>
  );
};
