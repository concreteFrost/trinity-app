import s from "./SummaryForm.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { SET_COSTS_DATE } from "../../../../redux/types";
import { GetCostsSummaryDaily, GetCostsSummaryWeekly, GetCostsSummaryMonthly, GetDoorstaffSummaryDaily, GetDoorstaffSummaryMonthly, GetDoorstaffSummaryWeekly, HideLoader, ShowLoader } from "../../../../redux/actions";
import { GetSummaryReviewAPI } from "../../../../services/reportApi";




export const SummaryForm = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user.access_token);
  const date = useSelector(state => state.costsReducer.date);

  function ChangeDate(e) {
    dispatch({ type: SET_COSTS_DATE, data: e.target.value })

  }

  async function SubmitForm(e) {
    e.preventDefault();
    dispatch(ShowLoader());
    await GetSummaryReviewAPI(token, date, "D").then((res) => {
      dispatch(GetDoorstaffSummaryDaily(res.data.summaryRecords))
      dispatch(GetCostsSummaryDaily(res.data.summaryRecords))
    })
    await GetSummaryReviewAPI(token, date, "W").then((res) => {
      dispatch(GetDoorstaffSummaryWeekly(res.data.summaryRecords))
      dispatch(GetCostsSummaryWeekly(res.data.summaryRecords))
    })
    await GetSummaryReviewAPI(token, date, "M").then((res) => {
      dispatch(GetDoorstaffSummaryMonthly(res.data.summaryRecords))
      dispatch(GetCostsSummaryMonthly(res.data.summaryRecords))
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

