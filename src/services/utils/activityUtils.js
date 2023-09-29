import { GetDoorstaffListAPI } from "../activityApi";
import * as ActivityActions from "../../redux/actions/activityActions"
import * as DoorstaffAction from "../../redux/actions/doorstaffActions"
import { GetActivityAPI } from "../reportApi";

export function RefreshDoorstaffList(token, dispatch) {
  GetDoorstaffListAPI(token)
    .then((res) => {
      console.log("get doorstaff list success", res);
      dispatch(DoorstaffAction.SetDoorStaffList(res.data.staffLogin));
    })
    .catch((e) => console.log("get doorstaff error", e));
}

export function RefreshActivityList(token, fromDate, toDate, dispatch, activityPeriod) {
  GetActivityAPI(token, fromDate, toDate).then((res) => {
    console.log('get recent activity success', res)
    switch (activityPeriod) {
      case "C":
        dispatch(ActivityActions.GetActivityCurrent(res.data.records))
        break;
      case "R":
        dispatch(ActivityActions.GetActivityRecents(res.data.records))
        break
    }


  }).catch((e) => console.log('get recent activity error', e))
}

