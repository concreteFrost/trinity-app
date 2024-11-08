import React, { useEffect } from "react";
import s from "../SignIn.module.scss";
import { SignOnMemberAPI } from "../../../../services/activityApi";
import { useDispatch, useSelector } from "react-redux";
import { ShowModalMessage } from "../../../../redux/actions/modalActions";
import { RefreshDoorstaffList } from "../../../../services/utils/activityUtils";
import isErrorStatus from "../../../../utils/checkStatusCode";
import { GetBadResponse } from "../../../../redux/actions/debugConsoleActions";

function ActionsElement({ sia, clearDoorstaffData }) {
  const token = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  async function Submit() {
    if (sia.rateId == -1) return;

    const data = {
      staffId: sia.doorstaff.staffId,
      staffName: sia.doorstaff.firstName + " " + sia.doorstaff.lastName,
      positionId: parseInt(sia.position.positionId),
      position: sia.position.positionName,
      locationId: parseInt(token.locationId),
      supplierId: parseInt(sia.supplier.supplierId),
      supplierName: sia.supplier.supplierName,
      startTime: sia.date + "T" + sia.time,
      rateGroupId: sia.rateId,
    };

    try {
      const res = await SignOnMemberAPI(token.access_token, data);
      if (!res.data.success) {
        dispatch(ShowModalMessage(res.data.message));
      } else {
        await RefreshDoorstaffList(token.access_token, dispatch);
        clearDoorstaffData();
      }
      if (isErrorStatus(res)) {
        dispatch(GetBadResponse("sign in doorstaff error", res, "doorstaff"));
      }
    } catch (error) {
      dispatch(ShowModalMessage(error.response.data));
      dispatch(GetBadResponse("sign in doorstaff error", error, "doorstaff"));
    }
  }
  return (
    <div className={s.buttons}>
      <button className={s.clear} onClick={clearDoorstaffData}>
        CLEAR
      </button>

      <button
        disabled={sia.rateId == -1}
        className={s.submit}
        style={sia.rateId == -1 ? { opacity: 0.3 } : { opacity: 1 }}
        onClick={Submit}
      >
        SUBMIT
      </button>
    </div>
  );
}

export default ActionsElement;
