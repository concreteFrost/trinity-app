import s from "./DatesForm.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { GetDoorstaffRecentAPI } from "../../../../../services/reportApi";
import { GetDoorstaffAnalytics, GetCostsAnalytics } from "../../../../../redux/actions/analyticsActions";

export const DatesForm = () => {

    const analytics = useSelector(state => state.pubManagerAnalyticsReducer);
    const user = useSelector(state => state.userReducer.user);

    const dispatch = useDispatch();

    function _GetDoorstaffAnalytics() {
        GetDoorstaffRecentAPI(user, analytics.dateFrom, analytics.dateTo, "S").then((res) => {
            dispatch(GetDoorstaffAnalytics(res.data.reportRecord))
        })
    }

    function _GetCostsAnalytics() {
        GetDoorstaffRecentAPI(user, analytics.dateFrom, analytics.dateTo, "A").then((res) => {
            dispatch(GetCostsAnalytics(res.data.reportRecord))
        })
    }

    function Submit(e) {
        e.preventDefault();
        switch (analytics.currentType) {
            case "S":
                _GetDoorstaffAnalytics()
                break;
            case "A":
                _GetCostsAnalytics()
                break;
            case "C":
                _GetDoorstaffAnalytics()
                _GetCostsAnalytics()
                break;
        }
    }

    return (
        <div className={s.container}>
            <form onSubmit={Submit}>
                <div>
                    <label htmlFor="">FROM</label>
                    <input type="date" name="from-date" id="from-date" value={analytics.dateFrom}
                        onChange={(e) => { dispatch({ type: "SET_DATE_FROM_ANALYTICS", data: e.target.value }) }}></input>
                </div>
                <div>
                    <label htmlFor="">TO</label>
                    <input type="date" name="to-date" id="to-date" value={analytics.dateTo}
                        onChange={(e) => { dispatch({ type: "SET_DATE_TO_ANALYTICS", data: e.target.value }) }} />
                </div>
                <div className={s.view_btn}> <button>VIEW</button></div>
            </form>
        </div>

    )
}