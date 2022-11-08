import s from "./ApproveDoorstaff.module.scss"

export const ApproveDoorstaff = () => (
     <div className={s.container}>
          <header><h2>APPROVE DOORSTAFF</h2></header>
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
                    <tr>
                         <td>12/08/2022 17:00:00</td>
                         <td>13/08/2022 01:00:00 </td>
                         <td>8</td>
                         <td>Fall Well</td>
                         <td>ELITE SECURITY NW LTD</td>
                         <td>RICKY SMITH</td>
                         <td>DOOR PERSON</td>
                         <td>164.00</td>
                         <td><button>VIEW</button></td>
                         <td><input type="checkbox" name="checkbox-doorstaff" /></td>
                    </tr>
                    <tr>
                         <td>12/08/2022 17:00:00</td>
                         <td>13/08/2022 01:00:00 </td>
                         <td>8</td>
                         <td>Fall Well</td>
                         <td>ELITE SECURITY NW LTD</td>
                         <td>RICKY SMITH</td>
                         <td>DOOR PERSON</td>
                         <td>164.00</td>
                         <td><button>VIEW</button></td>
                         <td><input type="checkbox" name="checkbox-doorstaff" /></td>
                    </tr>
                    <tr>
                         <td>12/08/2022 17:00:00</td>
                         <td>13/08/2022 01:00:00 </td>
                         <td>8</td>
                         <td>Fall Well</td>
                         <td>ELITE SECURITY NW LTD</td>
                         <td>RICKY SMITH</td>
                         <td>DOOR PERSON</td>
                         <td>164.00</td>
                         <td><button>VIEW</button></td>
                         <td><input type="checkbox" name="checkbox-doorstaff" /></td>
                    </tr>
                    <tr>
                         <td>12/08/2022 17:00:00</td>
                         <td>13/08/2022 01:00:00 </td>
                         <td>8</td>
                         <td>Fall Well</td>
                         <td>ELITE SECURITY NW LTD</td>
                         <td>RICKY SMITH</td>
                         <td>DOOR PERSON</td>
                         <td>164.00</td>
                         <td><button>VIEW</button></td>
                         <td><input type="checkbox" name="checkbox-doorstaff" /></td>
                    </tr>
                    <tr>
                         <td>12/08/2022 17:00:00</td>
                         <td>13/08/2022 01:00:00 </td>
                         <td>8</td>
                         <td>Fall Well</td>
                         <td>ELITE SECURITY NW LTD</td>
                         <td>RICKY SMITH</td>
                         <td>DOOR PERSON</td>
                         <td>164.00</td>
                         <td><button>VIEW</button></td>
                         <td><input type="checkbox" name="checkbox-doorstaff" /></td>
                    </tr>
                    <tr>
                         <td>12/08/2022 17:00:00</td>
                         <td>13/08/2022 01:00:00 </td>
                         <td>8</td>
                         <td>Fall Well</td>
                         <td>ELITE SECURITY NW LTD</td>
                         <td>RICKY SMITH</td>
                         <td>DOOR PERSON</td>
                         <td>164.00</td>
                         <td><button>VIEW</button></td>
                         <td><input type="checkbox" name="checkbox-doorstaff" /></td>
                    </tr>
               </tbody>
          </table>

          <div>
                        <ul>
                                <li><button>NONE</button></li>
                                <li><button>SELECT ALL</button></li>
                                <li><button>DISPUTE</button></li>
                                <li><button>APPROVE</button> </li>
                        </ul>
                </div>
     </div>
);

