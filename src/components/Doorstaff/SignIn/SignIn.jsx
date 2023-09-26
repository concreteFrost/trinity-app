import s from "./SignIn.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  ClearSiaData,
  GetDoorstaffSupplierOptions,
  SetDoorstaffCurrentSupplier,
  ShowModalMessage,
  SetDoorstaffCurrentPosition,
  GetDooorstaffRateOptions,
  SetDoorstaffCurrentRate,
  SetDoorstaffStartTime,
  SetDoorstaffStartDate,
} from "../../../redux/actions";
import {
  GetDoorstaffSupplierAPI,
  SignOnMemberAPI,
  GetDoorstaffRatesAPI,
} from "../../../services/activityApi";
import { RefreshDoorstaffList } from "../../../services/utils/activityUtils";
import * as DoorstaffActions from "../../../redux/actions/doorstaffActions";

export const SignIn = () => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user);
  const sia = useSelector((state) => state.siaReducer);

  async function GetPositionAndSupplier(e) {
    const position = e.target.value;
    await dispatch(DoorstaffActions.SetDoorstaffCurrentPosition(position));
    await GetDoorstaffSupplierAPI(position, token.access_token)
      .then((res) => {
        console.log("get suppliers list success", res[0]);
        dispatch(DoorstaffActions.GetDoorstaffSupplierOptions(res));
      })
      .catch((e) => {
        console.log("get suppliers list error", e);
        dispatch(DoorstaffActions.GetDoorstaffSupplierOptions([]));
      });
    console.log(position)
  }

  async function SetCurrentSupplier(e) {
    const supplierId = e.target.value;
    const supplierName = e.target.options[e.target.selectedIndex].text;

    await dispatch(
      DoorstaffActions.SetDoorstaffCurrentSupplier({
        supplierId: supplierId,
        supplierName: supplierName,
      })
    );

    await GetDoorstaffRatesAPI(
      token.access_token,
      sia.position ? sia.position : 0,
      supplierId,
      sia.date
    )
      .then((res) => {
        console.log("get rates success", res);
        if (!res.success) {
          dispatch(ShowModalMessage(res.message))
        }
        dispatch(DoorstaffActions.GetDooorstaffRateOptions(res.rates))
      })
      .catch((e) => {
        console.log("get rates error", e);
      });

  }

  function SetRateGroupID(e) {
    const rateId = e.target.value;
    dispatch(DoorstaffActions.SetDoorstaffCurrentRate(rateId))
  }

  function Submit() {

    SignOnMemberAPI(token.access_token, sia)
      .then((res) => {
        if (!res.success) {
          dispatch(ShowModalMessage(res.message));
        } else {
          RefreshDoorstaffList(token.access_token, dispatch)
          dispatch(DoorstaffActions.ClearSiaData());
        }
      })
      .catch((e) => console.log("sign on member error", e));
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
              SetCurrentSupplier(e);
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
            onChange={(e) => SetRateGroupID(e)}
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
              dispatch(DoorstaffActions.SetDoorstaffStartDate(e.target.value));
            }}
          />
        </div>

        <div className={s.start_time}>
          <label>START TIME</label>
          <input
            type="time"
            value={sia.time}
            onChange={(e) => { dispatch(DoorstaffActions.SetDoorstaffStartTime(e.target.value)) }}
            required
          />
        </div>

        <div className={s.buttons}>
          <button className={s.clear} onClick={() => dispatch(DoorstaffActions.ClearSiaData())}>
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
