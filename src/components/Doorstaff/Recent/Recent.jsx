import s from "./Recent.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { TableTemplate } from "../../Shared/TableTemplate/TableTemplate";
import { GeneratePDF } from "../../../services/utils/reportUtils";
import { GetDoorstaffRecentAPI } from "../../../services/reportApi";
import * as DoorstaffActions from "../../../redux/actions/doorstaffActions";

export const Recent = (props) => {
  const tableHeader = [
    {
      Header: "NAME",
      accessor: "staffName",
    },
    {
      Header: "SUPPLIER",
      accessor: "supplierName",
    },
    {
      Header: "JOB",
      accessor: "rateGroupName",
    },
    {
      Header: "START TIME",
      accessor: "start",
      Cell: ({ value }) => {
        return value.split("T").join("/");
      },
    },
    {
      Header: "END TIME",
      accessor: "finish",
      Cell: ({ value }) => {
        return value.split("T").join("/");
      },
    },
    {
      Header: "APPROVAL LEVEL",
      accessor: "status",
    },
    {
      Header: "PRINT",
      accessor: "centralCostId",
      Cell: ({ row }) => (
        <div>
          <button
            onClick={() => {
              GeneratePDF(token, "S", row.original.activityId, dispatch);
            }}
          >
            PRINT
          </button>
        </div>
      ),
    },
  ];

  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.user.access_token);

  const recent = useSelector((state) => state.doorstaffReducer.recent);
  const dispatch = useDispatch();

  const today = new Date();
  const weekBefore = new Date(today);
  weekBefore.setDate(weekBefore.getDate() - 7);
  const weekBeforeString = weekBefore.toISOString().split("T")[0];
  const [fDate, setFromDate] = useState(weekBeforeString);
  const [tDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  function Submit(e) {
    e.preventDefault();

    const fromDate = new Date(e.target[0].value).toISOString();
    const toDate = new Date(e.target[1].value).toISOString();

    GetDoorstaffRecentAPI(user, fromDate, toDate, "S").then((res) => {
      dispatch(DoorstaffActions.GetDoorstaffRecent(res.data.reportRecord));
    });
  }

  return (
    <div className={s.container}>
      <form onSubmit={Submit}>
        <div>
          <label htmlFor="">FROM</label>
          <input
            type="date"
            name="from-date"
            id="from-date"
            value={fDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="">TO</label>
          <input
            type="date"
            name="to-date"
            id="to-date"
            value={tDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
        <div className={s.view_btn}>
          {" "}
          <button>VIEW</button>
        </div>
      </form>
      <TableTemplate columns={tableHeader} data={recent}></TableTemplate>
    </div>
  );
};
