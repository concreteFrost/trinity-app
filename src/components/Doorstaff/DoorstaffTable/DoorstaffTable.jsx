import s from "./DoorstaffTable.module.scss";
import axios from "axios";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export const DoorstaffTable = (props) => {
  const token = useSelector((state) => state.userReducer.user);
  const getStaff = useSelector((state) => state.doorstaffOnSite.doorStaff);
  const [doorStaff, setDoorstaff] = useState([]);
  console.log(token);
  useEffect(() => {
    axios
      .get(
        "https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupCurrentMembers",
        {
          headers: {
            Authorization: "Bearer " + token.access_token,
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      )
      .then((res) => {
        console.log(res.data.staffLogin);
        setDoorstaff(
          res.data.staffLogin.filter((e) => e.locationId == token.locationId)
        );
      });
  }, [getStaff]);

  function SignOut(id) {
    axios({
      method: "POST",
      url: "https://testapi.etrinity.services/TrinityWebApi/api/Activity/SignOffMembers",
      data: {
       
      },
      headers: {
        "Authorization": "Bearer " + token.access_token,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
  }

  return (
    <div className={s.container}>
      <table className={s.doorstaff_table}>
        <thead>
          <tr>
            <th>SURNAME</th>
            <th>FIRST NAME</th>
            <th>JOB ROLE</th>
            <th>START TIME</th>
            {props.isVisible ? <th>SIGN OUT</th> : null}
          </tr>
        </thead>
        <tbody>
          {doorStaff.map((e) => (
            <tr key={e.staffId}>
              <td>{e.staffName.split(" ")[0]}</td>
              <td>{e.staffName.split(" ")[1]}</td>
              <td>{e.position}</td>
              <td>{e.startTime}</td>
              {props.isVisible ? (
                <td>
                  <button
                    onClick={() => {
                      SignOut(e.staffId);
                    }}
                  >
                    SIGN OUT
                  </button>
                </td>
              ) : null}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
