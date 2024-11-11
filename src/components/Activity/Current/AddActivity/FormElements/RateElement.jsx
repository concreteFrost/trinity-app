import React from "react";
import s from "../AddActivity.module.scss";

export default function RateElement({ rate }) {
  console.log(rate.rateTypeId);
  return (
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
  );
}
