import s from "./DoorstaffTable.module.scss";
import axios from "axios";
import { useSelector, useDispatch} from "react-redux";
import { GetDoorstaff,DeleteDoorStaff } from "../../../redux/actions";


export const DoorstaffTable = (props) => {

  const dispatch = useDispatch();
  const token = useSelector((state)=> state.userReducer.user);
  const doorstaff = useSelector((state)=>state.doorstaffOnSiteReducer.doorstaff);
  console.log('doo',doorstaff)

  function SignOut(e) {
    const data = JSON.parse(e.target.dataset.staff)
    const signOutTIme = new Date().toISOString().split('.')[0]
    axios({
      method: "POST",
      url: "https://testapi.etrinity.services/TrinityWebApi/api/Activity/SignOffMembers",
      data: {
        staffLogin: [{
          activityId: data.activityId,
          staffId: data.staffId,
          staffName: data.staffName,
          positionId: data.positionId,
          position: data.position,
          locationId: data.locationId,
          supplierId: data.supplierId,
          supplierName: data.supplierName,
          startTime: data.startTime,
          endTime: signOutTIme,
          rateGroupId: data.rateGroupId
        }],
        success: true,
        message: ''
      },
      headers: {
        "Authorization": "Bearer " + token.access_token,
        "Content-Type": 'application/json'
      },
    })
      .then((res) => {
        dispatch(DeleteDoorStaff())
        dispatch(GetDoorstaff(token.access_token))
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
          {doorstaff.length > 0 ? doorstaff.map((e) => (
            <tr key={e.staffId}>
              <td>{e.staffName.split(" ")[0]}</td>
              <td>{e.staffName.split(" ")[1]}</td>
              <td>{e.position}</td>
              <td>{e.startTime}</td>
              {props.isVisible ? (
                <td>
                  <button
                    data-staff={JSON.stringify(e)}
                    onClick={SignOut}
                  >
                    SIGN OUT
                  </button>
                </td>
              ) : null}
            </tr>
          )) : <tr><td colSpan={5}>Nothing to show</td></tr>}
        </tbody>
      </table>
    </div>
  );
};
