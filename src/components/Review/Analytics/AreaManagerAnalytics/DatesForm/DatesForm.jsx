import s from "./DatesForm.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { SET_AREA_MANAGER_ANALYTICS_DATE_TO, SET_AREA_MANAGER_ANALYTICS_DATE_FROM } from "../../../../../redux/types";
import { GetAreaManagerAnalytics } from "../../../../../redux/api/areaManagerAnalyticsAPI";
import { TailSpin } from "react-loader-spinner";
import "../../../../../scss/global.scss"


export const DatesForm = () => {
  const analytics = useSelector((state) => state.areaManagerAnalyticsReducer);
  const user = useSelector((state) => state.userReducer.user);

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  async function Submit(e) {
    e.preventDefault();

    setIsLoading(true)
    await dispatch(GetAreaManagerAnalytics("S", user, analytics))
    await dispatch(GetAreaManagerAnalytics("A", user, analytics))
    setIsLoading(false)
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

      {isLoading === true ? (
        <div className="tail_spin_container">
          <div className="tail_spin">
            <TailSpin width={150} height={150} color={"#42aaf5"}></TailSpin>
          </div>{" "}
        </div>
      ) : null}
    </div>
  );
};
