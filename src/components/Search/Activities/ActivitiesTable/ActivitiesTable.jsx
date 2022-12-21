import s from "./ActivitiesTable.module.scss"
import { useSelector } from "react-redux";
import { TableTemplate } from "../../../Shared/TableTemplate/TableTemplate";


export const ActivitiesTable = () => {
  const tableHeader = [
    {
      Header: "REFERENCE",
      accessor:"reference",
    },
    {
      Header: "LOCATION",
      accessor:'locationName'
    },
    {
      Header: "SUPPLIER",
      accessor:"supplierName"
    },
    {
      Header: "RATE",
      accessor:"rateGroupName",
     
    },
    {
      Header: "TIME",
      accessor:"start",
      Cell: ({ value }) => {
        return value.split('T');
      }
    },
    {
      Header: "HOURS WORKED",
      accessor:"hoursWorked"
    },
    {
      Header: "PRINT REVISION",
      accessor:"printRevision"
    },
    {
      Header: "STATUS",
      accessor:"status"
    },


    ,]
  const data = useSelector(state=> state.searchActivitiesReducer.searchedActivities)
  console.log(data)
  return(
    <div className={s.container}>   
     <TableTemplate columns={tableHeader} data={data}></TableTemplate>
  </div>     
    );
}

