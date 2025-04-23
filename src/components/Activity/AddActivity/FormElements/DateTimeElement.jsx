import React from "react";
import s from "../AddActivity.module.scss";

export default function DateTimeElement({ date, setDate, time, setTime }) {
  return (
    <div className={s.date}>
      <label htmlFor="date">DATE</label>
      <input
        type="date"
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <label htmlFor="time">Select Time:</label>
      <input
        type="number"
        id="hours"
        min="0"
        max="23"
        placeholder="HH"
        value={time.hours}
        onChange={(e) =>
          setTime((prev) => {
            return { ...prev, hours: e.target.value };
          })
        }
      />{" "}
      :
      <select
        id="minutes"
        value={time.minutes}
        onChange={(e) =>
          setTime((prev) => {
            return { ...prev, minutes: e.target.value };
          })
        }
      >
        <option value="00">00</option>
        <option value="15">15</option>
        <option value="30">30</option>
        <option value="45">45</option>
      </select>
    </div>
  );
}
