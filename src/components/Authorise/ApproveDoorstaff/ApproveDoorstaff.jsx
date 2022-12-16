import s from "./ApproveDoorstaff.module.scss"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetAuthorise, ApproveActivity, ViewNote } from "../../../redux/api/authoriseApi";

export const ApproveDoorstaff = () => {


     const doorstaff = useSelector(state => state.authoriseReducer.doorstaff);
     const token = useSelector((state) => state.userReducer.user.access_token);
     const dispatch = useDispatch();

     useEffect(() => {
          dispatch(GetAuthorise("S", token))
     }, [])


     function handleCheck(e) {
          if (e.target.checked === true) {
               dispatch({ type: 'CHECK_AUTHORISE_DOORSTAFF', data: parseInt(e.target.id) })
          }
          else {
               dispatch({ type: 'UNCHECK_AUTHORISE_DOORSTAFF', data: parseInt(e.target.id) })
          }

          doorstaff.forEach(i => console.log(i.selected))

     }

     function SelectAll() {
          dispatch({ type: 'CHECK_ALL_AUTHORISE_DOORSTAFF' })
     }

     function UnselectAll() {
          dispatch({ type: 'UNCHECK_ALL_AUTHORISE_DOORSTAFF' })
     }


     function viewNote(e) {
          dispatch(ViewNote(token, 'S', e))
     }

     function Approve() {
          doorstaff.forEach(element => {
               if (element.selected)
                    dispatch(ApproveActivity("S", token, element))

          });


     }
     return (
          <div className={s.container}>
               <header><h2>Approve Doorstaff</h2></header>
               <div className={s.locations_select}>
                    <label htmlFor="select-doorstaff">LOCATIONS</label>
                    <select name="select-doorstaff" id="selecet-doorstaff">
                         <option value="all">All Locations</option>
                    </select>
               </div>
               <table>
                    <thead>
                         <tr>
                              <th>START</th>
                              <th>FINISH</th>
                              <th>HOURS WORKED</th>
                              <th>PUB</th>
                              <th>SUPPLIER</th>
                              <th>NAME</th>
                              <th>POSITION</th>
                              <th>COST</th>
                              <th>NOTES</th>
                              <th>SELECT</th>
                         </tr>
                    </thead>
                    <tbody>
                         {doorstaff.length > 0 ? doorstaff.map((e) =>
                              <tr key={e.activityId}>
                                   <td>{e.start.split("T").join('\n')}</td>
                                   <td>{e.finish.split("T").join('\n')}</td>
                                   <td>{e.hoursWorked ? e.hoursWorked : 0}</td>
                                   <td>{e.locationName}</td>
                                   <td>{e.supplierName}</td>
                                   <td>{e.staffName}</td>
                                   <td>{e.jobRole}</td>
                                   <td>{e.cost}</td>
                                   <td><button className={s.button_view} onClick={() => { viewNote(e.activityId) }}>VIEW</button></td>
                                   <td><input type="checkbox" name={e.activityId} id={e.activityId} onChange={handleCheck} checked={e.selected} /></td>
                                   <td><button className={s.button_dispute} >DISPUTE</button></td>
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

