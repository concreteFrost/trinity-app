import s from "./DatesForm.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GetAreaManagerAnalytics } from "../../../../../services/utils/reportUtils";
import {  SetAreaManagerAnalyticsDateFrom, SetAreaManagerAnalyticsDateTo} from "../../../../../redux/actions/analyticsActions";
import { ShowLoader,HideLoader } from "../../../../../redux/actions/loaderActions";


export const DatesForm = () => {
  const analytics = useSelector((state) => state.areaManagerAnalyticsReducer);
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  async function Submit(e) {
    e.preventDefault();

    dispatch(ShowLoader());
    await GetAreaManagerAnalytics("S", user.access_token, analytics, dispatch)
    await GetAreaManagerAnalytics("A", user.access_token, analytics, dispatch)
    await dispatch(HideLoader());


  }
  return (
    <div className={s.container}>
      <form onSubmit={(e) => Submit(e)}>
        <div>
          <label>FROM</label>
          <input
            type="date"
            value={analytics.dateFrom}
            onChange={(e) => { dispatch(SetAreaManagerAnalyticsDateFrom(e.target.value)) }}
          ></input>
        </div>
        <div>
          <label>TO</label>
          <input
            type="date"
            value={analytics.dateTo}
            onChange={(e) => { dispatch(SetAreaManagerAnalyticsDateTo(e.target.value)) }}
          />
        </div>
        <div className={s.view_btn}>
          <button>VIEW</button>
        </div>
      </form>
    </div>
  );
};
