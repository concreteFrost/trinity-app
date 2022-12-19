import s from "./ApproveTable.module.scss"
import { ModalPrompt } from "../../Modal/ModalPrompt/ModalPrompt";
import { useDispatch, useSelector } from "react-redux";
import { GetAuthorise, ApproveActivity, ViewNote } from "../../../redux/api/authoriseApi";
import axios from "axios";
import { useEffect } from "react";

export const ApproveTable = (props) => {

     const paymentActivityID = useSelector(state => state.modalPromptReducer.paymentActivityID)
     const disputedNote = useSelector(state => state.modalPromptReducer.disputedNote)
     const token = useSelector((state) => state.userReducer.user.access_token);

     const dispatch = useDispatch()

     useEffect(()=>{
          dispatch(GetAuthorise(props.system, token))
          console.log('here')
     },[])



     function viewNote(e) {
          dispatch(ViewNote(token, props.system, e))
     }

     function Approve() {
          props.data.forEach(element => {
               if (element.selected)
                    dispatch(ApproveActivity(props.system, token, element))

          });
     }


     function handleCheck(e) {
          if (e.target.checked === true) {
               dispatch({ type: props.actions[0], data: parseInt(e.target.id) })
          }
          else {
               dispatch({ type: props.actions[2], data: parseInt(e.target.id) })
          }
     }

     function SelectAll() {
          dispatch({ type: props.actions[1] })
     }

     function UnselectAll() {
          dispatch({ type: props.actions[3] })
     }

     function showDisputeModal(id) {
          dispatch({ type: "SHOW_MODAL_PROMPT" })
          dispatch({ type: "SET_DISPUTED_PAYMENT_ID", data: id })

     }

     function DisputeActivity() {

          axios({
               url: "https://testapi.etrinity.services/TrinityWebApi/api/AreaManager/DisputeActivity?system=" + props.system,
               headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
               },
               method: "POST",
               data: {
                    id: paymentActivityID,
                    name: disputedNote
               },
          })
               .then((res) => {
                    dispatch({ type: 'RESET_MODAL_ACTIVITY' })
                    dispatch(GetAuthorise(props.system, token))
               }).catch(e => console.log(e))
     }



     return (
          <div className={s.container}>
               <ModalPrompt submitForm={DisputeActivity} ></ModalPrompt>
               <header><h2>{props.Title}</h2></header>
               <div className={s.locations_select}>
                    <label htmlFor="select-doorstaff">LOCATIONS</label>
                    <select name="select-doorstaff" id="selecet-doorstaff">
                         <option value="all">All Locations</option>
                    </select>
               </div>
               <table>
                    <thead>
                         <tr>
                              {props.tableHeaders.map((e,i) => <th key={i}>{e}</th>)}
                         </tr>
                    </thead>
                    <tbody>
                         {props.data.length > 0 ? props.data.map((e) =>
                              <tr key={e.activityId}>
                                   <td>{e.start.split("T").join('\n')}</td>
                                   <td>{e.finish.split("T").join('\n')}</td>
                                   <td>{e.locationName}</td>
                                   <td>{e.supplierName}</td>
                                   <td>{e.staffName}</td>
                                   <td>{e.jobRoleName}</td>
                                   <td>{e.cost}</td>
                                   <td><button className={s.button_view} onClick={() => { viewNote(e.activityId) }}>VIEW</button></td>
                                   <td><input type="checkbox" name={e.activityId} id={e.activityId} onChange={handleCheck} checked={e.selected} /></td>
                                   <td><button className={s.button_dispute} onClick={() => { showDisputeModal(e.paymentAuthId) }} >DISPUTE</button></td>
                              </tr>

                         ) : <tr><td colSpan={10}>Nothing to show...</td></tr>}
                    </tbody>
               </table>
               <div>
                    <ul>
                         <li><button onClick={UnselectAll}>NONE</button></li>
                         <li><button onClick={SelectAll}>SELECT ALL</button></li>
                         <li><button onClick={Approve}>APPROVE</button> </li>
                    </ul>
               </div>
          </div>
     )
};

