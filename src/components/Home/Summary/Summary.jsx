import React from "react";
import s from "./Summary.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {GetDoorstaffSummary} from '../../../redux/api/summaryApi'


export const Summary = () => {

  const doorstaff = useSelector(state => state.summaryReducer.doorstaff)
  const token = useSelector((state) => state.userReducer.user.access_token);
  const date = useSelector(state => state.summaryReducer.date);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(GetDoorstaffSummary(token, date, 'D'))
    dispatch(GetDoorstaffSummary(token, date, 'W'))
  },[])

  return (
    <div className={s.container}>
      <header>
        <h2>Summary</h2>
      </header>
      <table className={s.summary_table}>
        <thead>
          <tr>
            <th colSpan={2}>DAILY SUMMARY INFORMATION</th>
            <th colSpan={2}>WEEKLY SUMMARY INFORMATION</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>STAFF ONSITE</td>
            <td>0</td>
            <td>TOTAL ONSITE</td>
            <td>0</td>
          </tr>
          <tr>
            <td>COST</td>
            <td>0</td>
            <td>CURRENT SPENT</td>
            <td>0</td>
          </tr>
        </tbody>
      </table>
    </div>
    )
};
