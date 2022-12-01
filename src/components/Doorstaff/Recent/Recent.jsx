import s from "./Recent.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GET_RECENT_DOORSTAFF } from "../../../redux/types";
import axios from "axios";
import { TableTemplate } from "../../TableTemplate/TableTemplate";

export const Recent = (props) => {
  const tableHeader = [
    {
      Header: "NAME",
      accessor:"staffName",
    },
    {
      Header: "SUPPLIER",
      accessor:'supplierName'
    },
    {
      Header: "JOB",
      accessor:"rateGroupName"
    },
    {
      Header: "START TIME",
      accessor:"start",
      Cell: ({ value }) => {
        return value.split('T').join('/');
      }
    },
    {
      Header: "END TIME",
      accessor:"finish",
      Cell: ({ value }) => {
        return value.split('T').join('/');
      }
    },
    {
      Header: "APPROVAL LEVEL",
      accessor:"status"
    },


    ,]

  const user = useSelector((state) => state.userReducer.user);

  const recent = useSelector((state) => state.doorstaffReducer.recent);
  const dispatch = useDispatch();
    console.log(recent)
  const [fDate, setFromDate] = useState(new Date().toISOString().split("T")[0]);
  const [tDate, setToDate] = useState(new Date().toISOString().split("T")[0]);

  function Submit(e) {
    e.preventDefault()

    const fromDate = new Date(e.target[0].value).toISOString();
    const toDate = new Date(e.target[1].value).toISOString();

    axios({
      url: "https://testapi.etrinity.services/TrinityWebApi/api/Report/ActivityList",
      headers: {
        Authorization: "Bearer " + user.access_token,
        "Content-Type": "application/json",
      },
      method: "POST",
      data: {
        dateFrom: fromDate,
        dateTo: toDate,
        locationId: parseInt(user.locationId),
        locationGroupId: 0,
        supplierId: 0,
        reference: 0,
        paymentStatusId:0
      },
    })
      .then((res) => {
        dispatch({type: GET_RECENT_DOORSTAFF, data : res.data.reportRecord})
      })
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
