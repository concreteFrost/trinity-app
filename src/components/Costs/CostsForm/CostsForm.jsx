import s from "./CostsForm.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { GetCosts } from "../../../redux/api/costAPI";

export const CostsForm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.userReducer.user.access_token);
    const date = useSelector(state => state.costsReducer.date);

    function ChangeDate(e) {

        dispatch({ type: "SET_COSTS_DATE", data: e.target.value })
       

    }

    function SubmitForm(e) {
        e.preventDefault();
        dispatch(GetCosts(token, date))
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

