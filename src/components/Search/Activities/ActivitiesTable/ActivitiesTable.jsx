import s from "./ActivitiesTable.module.scss"
import { TableTemplate } from "../../../Shared/TableTemplate/TableTemplate";


export const ActivitiesTable = (props) => {
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
      Header: "DATE/TIME",
      accessor:"start",
      Cell: ({ value }) => {
        return value.split('T')[0] + " Time: " + value.split("T")[1];
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
 
  return(
    <div className={s.container}>   
     <TableTemplate columns={tableHeader} data={props.data}></TableTemplate>
  </div>     
    );
}

