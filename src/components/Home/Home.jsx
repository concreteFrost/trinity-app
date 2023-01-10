import s from "./Home.module.scss";
import { Summary } from "./Summary/Summary";
import { ActivityTable } from "../Activity/Current/ActivityTable/ActivityTable";
import { Current } from "../Doorstaff/Current/Current";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../contexts/baseUrl";
import axios from "axios";
import { useState } from "react";

export const Home = () => {
  const dispatch = useDispatch();
  let count = 0;
  const token = useSelector((state) => state.userReducer.user.access_token);
  const disputedCount = useSelector(
    (state) => state.modalMessageReducer.disputedCount
  );
  const [isLoading, setIsLoading] = useState(true);
  const shown = JSON.parse(localStorage.getItem("activityShown"));

  async function call(system) {
    await axios
      .get(baseUrl + "/Disputed/ActivityList?system=" + system, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        if (res.data.reportRecord.length > 0) {
          if (system === "S") {
            dispatch({ type: "SHOW_DISPUTED_SIA_MODAL", data :res.data.reportRecord.length });
          } else {
            dispatch({ type: "SHOW_DISPUTED_CC_MODAL", data :res.data.reportRecord.length});
          }

        }
      });
  }
  if (isLoading)
    Promise.resolve(call("S"))
      .then(call("A"))
      .finally(() => {
        dispatch({ type: "SHOW_MODAL_MESSAGE", data: ""});
        setIsLoading(false);
      });

  return (
    <div className={s.container}>
      <header>
        <h1> SIA DOORSTAFF & CENTRAL COSTS MANAGEMENT SYSTEM</h1>
      </header>
      <main>
        <Summary></Summary>
        <div>
          <header>
            <h2>Doorstaff onsite</h2>
          </header>
          <Current></Current>
        </div>
        <div>
          <header>
            <h2>Activity list</h2>
          </header>
          <ActivityTable></ActivityTable>
        </div>
      </main>
    </div>
  );
};
