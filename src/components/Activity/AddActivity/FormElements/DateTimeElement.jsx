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

      <label htmlFor="time">TIME</label>
      <input
        type="time"
        name="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />
    </div>
  );
}
