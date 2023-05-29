import s from "./Activities.module.scss";
import { ActivitiesForm } from "./ActivitiesForm/ActivitiesForm";
import { ActivitiesTable } from "./ActivitiesTable/ActivitiesTable";
import { SwitchView } from "../../Shared/SwitchView/SwitchView";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";

export const Activities = () => {
  const [view, setView] = useState("activities");
  const activities = useSelector(
    (state) => state.searchActivitiesReducer.searchedActivities
  );

  const centralCosts = useSelector((state) => state.searchActivitiesReducer.searchedCentralCosts)
  return (
    <div className={s.container}>
      <header>
        <h1>SEARCH</h1>
        <SwitchView
          inputs={["activities", "central costs"]}
          currentView={view}
          countedActivity={null}
        ></SwitchView>
      </header>

      <Routes>
        <Route
          path="activities"
          element={
            <>
              <ActivitiesForm currentView={"activities"} system={"S"} header={"ACTIVITIES"} />
              <ActivitiesTable data={activities}></ActivitiesTable>
            </>
          }
        ></Route>
        <Route
          path="central costs"
          element={
            <>
              <ActivitiesForm currentView={"central costs"} system={"A"} header={"CENTRAL COSTS"} />{" "}
              <ActivitiesTable data={centralCosts}></ActivitiesTable>
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
};
