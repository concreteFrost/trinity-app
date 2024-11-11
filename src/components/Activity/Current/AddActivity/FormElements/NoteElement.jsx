import React from "react";
import s from "../AddActivity.module.scss";

export default function NoteElement({ rate, notes, setNotes }) {
  return (
    <div className={s.notes}>
      <label htmlFor="notes">NOTES</label>
      <textarea
        name="notes"
        cols="30"
        rows="10"
        required={rate.rateTypeId === 5 ? true : false}
        value={notes}
        onChange={(e) => {
          setNotes(e.target.value);
        }}
      ></textarea>
    </div>
  );
}
