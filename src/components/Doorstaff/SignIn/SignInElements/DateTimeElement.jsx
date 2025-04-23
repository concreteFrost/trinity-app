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
        <label htmlFor="time">START TIME:</label>
        <div className={s.time_inputs}>
          <input
            className={s.hours}
            type="number"
            id="hours"
            min="0"
            max="23"
            placeholder="HH"
            value={sia.time.hours}
            onChange={(e) =>
              handleUpdateSia({ time: { ...sia.time, hours: e.target.value } })
            }
          />{" "}
          :
          <select
            className={s.minutes}
            id="minutes"
            value={sia.time.minutes}
            onChange={(e) =>
              handleUpdateSia({
                time: { ...sia.time, minutes: e.target.value },
              })
            }
          >
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
          </select>
        </div>
      </div>
    </>
  );
}

export default DateTimeElement;
