import s from "./DatesForm.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { SET_AREA_MANAGER_ANALYTICS_DATE_TO, SET_AREA_MANAGER_ANALYTICS_DATE_FROM } from "../../../../../redux/types";
import { GetAreaManagerAnalytics } from "../../../../../redux/api/areaManagerAnalyticsAPI";
import { HideLoader, ShowLoader } from "../../../../../redux/actions";


export const DatesForm = () => {
  const analytics = useSelector((state) => state.areaManagerAnalyticsReducer);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  async function Submit(e) {
    e.preventDefault();

    dispatch(ShowLoader());
    await dispatch(GetAreaManagerAnalytics("S", user, analytics))
    await dispatch(GetAreaManagerAnalytics("A", user, analytics))
    dispatch(HideLoader());
  }
  return (
    <div className={s.container}>
      <form onSubmit={Submit}>
        <div>
          <label>FROM</label>
          <input
            type="date"
            value={analytics.dateFrom}
            onChange={(e) => {
              dispatch({
                type: SET_AREA_MANAGER_ANALYTICS_DATE_FROM,
                data: e.target.value,
              });
            }}
          ></input>
        </div>
        <div>
          <label>TO</label>
          <input
            type="date"
            value={analytics.dateTo}
            onChange={(e) => {
              dispatch({
                type: SET_AREA_MANAGER_ANALYTICS_DATE_TO,
                data: e.target.value,
              });
            }}
          />
        </div>
        <div className={s.view_btn}>
          <button>VIEW</button>
        </div>
      </form>
    </div>
  );
};
