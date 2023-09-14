import s from "./Authorise.module.scss";
import { CostsAndPayments } from "./CostsAndPayments/CostsAndPayments";
import { SwitchView } from "../Shared/SwitchView/SwitchView";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ViewAreaDisputedNote } from "../../redux/api/disputedApi";
import { Route, Routes } from "react-router-dom";
import { ArrowBarDown } from "react-bootstrap-icons";

export const Authorise = () => {

  const [_type, setType] = useState("costs");

  const doorstaff = useSelector((state) => state.authoriseReducer.doorstaff);
  const costs = useSelector((state) => state.authoriseReducer.costs);
  const token = useSelector((state) => state.userReducer.user.access_token);
  const userRole = useSelector((state) => state.userReducer.user.userRole);
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

  function toggleMoreActions(e) {
    let path = window.location.href;
    path.endsWith('doorstaff') ? dispatch({ type: "TOGGLE_MORE_ACTIONS_FOR_DOORSTAFF", data: e })
      : dispatch({ type: "TOGGLE_MORE_ACTIONS_FOR_COSTS", data: e })
  }

  function showRecallModal(activityId) {
    dispatch({ type: "SHOW_ACTION_MODAL", activityToModify: activityId, activityType: "RECALL" })
  }

  function showDeleteModal(activityId) {
    dispatch({ type: "SHOW_ACTION_MODAL", activityToModify: activityId, activityType: "DELETE" })
  }

  function showRecallIfno() {
    dispatch({ type: "SHOW_MODAL_MESSAGE", data: 'helpfull message' })
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
        <div className={s.actions_wrapper}>
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
            <button onClick={() => toggleMoreActions(row.original.activityId)}>MORE</button>
          </div>
          {row.original.moreActionsVisible ? <div className={s.additional_actions}>
            <div className={s.icon}>  <ArrowBarDown></ArrowBarDown></div>
            <div className={s.additional_action_item}>

              <button className={s.recall} onClick={() => showRecallModal(row.original.activityId)}>RECALL</button>
              <button className={s.question} onClick={showRecallIfno}>?</button>
            </div>
            {userRole === '1' ? <div className={s.additional_action_item}>
              <button className={s.delete} onClick={() => showDeleteModal(row.original.activityId)}>DELETE</button>
              <button className={s.question}>?</button>
            </div> : null}
          </div> : null}
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
