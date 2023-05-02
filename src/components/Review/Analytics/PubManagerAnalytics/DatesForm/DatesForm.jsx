import s from "./DatesForm.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { GetAnalytics} from "../../../../../redux/api/pubManagerAnalyticsAPI"

export const DatesForm = () => {

    const analytics = useSelector(state => state.pubManagerAnalyticsReducer);
    const user = useSelector(state => state.userReducer.user);

    const dispatch = useDispatch();

    function Submit(e) {
        e.preventDefault();
        switch (analytics.currentType) {
            case "S":
                dispatch(GetAnalytics(user.access_token, analytics.dateFrom, analytics.dateTo, user,"S"))
                break;
            case "A":
                dispatch(GetAnalytics(user.access_token, analytics.dateFrom, analytics.dateTo, user,"A"))
                break;
            case "C":
                dispatch(GetAnalytics(user.access_token, analytics.dateFrom, analytics.dateTo, user,"S"))
                dispatch(GetAnalytics(user.access_token, analytics.dateFrom, analytics.dateTo, user,"A"))
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