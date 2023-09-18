import s from "./Authorise.module.scss";
import { CostsAndPayments } from "./CostsAndPayments/CostsAndPayments";
import { SwitchView } from "../Shared/SwitchView/SwitchView";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { ColumnActions } from "./TableElements/ColumnActions";
import { NoteElement } from "./TableElements/NoteElement";
import { TypeSelect } from "./TypeSelect/TypeSelect";

export const Authorise = () => {

  const [_type, setType] = useState("costs");

  const doorstaff = useSelector((state) => state.authoriseReducer.doorstaff);
  const costs = useSelector((state) => state.authoriseReducer.costs);

  const [showAuthLevel, setShowAuthLevel] = useState("status");

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
      accessor: "disputedNotes",
      Cell: ({ row }) => (
        row.original.disputedNotes ? <NoteElement row={row}></NoteElement> : null
      ),
    },
    {
      Header: "ACTIONS",
      accessor: "activityId",
      Cell: ({ row }) => (
        <ColumnActions row={row} checkMethod={checkMethod}></ColumnActions>
      ),
    },
  ];

  function _setShowAuthLevel(value) {
    setShowAuthLevel(value)
  }

  function _setType(value) {
    setType(value);
  }

  return (
    <div className={s.container}>
      <header>
        <h1>AUTHORISE</h1>
        <SwitchView
          inputs={["doorstaff", "costs"]}
        ></SwitchView>
      </header>

      <main>
        <TypeSelect setShowAuthLevel={_setShowAuthLevel} setType={_setType} ></TypeSelect>
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
