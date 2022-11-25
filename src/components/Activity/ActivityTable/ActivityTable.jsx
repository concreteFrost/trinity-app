import s from "./ActivityTable.module.scss"
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const ActivityTable = (props) => {
  const token = useSelector((state) => state.userReducer.user.access_token);
  useEffect(() => {
    axios({
      url: "https://testapi.etrinity.services/TrinityWebApi/api/Report/CostReview",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      method: "POST",
      data: {
       dateFrom : "2022-11-01T12:29:51.5866765+00:00",
       dateTo : "2022-11-23T12:29:51.5866765+00:00"
      },
    })
      .then((res) => {

      })
      .catch((e) => {
        console.log(e);
      });

  }, [])

  return (
    <div className={s.container}>
      <table className={s.doorstaff_table}>
        <thead>
          <tr>
            <th>DATE</th>
            <th>COST</th>
            <th>SUPPLIER</th>
            <th>VALUE</th>
            {props.isVisible ? <th>EDIT</th> : null}
          </tr>
        </thead>
        <tbody>

        </tbody>
      </table>
    </div>
  );
}
