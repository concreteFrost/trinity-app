import s from "./Recent.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { TableTemplate } from "../../Shared/TableTemplate/TableTemplate";
import { GetActivityAPI } from "../../../services/reportApi";
import { GetActivityRecents } from "../../../redux/actions";
import { GeneratePDF } from "../../../services/utils/reportUtils";

export const Recent = () => {

  const tableHeader = [
    {
      Header: "TIME",
      accessor: "startTime",
      Cell: ({ value }) => {
        return value.split('T')[0];
      }
    },
    {
      Header: "HOURS WORKED",
      accessor: 'hoursWorked'
    },
    {
      Header: "COST",
      accessor: "costValue"
    },
    {
      Header: "SUPPLIER",
      accessor: "supplierName"
    },
    {
      Header: "ANALYSIS",
      accessor: "staffGroupName"
    },
    {
      Header: "STATUS LEVEL",
      accessor: "paymentStatusDesc"
    },
    {
      Header: "NOTE",
      accessor: "description"
    },
    {
      Header: "PRINT",
      accessor: 'centralCostId',
      Cell: ({ row }) => (
        <div>
          <button
            onClick={() => { getTimesheetData(row.original.centralCostId) }}
          >
            PRINT
          </button>
        </div>
      ),
    }

    ,]

  const token = useSelector((state) => state.userReducer.user.access_token);

  const recentActivity = useSelector(s => s.getActivityReducer.recent)
  const dispatch = useDispatch();

  const [fromDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
  const [toDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  function Submit(e) {
    e.preventDefault()

    const fromDate = new Date(e.target[0].value).toISOString();
    const toDate = new Date(e.target[1].value).toISOString();

    if (fromDate.length > 0 && toDate.length > 0)

      GetActivityAPI(token, fromDate, toDate).then((res) => {
        console.log('get recent activity success', res)
        dispatch(GetActivityRecents(res.data.records))
      }).catch((e) => console.log('get recent activity error', e))
  }

  function getTimesheetData(activityId) {
    GeneratePDF(token, "A", activityId, dispatch);
  }

  return (
    <div className={s.container}>
      <form onSubmit={Submit}>
        <div>
          <label htmlFor="">FROM</label>
          <input type="date" name="from-date" id="from-date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="">TO</label>
          <input type="date" name="to-date" id="to-date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <div className={s.view_btn}> <button>VIEW</button></div>
      </form>
      <TableTemplate columns={tableHeader} data={recentActivity}></TableTemplate>

    </div>
  );
};
