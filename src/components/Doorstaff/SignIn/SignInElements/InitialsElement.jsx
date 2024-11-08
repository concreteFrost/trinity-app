import React from "react";
import s from "../SignIn.module.scss";

function InitialsElement({ firstName, lastName }) {
  return (
    <>
      <div className={s.f_name}>
        <label>FIRST NAME</label>
        <input type="text" value={firstName} readOnly />
      </div>

      <div className={s.l_name}>
        <label>LAST NAME</label>
        <input type="text" value={lastName} readOnly />
      </div>
    </>
  );
}

export default InitialsElement;
