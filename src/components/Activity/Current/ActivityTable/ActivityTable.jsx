import s from "./ActivityTable.module.scss"
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetActivity } from "../../../../redux/api/activityApi";


export const ActivityTable = (props) => {

  const token = useSelector((state) => state.userReducer.user.access_token);
  const currentActivity = useSelector(s => s.getActivityReducer.current)
  const today = new Date()
  const yesterday = new Date(new Date().setDate(today.getDate() - 1));

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetActivity(token,new Date(yesterday).toISOString(),new Date(today).toISOString(),"C"));
  },[])

  return (
    <div className={s.container}>
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
            {props.isVisible ? <th>EDIT</th> : null}
          </tr>
        </thead>
        <tbody>
          {currentActivity.length > 0 ? currentActivity.map((e) =>

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
}
