import s from "./SummaryForm.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { HideLoader, ShowLoader } from "../../../../redux/actions/loaderActions";
import { GetSummaryReviewAPI } from "../../../../services/reportApi";
import * as DoorstaffActions from "../../../../redux/actions/doorstaffActions";
import * as ActivityActions from "../../../../redux/actions/activityActions";
import { GetBadResponse, GetResponse } from "../../../../redux/actions/debugConsoleActions";

export const SummaryForm = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user.access_token);
  const date = useSelector(state => state.costsReducer.date);

  function ChangeDate(e) {
    dispatch(ActivityActions.SetCostsDate(e.target.value))
  }
  async function SubmitForm(e) {
    e.preventDefault();
    dispatch(ShowLoader());
    await GetSummaryReviewAPI(token, date, "D").then((res) => {
      dispatch(GetResponse('get summary review success', res))
      dispatch(DoorstaffActions.GetDoorstaffSummaryDaily(res.data.summaryRecords))
      dispatch(ActivityActions.GetCostsSummaryDaily(res.data.summaryRecords))
    }).catch((e) => {
      dispatch(GetBadResponse('get summary review error', e))
    })
    await GetSummaryReviewAPI(token, date, "W").then((res) => {
      dispatch(GetResponse('get summary review success', res))
      dispatch(DoorstaffActions.GetDoorstaffSummaryWeekly(res.data.summaryRecords))
      dispatch(ActivityActions.GetCostsSummaryWeekly(res.data.summaryRecords))
    }).catch((e) => {
      dispatch(GetBadResponse('get summary review error', e))
    })
    await GetSummaryReviewAPI(token, date, "M").then((res) => {
      dispatch(GetResponse('get summary review success', res))
      dispatch(DoorstaffActions.GetDoorstaffSummaryMonthly(res.data.summaryRecords))
      dispatch(ActivityActions.GetCostsSummaryMonthly(res.data.summaryRecords))
    }).catch((e) => {
      dispatch(GetBadResponse('get summary review error', e))
    })
    await dispatch(HideLoader());
  }
  return (
    <div className={s.container}>

      <form onSubmit={SubmitForm}>
        <label htmlFor="">PERIOD</label>
        <input type="date" name="search-date" id="search-date" value={date} onChange={ChangeDate} />
        <button>VIEW</button>
      </form>


    </div>)
}

