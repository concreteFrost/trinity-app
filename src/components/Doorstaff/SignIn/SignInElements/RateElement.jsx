import React, { useEffect } from "react";
import s from "../SignIn.module.scss";
import { GetDoorstaffRatesAPI } from "services/activityApi";
import { GetBadResponse } from "redux/actions/debugConsoleActions";
import { useDispatch, useSelector } from "react-redux";
import isErrorStatus from "utils/checkStatusCode";
import { ShowModalMessage } from "redux/actions/modalActions";

function RateElement({ sia, handleUpdateSia }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.user);

  function SetRateGroupID(e) {
    handleUpdateSia({
      rateId: e.target.value,
    });
  }

  function clearRates() {
    handleUpdateSia({ rateId: -1, options: { ...sia.options, rates: [] } });
  }

  async function getRatesOpt() {
    if (sia.supplier.supplierId == -1) return;

    try {
      const res = await GetDoorstaffRatesAPI(
        token.access_token,
        sia.position.positionId,
        sia.supplier.supplierId,
        sia.date
      );

      if (!res.data.success) {
        dispatch(ShowModalMessage(res.data.message));
      }
      if (isErrorStatus(res)) {
        dispatch(GetBadResponse("get doorstaff rates error", res, "doorstaff"));
      }
      handleUpdateSia({
        options: {
          ...sia.options,
          rates: res.data.rates,
        },
      });
    } catch (error) {
      dispatch(GetBadResponse("get doorstaff rates error", error, "doorstaff"));
    }
  }

  useEffect(() => {
    clearRates();
    getRatesOpt();
  }, [sia.supplier.supplierId]);

  return (
    <div className={s.rate}>
      <label>RATE</label>
      <select
        onChange={(e) => SetRateGroupID(e)}
        disabled={sia.supplier.supplierId == -1}
      >
        <option value={"-1"}>Select Rate</option>
        {sia.options.rates.map((e) => (
          <option key={e.rateGroupId} value={e.rateGroupId}>
            {e.rateGroupName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RateElement;
