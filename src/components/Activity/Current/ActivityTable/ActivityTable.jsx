import s from "./ActivityTable.module.scss"
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TableTemplate } from "../../../Shared/TableTemplate/TableTemplate";
import { GetActivityAPI } from "../../../../services/reportApi";
import { GET_CURRENT_ACTIVITY } from "../../../../redux/types";
import { GetActivityCurrent } from "../../../../redux/actions";


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
    GetActivityAPI(token, new Date(yesterday).toISOString(), new Date(today).toISOString()).then((res) => {
      console.log('get activity report success', res)
      dispatch(GetActivityCurrent(res.data.records))
    }).catch((e) => console.log('get activity error', e))

  }, [])


  return (
    <div className={s.container}>

      <TableTemplate columns={tableHeader} data={currentActivity}></TableTemplate>

    </div>
  );
}
