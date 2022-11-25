import s from "./CostsForm.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { GetCosts } from "../../../redux/api/costAPI";
import { TailSpin } from "react-loader-spinner";
import { useState } from "react";


export const CostsForm = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user.access_token);
  const date = useSelector(state => state.costsReducer.date);

  // const f = fetch('https://testapi.etrinity.services/TrinityWebApi/api/Report/SummaryReview?system=S&workingDate=2022-11-22&summaryCode=D', {
  //   method: "GET",
  //   headers: {
  //     Authorization: "Bearer " + token,
  //     "Content-Type": "application/json",
  //   },
  // })

  // f.then(r => r.json()).then(d => d)

  function ChangeDate(e) {
    dispatch({ type: "SET_COSTS_DATE", data: e.target.value })
  }

  function SubmitForm(e) {
    e.preventDefault();
    dispatch(GetCosts(token, date, "S"))
    dispatch(GetCosts(token, date, "A"))
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

