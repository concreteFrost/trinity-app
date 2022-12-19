import s from "./Disputed.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { TableTemplate } from "../../TableTemplate/TableTemplate";
import { useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../../contexts/baseUrl";
import { GET_DISPUTED_ACTIVITY } from "../../../redux/types";
import { ViewDisputeNote } from "../../../redux/api/notesApi";

export const Disputed = (props) => {

  const tableHeader = [
    {
      Header: "NAME",
      accessor:"staffName",
      
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
      Header:"STATUS",
      accessor:"status"
    },
    {
      Header:"NOTE",
      accessor:"activityId",
      style:{
        color:'red'
      },
      Cell: ({value})=>(
        <div><button value={value} onClick={()=>{viewNote(value); console.log(value)}}>VIEW</button> </div> 
      )
      
    }
    ,]

  const token = useSelector((state) => state.userReducer.user.access_token);
  const disputedctivity = useSelector(s => s.getActivityReducer.disputed)
  const dispatch = useDispatch();

  console.log(disputedctivity)
  useEffect(()=>{
      axios.get(baseUrl+'/Disputed/ActivityList?system=A',{
        headers:{
          Authorization: "Bearer " + token,
          "Content-Type": "application/x-www-form-urlencoded",
        }
      }).then(res=>dispatch({type:GET_DISPUTED_ACTIVITY, data: res.data.reportRecord}))
  },[])

  function viewNote(e){
   dispatch(ViewDisputeNote(token,"A",e))
  }
    

  return (
    <div className={s.container}>
      <TableTemplate columns={tableHeader} data={disputedctivity}></TableTemplate>
    </div>
  );
};
