import s from "./Recent.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import moment from "moment/moment";
import { GET_RECENT_DOORSTAFF } from "../../../redux/types";
import axios from "axios";
import { TableTemplate } from "../../Shared/TableTemplate/TableTemplate";
import { baseUrl } from "../../../contexts/baseUrl";
import { GetTimesheetData } from "../../../redux/api/receiptAPI";

export const Recent = () => {
  const tableHeader = [
    {
      Header: "NAME",
      accessor: "staffName",
    },
    {
      Header: "SUPPLIER",
      accessor: 'supplierName'
    },
    {
      Header: "JOB",
      accessor: "rateGroupName"
    },
    {
      Header: "START TIME",
      accessor: "start",
      Cell: ({ value }) => {
        return value.split('T').join('/');
      }
    },
    {
      Header: "END TIME",
      accessor: "finish",
      Cell: ({ value }) => {
        return value.split('T').join('/');
      }
    },
    {
      Header: "APPROVAL LEVEL",
      accessor: "status"
    },
    {
      Header: "PRINT",
      accessor: 'centralCostId',
      Cell: ({ row }) => (
        <div>
          <button
            onClick={() => { getTimesheetData(row.original.activityId) }}
          >
            PRINT
          </button>
        </div>
      ),
    }
    ,]

  const user = useSelector((state) => state.userReducer.user);
  const token = useSelector((state) => state.userReducer.user.access_token);

  const recent = useSelector((state) => state.doorstaffReducer.recent);
  const dispatch = useDispatch();

  function getTimesheetData(activityId) {
    dispatch(GetTimesheetData(token, "S", activityId))
  }

  const today = new Date();
  const weekBefore = new Date(today);
  weekBefore.setDate(weekBefore.getDate() - 7);
  const weekBeforeString = weekBefore.toISOString().split("T")[0];
  const [fDate, setFromDate] = useState(weekBeforeString);
  const [tDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  function Submit(e) {
    e.preventDefault()

    const fromDate = moment(e.target[0].value).startOf('day'); // Set the time to 00:00:00.000
    const formattedfromDate = fromDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');
    const toDate = moment(e.target[1].value).endOf('day'); // Set the time to 23:59:59.999
    const formattedtoDate = toDate.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

    console.log(formattedfromDate);
    console.log(formattedtoDate);

    axios({
      url: baseUrl + "/Report/ActivityList?system=S",
      headers: {
        Authorization: "Bearer " + user.access_token,
        "Content-Type": "application/json",
      },
      method: "POST",
      data: {
        dateFrom: formattedfromDate,
        dateTo: formattedtoDate,
        locationId: parseInt(user.locationId),
        locationGroupId: 0,
        supplierId: 0,
        reference: 0,
        paymentStatusId: -1
      },
    })
      .then((res) => {
        dispatch({ type: GET_RECENT_DOORSTAFF, data: res.data.reportRecord })

      }).catch(e => console.log(e))
  }



  return (
    <div className={s.container}>
      <form onSubmit={Submit}>
        <div>
          <label htmlFor="">FROM</label>
          <input type="date" name="from-date" id="from-date" value={fDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="">TO</label>
          <input type="date" name="to-date" id="to-date" value={tDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <div className={s.view_btn}> <button>VIEW</button></div>
      </form>
      <TableTemplate columns={tableHeader} data={recent}></TableTemplate>

    </div>
  );
};
