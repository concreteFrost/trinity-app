import s from "./Activity.module.scss";
import { AddActivity } from "./Current/AddActivity/AddActivity";
import { ActivityTable } from "./Current/ActivityTable/ActivityTable";
import { SwitchView } from "../Shared/SwitchView/SwitchView";
import { Recent } from "./Recent/Recent";
import { Disputed } from "../Shared/Disputed/Disputed";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetDisputedActivity } from "../../redux/actions";
import { Route, Routes } from "react-router-dom";
import { GetDisputedActivityAPI } from "../../services/disputedApi";

export const Activity = () => {
  const token = useSelector((state) => state.userReducer.user.access_token);
  const dispatch = useDispatch();

  const disputedctivity = useSelector((s) => s.getActivityReducer.disputed);
  useEffect(() => {
    GetDisputedActivityAPI(token, "A").then((res) => {

      dispatch(GetDisputedActivity(res.data.reportRecord))
    })

  }, []);

  return (
    <div className={s.container}>
      <header>
        <h1>CENTRAL COSTS MANAGEMENT</h1>
        <SwitchView
          inputs={["current", "recent", "disputed"]}
          currentView={"current"}
          countedActivity={disputedctivity.length}
        ></SwitchView>
      </header>
      <main>
        <Routes>
          <Route
            path="current"
            element={
              <>
                <AddActivity />
                <ActivityTable isVisible={true} />
              </>
            }
          ></Route>
          <Route path="recent" element={<Recent></Recent>}></Route>
          <Route
            path="disputed"
            element={<Disputed data={disputedctivity} system={"A"} />}
          ></Route>
        </Routes>
      </main>
    </div>
  );
};
