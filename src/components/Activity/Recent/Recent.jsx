import s from "./Recent.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GetDoorstaff, DeleteDoorStaff } from "../../../redux/api/doorstaffAPI";
import { useEffect } from "react";

export const Recent = (props) => {

  const token = useSelector((state) => state.userReducer.user);

  return (
    <div className={s.container}>
      <form >
        <div>
          <label htmlFor="">FROM</label>
          <input type="date" name="from-date" id="from-date" />
        </div>
        <div>
          <label htmlFor="">TO</label>
          <input type="date" name="to-date" id="to-date" />
        </div>
        <div className={s.view_btn}> <button>VIEW</button></div>

      </form>
      <table className={s.doorstaff_table}>
        <thead>
          <tr>
            <th>SUPPLIER</th>
            <th>ANALYSIS</th>
            <th>NOTES</th>
            <th>TIME</th>
            <th>COST</th>
            <th>STATUS LEVEL</th>
            <th>REPRINTS</th>
            <th>DISPUTED NOTES</th>
            <th>PRINT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CASTLE CLEANING SERVICES</td>
            <td>CLEANING</td>
            <td>SAMPLE NOTE</td>
            <td>29/11/22 09:10</td>
            <td>285.00</td>
            <td>APPROVED</td>
            <td>0</td>
            <td><button>VIEW</button></td>
            <td><button>PRINT</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
