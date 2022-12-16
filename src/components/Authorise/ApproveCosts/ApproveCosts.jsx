import s from "./ApproveCosts.module.scss"
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetAuthorise, ApproveActivity, ViewNote } from "../../../redux/api/authoriseApi";

export const ApproveCosts = () => {


     const costs = useSelector(state => state.authoriseReducer.costs);
     const token = useSelector((state) => state.userReducer.user.access_token);
     const dispatch = useDispatch();

     useEffect(() => {
          dispatch(GetAuthorise("A", token))
     }, [])

     console.log(costs)


     function handleCheck(e) {
          if (e.target.checked === true) {
               dispatch({ type: 'CHECK_AUTHORISE_COSTS', data: parseInt(e.target.id) })
          }
          else {
               dispatch({ type: 'UNCHECK_AUTHORISE_COSTS', data: parseInt(e.target.id) })
          }

          costs.forEach(i => console.log(i.selected))

     }

     function SelectAll() {
          dispatch({ type: 'CHECK_ALL_AUTHORISE_COSTS' })
     }

     function UnselectAll() {
          dispatch({ type: 'UNCHECK_ALL_AUTHORISE_COSTS' })
     }


     function viewNote(e) {
          dispatch(ViewNote(token, 'A', e))
          console.log(e)
     }

     function Approve() {
          costs.forEach(element => {
               if (element.selected)
                    dispatch(ApproveActivity("A", token, element))

          });


     }
     return (
          <div className={s.container}>
               <header><h2>Approve costs</h2></header>
               <div className={s.locations_select}>
                    <label htmlFor="select-costs">LOCATIONS</label>
                    <select name="select-costs" id="selecet-costs">
                         <option value="all">All Locations</option>
                    </select>
               </div>
               <table>
                    <thead>
                         <tr>
                         <th>TIME</th>
                        <th>PUB</th>
                        <th>SUPPLIER</th>
                        <th>ANALYSIS</th>
                        <th>COST</th>
                        <th>NOTES</th>
                        <th>SELECT</th>
                         </tr>
                    </thead>
                    <tbody>
                         {costs.length > 0 ? costs.map((e) =>
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

