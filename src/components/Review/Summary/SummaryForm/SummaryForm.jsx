import s from "./SummaryForm.module.scss"
import { useDispatch, useSelector } from "react-redux";
import {GetCosts} from '../../../../redux/api/costAPI'
import { SET_COSTS_DATE } from "../../../../redux/types";



export const SummaryForm = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user.access_token);
  const date = useSelector(state => state.costsReducer.date);

  function ChangeDate(e) {
    dispatch({ type: SET_COSTS_DATE, data: e.target.value })
  }

  async function SubmitForm(e) {
    e.preventDefault();
    dispatch({type:"SHOW_LOADER"})
    await dispatch(GetCosts(token, date))
    await dispatch({type:"HIDE_LOADER"})
   
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

