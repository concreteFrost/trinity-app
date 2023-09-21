import { GetDoorstaffListAPI } from "../activityApi";
import { GetActivityCurrent, SetDoorStaffList } from "../../redux/actions";
import { GetActivityAPI } from "../reportApi";
import { GetActivityRecents } from "../../redux/actions";

export function RefreshDoorstaffList(token, dispatch) {
  GetDoorstaffListAPI(token)
    .then((res) => {
      console.log("get doorstaff list success", res);
      dispatch(SetDoorStaffList(res));
    })
    .catch((e) => console.log("get doorstaff error", e));
}

export function RefreshActivityList(token, fromDate, toDate, dispatch, activityPeriod) {
  GetActivityAPI(token, fromDate, toDate).then((res) => {
    console.log('get recent activity success', res)
    switch (activityPeriod) {
      case "C":
        dispatch(GetActivityCurrent(res.data.records))
        break;
      case "R":
        dispatch(GetActivityRecents(res.data.records))
        break
    }


  }).catch((e) => console.log('get recent activity error', e))
}

