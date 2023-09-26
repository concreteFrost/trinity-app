import s from "./ActivitiesForm.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  GetSearchLocationsAPI,
  GetSearchLocationsGroupAPI,
  GetSearchPaymentStatusAPI,
  GetSearchStaffAPI,
  GetSearchSuppliersAPI,
  GetSearchPaymentStatusGroupAPI,
  GetSearchedDataAPI,
} from "../../../../services/reportApi";
import { ShowModalMessage } from "../../../../redux/actions/modalActions";
import * as SearchActions from "../../../../redux/actions/searchActions";

export const ActivitiesForm = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.user.access_token);
  const data = useSelector((state) => state.searchActivitiesReducer);
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    //SUPPLIER/GROUP dropdown
    GetSearchSuppliersAPI(token)
      .then((res) => {
        dispatch(SearchActions.GetSearchSuppliers(res.data.record));
      })
      .catch((e) => {});

    //LOCATION dropdown
    GetSearchLocationsAPI(token).then((res) => {
      dispatch(SearchActions.GetSearchLocations(res.data.record));
    });

    //LOCATION GROUPS dropdown
    GetSearchLocationsGroupAPI(token).then((res) => {
      dispatch(SearchActions.GetSearchLocationGroup(res.data.record));
    });

    //STAFF/GROUP dropdown
    GetSearchStaffAPI(token)
      .then((res) => {
        dispatch(SearchActions.GetSearchStaff(res.data.record));
      })
      .catch((e) => {});

    //PAYMENT STATUS dropdown
    GetSearchPaymentStatusAPI(token)
      .then((res) => {
        dispatch(SearchActions.GetSearchPaymentStatus(res.data.record));
      })
      .catch((e) => {});

    //Currently not in use
    GetSearchPaymentStatusGroupAPI(token)
      .then((res) => {
        dispatch(SearchActions.GetSearchPaymentStatusGroup(res.data.record));
      })
      .catch((e) => {});
  }, []);

  function Submit(e) {
    e.preventDefault();
    let _data;

    switch (props.system) {
      case "S":
        _data = {
          staffId: e.target[0].value,
          locationId: e.target[1].value,
          locationGroupId: e.target[2].value,
          supplierId: e.target[3].value,
          paymentStatusId: e.target[4].value,
          dateFrom: e.target[5].value,
          dateTo: e.target[6].value,
        };
        break;
      case "A":
        _data = {
          locationId: e.target[0].value,
          locationGroupId: e.target[1].value,
          paymentStatusId: e.target[2].value,
          dateFrom: e.target[3].value,
          dateTo: e.target[4].value,
        };
        break;
    }
    GetSearchedDataAPI(props.system, token, user.locationId, _data).then(
      (res) => {
        if (!res.data.success) {
          dispatch(ShowModalMessage(res.data.message));
        }
        switch (props.system) {
          case "S":
            dispatch(
              SearchActions.GetSearchedActivities(res.data.reportRecord)
            );
            break;
          case "A":
            dispatch(SearchActions.GetSearchedCosts(res.data.reportRecord));
            break;
        }
      }
    );
  }

  return (
    <div className={s.container}>
      <form onSubmit={Submit}>
        {props.currentView === "activities" ? (
          <div className={s.staff}>
            <label htmlFor="staff-group">STAFF/GROUP</label>
            <select
              name="staff-group"
              id="staff-group"
              disabled={data.options.staff.length === 0}
            >
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
        ) : null}

        <div className={s.locations}>
          <label htmlFor="location-group">LOCATION/GROUP</label>
          <select
            name="location-group"
            id="location-group"
            disabled={data.options.locations.length === 0}
          >
            <option value={0}>All</option>
            {data.options.locations.length > 0
              ? data.options.locations.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))
              : null}
          </select>

          <select
            name="location-group-2"
            id="location-group-2"
            disabled={data.options.locationsGroup.length === 0}
          >
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

        {props.currentView === "activities" ? (
          <div className={s.suppliers}>
            <label htmlFor="supplier-group">SUPPLIER/GROUP</label>
            <select
              name="supplier-group"
              id="supplier-group"
              disabled={data.options.suppliers.length === 0}
            >
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
        ) : null}
        <div className={s.payment}>
          <label htmlFor="reference">PAYMENT STATUS</label>
          <select
            name="payment-status"
            id="payment-status"
            disabled={data.options.paymentStatus.length === 0}
          >
            {data.options.paymentStatus.length > 0
              ? data.options.paymentStatus.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.name}
                  </option>
                ))
              : null}
          </select>
        </div>

        <div className={s.dateFrom}>
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
        <div className={s.dateTo}>
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

        <div className={s.button_col}>
          <button>SEARCH</button>
        </div>
      </form>
    </div>
  );
};
