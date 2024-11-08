import React from "react";
import s from "../SignIn.module.scss";

function DateTimeElement({ sia, handleUpdateSia }) {
  return (
    <>
      <div className={s.date_started}>
        <label>DATE STARTED</label>
        <input
          type="date"
          value={sia.date}
          onChange={(e) => handleUpdateSia({ date: e.target.value })}
        />
      </div>

      <div className={s.start_time}>
        <label>START TIME</label>
        <input
          type="time"
          value={sia.time}
          onChange={(e) => handleUpdateSia({ time: e.target.value })}
          required
        />
      </div>
    </>
  );
}

export default DateTimeElement;
