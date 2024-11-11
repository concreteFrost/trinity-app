import React from "react";
import s from "../AddActivity.module.scss";

export default function HoursWorkedElement({
  hoursWorked,
  rate,
  costValue,
  setNewActivity,
}) {
  function setHours(e) {
    let val = e.target.value;

    if (val < 0) return;

    setNewActivity((prev) => {
      return {
        ...prev,
        hoursWorked: val,
      };
    });
  }

  function setValue(e) {
    let val = e.target.value;

    if (val < 0) return;
    setNewActivity((prev) => {
      return {
        ...prev,
        cost: { ...prev.cost, costValue: val },
      };
    });
  }

  return (
    <div className={s.hours}>
      <label htmlFor="hours-worked">HOURS WORKED</label>
      <input
        type="number"
        name="hours-worked"
        step={0.1}
        value={hoursWorked ? hoursWorked : 0}
        onChange={(e) => {
          setHours(e);
        }}
        required
      />

      <label htmlFor="value">VALUE</label>
      <input
        type="number"
        name="value"
        readOnly={rate.rateTypeId === 4 ? true : false}
        value={costValue ? costValue : 0}
        onChange={(e) => setValue(e)}
      />
    </div>
  );
}
