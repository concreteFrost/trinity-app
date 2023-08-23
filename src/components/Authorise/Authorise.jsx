import s from "./Authorise.module.scss";
import { CostsAndPayments } from "./CostsAndPayments/CostsAndPayments";
import { SwitchView } from "../Shared/SwitchView/SwitchView";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ViewAreaDisputedNote } from "../../redux/api/disputedApi";
import { Route, Routes } from "react-router-dom";

export const Authorise = () => {
  const [view, setView] = useState("doorstaff");
  const [_type, setType] = useState("costs");

  const doorstaff = useSelector((state) => state.authoriseReducer.doorstaff);
  const token = useSelector((state) => state.userReducer.user.access_token);
  const costs = useSelector((state) => state.authoriseReducer.costs);
  const [showAuthLevel, setShowAuthLevel] = useState("status");
  const dispatch = useDispatch();

  function handleCheck(e, actions, id) {
    dispatch({
      type: actions,
      data: { id: parseInt(id), selected: e.target.checked },
    });
  }
  function viewNote(paymentAuthId, system, token) {
    dispatch(ViewAreaDisputedNote(token, system, paymentAuthId));
  }

  const tableHeaders = (system, checkMethod) => [
    {
      Header: "START",
      accessor: "start",
    },
    {
      Header: "FINISH",
      accessor: "finish",
    },
    {
      Header: "PUB",
      accessor: "locationName",
    },
    {
      Header: "SUPPLIER",
      accessor: "supplierName",
    },
    {
      Header: system === "S" ? "NAME" : "ANALYSIS",
      accessor: "staffName",
    },
    {
      Header: "AUTH LEVEL",
      accessor: "status",
    },
    {
      Header: "POSITION",
      accessor: "jobRoleName",
    },
    {
      Header: "COST",
      accessor: "cost",
    },
    {
      Header: "NOTES",
      accessor: "note",
      Cell: ({ row }) => (
        <div>
          <button
            onClick={() => viewNote(row.original.activityId, system, token)}
          >
            NOTE
          </button>
        </div>
      ),
    },
    {
      Header: "ACTIONS",
      accessor: "activityId",
      Cell: ({ row }) => (
        <div className={s.actions}>
          <input
            type="checkbox"
            name={row.original.activityId}
            id={row.original.activityId}
            onChange={(e) => {
              handleCheck(e, checkMethod, row.original.activityId);
            }}
            checked={row.original.selected}
          />

          <button
            onClick={() => {
              dispatch({ type: "SHOW_MODAL_PROMPT" });
              dispatch({
                type: "SET_DISPUTED_PAYMENT_ID",
                data: row.original.activityId,
              });
            }}
          >
            DISPUTE
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className={s.container}>
      <header>
        <h1>AUTHORISE</h1>
        <SwitchView

          inputs={["doorstaff", "costs"]}
          currentView={view}
        ></SwitchView>
      </header>

      <main>
        <div className={s.locations_select}>
          <label htmlFor="select-doorstaff">TYPE</label>
          <select
            name="select-doorstaff"
            id="selecet-doorstaff"
            onChange={(e) => {
              setType(e.target.value);
              e.target.value === "payments"
                ? setShowAuthLevel("")
                : setShowAuthLevel("status");
            }}
          >
            <option value="costs">Costs</option>
            <option value="payments">Payments</option>
          </select>
        </div>
        <div className={s.table}>
          <Routes>
            <Route
              path="doorstaff"
              element={
                <CostsAndPayments
                  data={doorstaff}
                  tableToHide={showAuthLevel}
                  system="S"
                  tableHeaders={tableHeaders("S", "CHECK_AUTHORISE_DOORSTAFF")}
                  container={s.container}
                  title={"Doorstaff Costs"}
                />
              }
            ></Route>
            <Route
              path="costs"
              element={
                <CostsAndPayments
                  tableToHide={showAuthLevel}
                  data={costs}
                  system="A"
                  tableHeaders={tableHeaders("A", "CHECK_AUTHORISE_COSTS")}
                  container={s.container}
                  title={"Costs"}
                />
              }
            ></Route>
          </Routes>
        </div>
      </main>
    </div>
  );
};
