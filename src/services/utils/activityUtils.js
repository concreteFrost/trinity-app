import { GetDoorstaffListAPI } from "../activityApi";
import * as ActivityActions from "../../redux/actions/activityActions"
import * as DoorstaffAction from "../../redux/actions/doorstaffActions"
import { GetActivityAPI } from "../reportApi";
import { GetBadResponse, GetResponse } from "../../redux/actions/debugConsoleActions";

export function RefreshDoorstaffList(token, dispatch) {
  GetDoorstaffListAPI(token)
    .then((res) => {
      dispatch(GetResponse('get doorstaff success', res))
      dispatch(DoorstaffAction.SetDoorStaffList(res.data.staffLogin));
    })
    .catch((e) => dispatch(GetBadResponse('get doorstaff error', e)));
}

export function RefreshActivityList(token, fromDate, toDate, dispatch, activityPeriod) {
  GetActivityAPI(token, fromDate, toDate).then((res) => {
    dispatch(GetResponse('get activity success', res))
    switch (activityPeriod) {
      case "C":
        dispatch(ActivityActions.GetActivityCurrent(res.data.records))
        break;
      case "R":
        dispatch(ActivityActions.GetActivityRecents(res.data.records))
        break
    }


  }).catch((e) => dispatch(GetBadResponse('get activity error', e)))
}

