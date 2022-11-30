import s from "./Recent.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GetActivity } from "../../../redux/api/activityApi";
import { useState } from "react";


export const Recent = (props) => {

  const token = useSelector((state) => state.userReducer.user.access_token);

  const recentActivity = useSelector(s => s.getActivityReducer.recent)
  const dispatch = useDispatch();
  
  const [fromDate,setFromDate] = useState(new Date().toISOString().split("T")[0]);
  const [toDate,setToDate] = useState(new Date().toISOString().split("T")[0]);


  function Submit(e) {
    e.preventDefault()
    
    const fromDate = new Date(e.target[0].value).toISOString();
    const toDate = new Date(e.target[1].value).toISOString();

    console.log('from date' ,fromDate)

    if(fromDate.length>0 && toDate.length>0)
    dispatch(GetActivity(token, fromDate, toDate, "R"));

  
  }

  return (
    <div className={s.container}>
      <form onSubmit={Submit}>
        <div>
          <label htmlFor="">FROM</label>
          <input type="date" name="from-date" id="from-date" value={fromDate} onChange={(e)=>setFromDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="">TO</label>
          <input type="date" name="to-date" id="to-date" value={toDate} onChange={(e)=>setToDate(e.target.value)} />
        </div>
        <div className={s.view_btn}> <button>VIEW</button></div>

      </form>
      <table className={s.doorstaff_table}>
        <thead>
          <tr>
            <th>TIME</th>
            <th>HOURS WORKED</th>
            <th>COST</th>
            <th>SUPPLIER</th>
            <th>ANALYSIS</th>
            <th>STATUS LEVEL</th>
            <th>NOTE</th>
            <th>EDIT</th>
          </tr>
        </thead>
        <tbody>
     
            {recentActivity.length > 0 ? recentActivity.map((e) =>

              <tr key={e.centralCostId}>
                <td>{e.startTime.split("T").join('/')}</td>

                <td>{e.hoursWorked}</td>
                <td>{e.costValue}</td>
                <td>{e.supplierName}</td>
                <td>{e.staffGroupName}</td>
                <td>{e.paymentStatusDesc}</td>
                <td>{e.description}</td>
                <td><button>EDIT</button></td></tr>

            ) : null}

        </tbody>
      </table>
    </div>
  );
};
