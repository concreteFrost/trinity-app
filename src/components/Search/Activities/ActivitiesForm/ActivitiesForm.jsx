import s from "./ActivitiesForm.module.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { baseUrl } from "../../../../contexts/baseUrl";
import {
  GetSearchSuppliers,
  GetSearchLocations,
  GetSearchLocationsGroup,
  GetSearchStaff,
  GetSearchPaymentStatus,
  GetSearchPaymentStatusGroup,
} from "../../../../redux/api/searchActivitiesApi";
export const ActivitiesForm = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.user.access_token);
  const data = useSelector((state) => state.searchActivitiesReducer);


  useEffect(() => {
    dispatch(GetSearchSuppliers(token));
    dispatch(GetSearchLocations(token));
    dispatch(GetSearchLocationsGroup(token));
    dispatch(GetSearchStaff(token));
    dispatch(GetSearchPaymentStatus(token));
    dispatch(GetSearchPaymentStatusGroup(token));
  }, []);

  function Submit(e) {
    e.preventDefault();

    axios(`${baseUrl}/Report/ActivityList`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
      data: {
        staffId: e.target[0].value,
        locationId: e.target[1].value,
        locationGroupId: e.target[2].value,
        supplierId: e.target[3].value,
        paymentStatusId: e.target[4].value,
        dateFrom: e.target[5].value,
        dateTo: e.target[6].value,
      },
    }).then((res) => {
      dispatch({ type: "GET_SEARCHED_ACTIVITES", data: res.data.reportRecord });
    });
  }

  return (
    <div className={s.container}>
      <form onSubmit={Submit}>
        <div className={s.staff}>
          <label htmlFor="staff-group">STAFF/GROUP</label>
          <select name="staff-group" id="staff-group" disabled={data.options.staff.length === 0}>
            <option value={0}>All</option>
            {data.options.staff.length > 0
              ? data.options.staff.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))
              : null}
          </select>
        </div>

        <div className={s.locations}>
          
        <label htmlFor="location-group">LOCATION/GROUP</label>
          <select name="location-group" id="location-group" disabled={data.options.locations.length === 0}>
          <option value={0}>All</option>
            {data.options.locations.length > 0
              ? data.options.locations.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))
              : null}
          </select>

          <select name="location-group-2" id="location-group-2" disabled = {data.options.locationsGroup.length === 0}>
          <option value={0}>All</option>
            {data.options.locationsGroup.length > 0
              ? data.options.locationsGroup.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))
              : null}
          </select>
        </div>

        <div className={s.suppliers}>
          <label htmlFor="supplier-group">SUPPLIER/GROUP</label>
          <select name="supplier-group" id="supplier-group" disabled={data.options.suppliers.length === 0}>
          <option value={0}>All</option>
            {data.options.suppliers.length > 0
              ? data.options.suppliers.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))
              : null}
          </select>
        </div>
        <div className={s.payment}>
          <label htmlFor="reference">PAYMENT STATUS</label>
          <select name="payment-status" id="payment-status" disabled = { data.options.paymentStatus.length === 0}>
            {data.options.paymentStatus.length > 0
              ? data.options.paymentStatus.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))
              : null}
          </select>
        </div>

        <div className={s.dates}>
          <div>
     
            <label htmlFor="from-date">FROM</label>
            <input
              type="date"
              name="from-date"
              id="fro-date"
              value={data.dateFrom}
              onChange={(e) =>
                dispatch({
                  type: "SET_ACTIVITIES_SEARCH_FROM_DATE",
                  data: e.target.value,
                })
              }
            />
          </div>
          <div>

            <label htmlFor="to-date">TO</label>
            <input
              type="date"
              name="to-date"
              id="to-date"
              value={data.dateTo}
              onChange={(e) =>
                dispatch({
                  type: "SET_ACTIVITIES_SEARCH_TO_DATE",
                  data: e.target.value,
                })
              }
            />
          </div>
        </div>

        <div className={s.button_col}>
          <button>SEARCH</button>
        </div>
      </form>
    </div>
  );
};
