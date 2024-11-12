import { GetDoorstaffListAPI } from "../activityApi";
import * as ActivityActions from "redux/actions/activityActions";
import * as DoorstaffAction from "redux/actions/doorstaffActions";
import { GetActivityAPI } from "../reportApi";
import { GetBadResponse, GetResponse } from "redux/actions/debugConsoleActions";
import isErrorStatus from "utils/checkStatusCode";

export function RefreshDoorstaffList(token, dispatch) {
  GetDoorstaffListAPI(token)
    .then((res) => {
      if (isErrorStatus(res)) {
        dispatch(GetBadResponse("get doorstaff error", res, "doorstaff"));
      }
      dispatch(DoorstaffAction.SetDoorStaffList(res.data.staffLogin));
    })
    .catch((e) =>
      dispatch(GetBadResponse("get doorstaff error", e, "doorstaff"))
    );
}

export function RefreshActivityList(
  token,
  fromDate,
  toDate,
  dispatch,
  activityPeriod
) {
  GetActivityAPI(token, fromDate, toDate)
    .then((res) => {
      if (isErrorStatus(res)) {
        dispatch(GetBadResponse("get activity error", res, "activity"));
      }
      switch (activityPeriod) {
        case "C":
          dispatch(ActivityActions.GetActivityCurrent(res.data.records));
          break;
        case "R":
          dispatch(ActivityActions.GetActivityRecents(res.data.records));
          break;
      }
    })
    .catch((e) =>
      dispatch(GetBadResponse("get activity error", e, "activity"))
    );
}
