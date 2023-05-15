import s from "./SignIn.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  GetDoorstaffPositions,
  GetDoorstaffRates,
  GetDoorstaffSuppliers,
  SetDoorStaff,
} from "../../../redux/api/doorstaffAPI";
import {
  SET_DOORSTAFF_POSITION,
  SET_DOORSTAFF_SUPPLIER,
  SET_DOORSTAFF_RATE,
  SET_DOORSTAFF_START_DATE,
  SET_DOORSTAFF_START_TIME,
} from "../../../redux/types";
import { ClearSiaData } from "../../../redux/actions";

export const SignIn = (props) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user);
  const sia = useSelector((state) => state.siaReducer);

  const headers = {
    Authorization: "Bearer " + token.access_token,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  console.log('supplier ID', sia)

  useEffect(() => {
    if (sia.doorstaff.staffId) dispatch(GetDoorstaffPositions(headers));
  }, [sia.doorstaff.staffId]);

  useEffect(() => {
    if (sia.position !== null)
      dispatch(GetDoorstaffSuppliers(headers, sia.position.positionId));
  }, [sia.position]);

  //GET RATE
  useEffect(() => {
    if (sia.position !== null && sia.supplier !== null)
      dispatch(
        GetDoorstaffRates(
          sia.position ? sia.position.positionId : 0,
          sia.supplier ? sia.supplier.supplierId : 0,
          sia.date,
          headers
        )
      );
  }, [sia.position, sia.supplier]);

  function Submit() {
    if (sia.rate.rateGroupId) {
      dispatch(SetDoorStaff(token.access_token, sia));
    }
  }

  return (
    <div className={s.container}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={s.f_name}>
          <label>FIRST NAME</label>
          <input type="text" value={sia.doorstaff.firstName || ""} readOnly />
        </div>

        <div className={s.l_name}>
          <label>LAST NAME</label>
          <input type="text" value={sia.doorstaff.lastName || ""} readOnly />
        </div>

        <div className={s.position}>
          <label>POSITION</label>
          <select
            onChange={(e) => {
              dispatch({
                type: SET_DOORSTAFF_POSITION,
                data: {
                  positionId: e.target.value,
                  positionName: e.target.options[e.target.selectedIndex].text,
                },
              });
            }}
            disabled={sia.options.positions.length === 0}
          >
            {sia.options.positions.length > 0
              ? sia.options.positions.map((e) => (
                <option key={e.positionId} value={e.positionId}>
                  {e.positionName}
                </option>
              ))
              : null}
          </select>
        </div>

        <div className={s.supplier}>
          <label>SUPPLIER</label>
          <select
            onChange={(e) => {
              dispatch({
                type: SET_DOORSTAFF_SUPPLIER,
                data: {
                  supplierId: e.target.value,
                  supplierName: e.target.options[e.target.selectedIndex].text,
                },
              });
            }}
            disabled={sia.options.suppliers.length === 0}
          >
            {sia.options.suppliers.length > 0
              ? sia.options.suppliers.map((e) => (
                <option key={e.supplierId} value={e.supplierId}>
                  {e.supplierName}
                </option>
              ))
              : null}
          </select>
        </div>

        <div className={s.rate}>
          <label>RATE</label>
          <select
            onChange={(e) =>
              dispatch({ type: SET_DOORSTAFF_RATE, data: e.target.value })
            }
            disabled={sia.options.rates.length === 0}
          >
            {sia.options.rates.length > 0
              ? sia.options.rates.map((e) => (
                <option key={e.rateGroupId} value={e.rateGroupId}>
                  {e.rateGroupName}
                </option>
              ))
              : null}
          </select>
        </div>

        <div className={s.date_started}>
          <label>DATE STARTED</label>
          <input
            type="date"
            value={sia.date}
            onChange={(e) => {
              dispatch({
                type: SET_DOORSTAFF_START_DATE,
                data: e.target.value,
              });
            }}
          />
        </div>

        <div className={s.start_time}>
          <label>START TIME</label>
          <input
            type="time"
            value={sia.time}
            onChange={(e) => {
              dispatch({
                type: SET_DOORSTAFF_START_TIME,
                data: e.target.value,
              });
            }}
            required
          />
        </div>

        <div className={s.buttons}>
          <button className={s.clear} onClick={() => dispatch(ClearSiaData())}>
            CLEAR
          </button>
          <button className={s.submit} onClick={Submit}>
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};
