import s from "./SignIn.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
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

export const SignIn = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user);
  const sia = useSelector((state) => state.siaReducer);

  const headers = {
    Authorization: "Bearer " + token.access_token,
    "Content-Type": "application/x-www-form-urlencoded",
  };

  async function GetPositionAndSupplier(e) {
    await dispatch({
      type: SET_DOORSTAFF_POSITION,
      data: {
        positionId: e.target.value,
        positionName: e.target.options[e.target.selectedIndex].text,
      },
    });
    await dispatch(GetDoorstaffSuppliers(headers, e.target.value));
  }

  async function GetSupplierAndRate(e) {
    await dispatch({
      type: SET_DOORSTAFF_SUPPLIER,
      data: {
        supplierId: e.target.value,
        supplierName: e.target.options[e.target.selectedIndex].text,
      },
    });

    await dispatch(
      GetDoorstaffRates(
        sia.position ? sia.position.positionId : 0,
        e.target.value,
        sia.date,
        headers
      )
    );
  }

  function SetRateGroupID(e) {
    dispatch({ type: SET_DOORSTAFF_RATE, data: e.target.value })
    console.log(e.target.value)
  }

  function Submit() {
    console.log(sia)
    dispatch(SetDoorStaff(token.access_token, sia));
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
              GetPositionAndSupplier(e);
            }}
            disabled={sia.options.positions.length === 0}
          >
            <option value={null}>Select Position</option>
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
              GetSupplierAndRate(e);
            }}
            disabled={sia.options.suppliers.length === 0}
          >
            <option value={null}>Select the Supplier</option>
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
              SetRateGroupID(e)
            }
            disabled={sia.options.rates.length === 0}
          >
            <option value={null}>Select Rate</option>
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
