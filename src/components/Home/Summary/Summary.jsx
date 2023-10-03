import React from "react";
import s from "./Summary.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetSummaryReviewAPI } from "../../../services/reportApi";
import { HideLoader, ShowLoader } from "../../../redux/actions/loaderActions";
import * as DoorstaffActions from "../../../redux/actions/doorstaffActions";
import { GetBadResponse, GetResponse } from "../../../redux/actions/debugConsoleActions";


export const Summary = () => {
  const token = useSelector((state) => state.userReducer.user.access_token);
  const date = useSelector((state) => state.summaryReducer.date);
  const doorstaff = useSelector((state) => state.summaryReducer.doorstaff);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowLoader())
    GetSummaryReviewAPI(token, date, "D").then((res) => {
      dispatch(GetResponse('get daily summary success', res,'home'))
      dispatch(DoorstaffActions.GetDoorstaffDaily(res.data.summaryRecords))
    }).catch((e) => {
      dispatch(GetBadResponse('get daily summary error', e,'home'))
    })
    GetSummaryReviewAPI(token, date, "W").then((res) => {
      dispatch(GetResponse('get weekly summary success', res,'home'))
      dispatch(DoorstaffActions.GetDoorstaffWeekly(res.data.summaryRecords))
    }).catch((e) => {
      dispatch(GetBadResponse('get weekly summary error', e,'home'))
    }).finally(() => {
      dispatch(HideLoader())
    })
  }, []);

  return (
    <div className={s.container}>
      <header>
        <h2>Summary</h2>
      </header>

      <div className={s.wrapper}>
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
              <td>
                {doorstaff.daily.length > 0
                  ? doorstaff.daily
                    .map((i) => i.actualCount)
                    .reduce((a, b) => a + b)
                  : null}
              </td>
              <td>TOTAL ONSITE</td>
              <td>
                {doorstaff.weekly.length > 0
                  ? doorstaff.weekly
                    .map((i) => i.actualCount)
                    .reduce((a, b) => a + b)
                  : null}
              </td>
            </tr>
            <tr>
              <td>COST</td>
              <td>
                {doorstaff.daily.length > 0
                  ? doorstaff.daily
                    .map((i) => i.actualValue)
                    .reduce((a, b) => a + b)
                  : null}
              </td>
              <td>CURRENT SPENT</td>
              <td>
                {doorstaff.weekly.length > 0
                  ? doorstaff.weekly
                    .map((i) => i.actualValue)
                    .reduce((a, b) => a + b)
                  : null}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
