import s from "./DoorstaffTable.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GetDoorstaff, DeleteDoorStaff } from "../../../redux/api/doorstaffAPI";
import { useEffect } from "react";
import { useState } from "react";

export const DoorstaffTable = (props) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user);
  const doorstaff = useSelector(
    (state) => state.doorstaffOnSiteReducer.doorstaff
  );
  const errorMessage = useSelector((state=> state.doorstaffOnSiteReducer.errorMessage))

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [time, setTime] = useState([{}]);

  // new Date().toLocaleTimeString("en-US", {
  //   hour: "2-digit",
  //   minute: "2-digit",
  //   hour12: false,
  // })
  useEffect(() => {
    dispatch(GetDoorstaff(token.access_token));
  }, []);

  function SignOut(e) {
    const data = JSON.parse(e.target.dataset.staff);
    const signOutTIme = date + "T" +  time
    dispatch(DeleteDoorStaff(data, token.access_token, signOutTIme));
  }

  function AddSignOffTime(staff,element){
      const match = time.find(i=> i.staffId === staff.staffId)
      element.target.value = time.sTime
      if(!match){
        setTime(curr => [...curr,{staffId: staff.staffId, sTime: element.target.value}])
        element.target.value = time.sTime
      }

      
  }


  return (
    <div className={s.container}>
      {errorMessage.length>0 ? <div className={s.error}>{errorMessage}</div> : null}
      <table className={s.doorstaff_table}>
        <thead>
          <tr>
            <th>SURNAME</th>
            <th>FIRST NAME</th>
            <th>JOB ROLE</th>
            <th>START TIME</th>
            <th>DATE</th>
            {props.isVisible ? <th>SIGN OUT</th> : null}
          </tr>
        </thead>
        <tbody>
          {doorstaff.length > 0 ? (
            doorstaff.map((e) => (
              <tr key={e.staffId}>
                <td>{e.staffName.split(" ")[0]}</td>
                <td>{e.staffName.split(" ")[1]}</td>
                <td>{e.position}</td>
                <td>{e.startTime.split('T')[1].substring(0,5) }</td>
                <td>{e.startTime.split('T')[0]}</td>
                {props.isVisible ? (
                  <td>
                    <div className={s.signoff}>
                      <div className={s.time}>
                        <div>
                          <label htmlFor="sign_off_time">TIME</label>
                          <input
                            type="time"
                            name="sign_off_time"
                            value={null}
                            onChange={(x) => {
                              AddSignOffTime(e,x) 
                            }}
                          />
                        </div>
                        <div>
                          <label htmlFor="sign_off_date">DATE</label>
                          <input
                            type="date"
                            name="sign_off_date"
                            value={date}
                            onChange={(e) => {
                              setDate(e.target.value);
                           
                            }}
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          data-staff={JSON.stringify(e)}
                          onClick={SignOut}
                        >
                          SIGN OUT
                        </button>
                      </div>
                    </div>
                  </td>
                ) : null}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Nothing to show</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
