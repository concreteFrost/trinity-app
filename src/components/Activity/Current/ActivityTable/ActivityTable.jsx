import s from "./ActivityTable.module.scss"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TableTemplate } from "../../../Shared/TableTemplate/TableTemplate";
import { RefreshActivityList } from "../../../../services/utils/activityUtils";


export const ActivityTable = (props) => {

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
  ]

  const token = useSelector((state) => state.userReducer.user.access_token);
  const currentActivity = useSelector(s => s.getActivityReducer.current);

  const today = new Date()
  const yesterday = new Date(new Date().setDate(today.getDate() - 1));
  const dispatch = useDispatch();

  useEffect(() => {
    RefreshActivityList(token, new Date(yesterday).toISOString(), new Date(today).toISOString(), dispatch, "C")
  }, [])


  return (
    <div className={s.container}>

      <TableTemplate columns={tableHeader} data={currentActivity}></TableTemplate>

    </div>
  );
}
