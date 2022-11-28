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
            <th>FIRST NAME</th>
            <th>FIRST NAME</th>
            <th>SUPPLIER</th>
            <th>JOB ROLE</th>
            <th>START TIME</th>
            <th>END TIME</th>
            <th>STATUS LEVEL</th>
            <th>NOTES</th>
            <th>PRINTS</th>
            <th>PRINT</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Name</td>
            <td>Name</td>
            <td>Supplier name</td>
            <td>Job Role name</td>
            <td>---</td>
            <td>---</td>

            <td>Approved</td>
            <td><button>VIEW</button></td>
            <td>0</td>
            <td><button>PRINT</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
