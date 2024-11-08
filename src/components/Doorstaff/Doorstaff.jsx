import s from "./Doorstaff.module.scss";
import { SignIn } from "./SignIn/SignIn";
import { Current } from "./Current/Current";
import { SIA } from "./SIA/SIA";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Recent } from "./Recent/Recent";
import { Disputed } from "../Shared/Disputed/Disputed";
import { SwitchView } from "../Shared/SwitchView/SwitchView";
import { Route, Routes } from "react-router-dom";
import { GetDisputedActivityAPI } from "../../services/disputedApi";
import * as DoorstaffActions from "../../redux/actions/doorstaffActions";

const initialDoorstaff = {
  siaNumber: 0,
  doorstaff: { firstName: "", lastName: "", staffId: -1 },
  position: { positionId: -1, positionName: "" },
  supplier: {
    supplierId: -1,
    supplierName: "",
  },
  rateId: -1,
  date: new Date().toISOString().split("T")[0],
  time: new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }),
  options: {
    positions: [],
    suppliers: [],
    rates: [],
  },
};

export const Doorstaff = () => {
  const [view, setView] = useState("current");

  const token = useSelector((state) => state.userReducer.user.access_token);
  const [sia, setSia] = useState(initialDoorstaff);

  function clearDoorstaffData() {
    setSia(initialDoorstaff);
  }

  const dispatch = useDispatch();

  const disputedctivity = useSelector((s) => s.doorstaffReducer.disputed);
  useEffect(() => {
    GetDisputedActivityAPI(token, "S").then((res) => {
      dispatch(DoorstaffActions.GetDisputedDoorstaff(res.data.reportRecord));
    });
  }, []);

  return (
    <div className={s.container}>
      <header>
        <h1>DOORSTAFF MANAGEMENT</h1>
        <SwitchView
          inputs={["current", "recent", "disputed"]}
          currentView={view}
          countedActivity={disputedctivity.length}
        ></SwitchView>
      </header>
      <main>
        <Routes>
          <Route
            path="current"
            element={
              <>
                {" "}
                <SIA
                  sia={sia}
                  setSia={setSia}
                  clearDoorstaffData={clearDoorstaffData}
                ></SIA>
                <SignIn
                  sia={sia}
                  setSia={setSia}
                  clearDoorstaffData={clearDoorstaffData}
                ></SignIn>
                <Current isVisible={true}></Current>
              </>
            }
          ></Route>
          <Route
            path="recent"
            element={<Recent isVisible={true}></Recent>}
          ></Route>
          <Route
            path="disputed"
            element={<Disputed data={disputedctivity} system={"S"}></Disputed>}
          ></Route>
        </Routes>
      </main>
    </div>
  );
};
