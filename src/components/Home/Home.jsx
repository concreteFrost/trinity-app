import s from "./Home.module.scss";
import { Summary } from "./Summary/Summary";
import { ActivityTable } from "../Activity/Current/ActivityTable/ActivityTable";
import { Current } from "../Doorstaff/Current/Current";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../contexts/baseUrl";
import axios from "axios";

export const Home = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user.access_token);

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
            dispatch({ type: "SET_DISPUTED_SIA_COUNT_MODAL", data :res.data.reportRecord.length });
          } else {
            dispatch({ type: "SET_DISPUTED_CC_COUNT_MODAL", data :res.data.reportRecord.length});
          }
          dispatch({type:"SET_MODAL_MESSAGE_HEADER", data: "Review disputes"})
          dispatch({ type: "SHOW_MODAL_MESSAGE", data: ""});
        }
      });
  }
  if (shown===false)
    Promise.resolve(call("S"))
      .then(call("A"))
      .finally(() => {
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
