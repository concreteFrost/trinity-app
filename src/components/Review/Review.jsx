import s from "./Review.module.scss";
import {Analytics} from "./Analytics/Analytics"
import { SummaryForm } from "./Summary/SummaryForm/SummaryForm";
import { SummaryTable } from "./Summary/SummaryTable/SummaryTable";
import { SwitchView } from "../Shared/SwitchView/SwitchView"
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

export const Review = () => {

  const doorstaff = useSelector((state) => state.costsReducer.doorstaff);
  const costs = useSelector((state) => state.costsReducer.costs);

  return (
    <div className={s.container}>
      <header>
        <h1>SUMMARY REVIEW</h1>
        <SwitchView
          inputs={["summary", "analytics"]}
          currentView="summary"
        ></SwitchView>
      </header>

      <Routes>
        <Route path="summary" element={<div className={s.summary_container}>
          <SummaryForm></SummaryForm>
          <div>
            <h3>DOORSTAFF</h3>
            <SummaryTable data={doorstaff}></SummaryTable>
          </div>
          <div>
            <h3>OTHER</h3>
            <SummaryTable data={costs}></SummaryTable>
          </div>
        </div >}></Route>
        <Route path="analytics" element={<Analytics></Analytics>}></Route>
      </Routes>

    </div>
  );
};
