import React from "react";
import s from "./Summary.module.scss";

export const Summary = () => (
  <div className={s.container}>
    <header>
      <h2>Summary</h2>
    </header>
    <table className={s.summary_table}>
      <thead>
        <tr>
          <th colSpan={2}>Daily Summary Information</th>
          <th colSpan={2}>Weekly Summary Information</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Staff onsite</td>
          <td>0</td>
          <td>Total onsite</td>
          <td>0</td>
        </tr>
        <tr>
          <td>Cost</td>
          <td>0</td>
          <td>Current Spend</td>
          <td>0</td>
        </tr>
      </tbody>
    </table>
  </div>
);
