import s from "./Current.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GetDoorstaff, DeleteDoorStaff } from "../../../redux/api/doorstaffAPI";
import { useEffect } from "react";

export const Current = (props) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user);
  const doorstaff = useSelector(
    (state) => state.doorstaffOnSiteReducer.doorstaff
  );
  const errorMessage = useSelector((state => state.doorstaffOnSiteReducer.errorMessage))

  useEffect(() => {
    dispatch(GetDoorstaff(token.access_token));
  }, []);

  function SubmitForm(e){
    e.preventDefault()

    if(e.target[0].value && e.target[1].value){
      const data = JSON.parse(e.target.dataset.staff);
      const signOutTIme = e.target[1].value + "T" + e.target[0].value
      dispatch(DeleteDoorStaff(data, token.access_token, signOutTIme));
    }

  }

  return (
    <div className={s.container}>
      {errorMessage.length > 0 ? <div className={s.error}>{errorMessage}</div> : null}
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
                <td>{e.startTime.split('T')[1].substring(0, 5)}</td>
                <td>{e.startTime.split('T')[0]}</td>
                {props.isVisible ? (
                  <td>
                    <form onSubmit={SubmitForm}   data-staff={JSON.stringify(e)}>
                      <div className={s.signoff}>
                        <div className={s.time}>
                          <div>
                            <label htmlFor="sign_off_time">TIME</label>
                            <input
                              type="time"
                              name="sign_off_time"
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor="sign_off_date">DATE</label>
                            <input
                              type="date"
                              name="sign_off_date"
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <button>
                            SIGN OUT
                          </button>
                        </div>
                      </div>
                    </form>
                  </td>
                ) : null}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>Nothing to show</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
