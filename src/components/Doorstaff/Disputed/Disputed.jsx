import s from "./Disputed.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { TableTemplate } from "../../TableTemplate/TableTemplate";
import { useEffect } from "react";
import { ModalPrompt } from "../../Modal/ModalPrompt/ModalPrompt";
import { GetDisputedActivity, SendBackDisputed } from "../../../redux/api/disputedApi";
import { ViewDisputedNote } from "../../../redux/api/disputedApi";

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
      Header:"ACTIONS",
      accessor:"activityId",
      style:{
        color:'red'
      },
      Cell: ({value})=>(
        <div className={s.actions}>
        <div><button value={value} onClick={()=>{viewNote(value)}}>NOTE</button> </div> 
        <div><button className={s.dispute_btn} onClick={()=>{showDisputeModal(value)}}>DISPUTE</button> </div> 
        </div>
        
      )
    },
    ,]

  const token = useSelector((state) => state.userReducer.user.access_token);
  const disputedDoorstaff = useSelector(s => s.doorstaffReducer.disputed)
  const currentDisputed = useSelector(state=> state.modalPromptReducer);
  const dispatch = useDispatch();


  function showDisputeModal(id){
    dispatch({type:"SHOW_MODAL_PROMPT"})
    dispatch({ type: "SET_DISPUTED_PAYMENT_ID", data: id })

  }

  useEffect(()=>{
      dispatch(GetDisputedActivity(token,"S"))
  },[])

  function viewNote(e){
   dispatch(ViewDisputedNote(token,"S",e))
  }

  function DisputeBack(){
    dispatch(SendBackDisputed(token, currentDisputed,"S"))
  }
    

  return (
    <>
    <ModalPrompt submitForm ={DisputeBack}></ModalPrompt>
    <div className={s.container}>
      <TableTemplate columns={tableHeader} data={disputedDoorstaff} ></TableTemplate>
    </div>
    </>
  );
};
