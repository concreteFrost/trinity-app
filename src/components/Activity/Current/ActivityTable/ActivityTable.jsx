import s from "./ActivityTable.module.scss"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetActivity } from "../../../../redux/api/activityApi";
import { TableTemplate } from "../../../Shared/TableTemplate/TableTemplate";
import { GetTimesheetData } from "../../../../redux/api/receiptAPI";


export const ActivityTable = (props) => {

  const tableHeader = [
    {
      Header: "TIME",
      accessor:"startTime",
      Cell: ({ value }) => {
        return value.split('T')[0];
      }
    },
    {
      Header: "HOURS WORKED",
      accessor:'hoursWorked'
    },
    {
      Header: "COST",
      accessor:"costValue"
    },
    {
      Header: "SUPPLIER",
      accessor:"supplierName"
    },
    {
      Header: "ANALYSIS",
      accessor:"staffGroupName"
    },
    {
      Header: "STATUS LEVEL",
      accessor:"paymentStatusDesc"
    },
    {
      Header: "NOTE",
      accessor:"description"
    },
    {
      Header:"PRINT",
      accessor:'centralCostId',
      Cell: ({ row }) => (
        <div>
          <button
            onClick={() => {getTimesheetData(row.original.centralCostId)}}
          >
            PRINT
          </button>
        </div>
      ),
    }

    ,]

  const token = useSelector((state) => state.userReducer.user.access_token);
  const currentActivity = useSelector(s => s.getActivityReducer.current);
  const activityReceiptData = useSelector((state)=> state.receiptReducer);

  const today = new Date()
  const yesterday = new Date(new Date().setDate(today.getDate() - 1));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetActivity(token,new Date(yesterday).toISOString(),new Date(today).toISOString(),"C"));
    
  },[])

  function getTimesheetData(activityId){
    dispatch(GetTimesheetData(token,"A", activityId))
    console.log('aaaaaaa',activityReceiptData)
  }

  return (
    <div className={s.container}>
      
         <TableTemplate columns={tableHeader} data={currentActivity}></TableTemplate>

    </div>
  );
}
