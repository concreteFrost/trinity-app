import { GetDoorstaffList } from "../activityApi";
import { SetDoorStaffList } from "../../redux/actions";

export function RefreshDoorstaffList(token,dispatch) {
  GetDoorstaffList(token)
    .then((res) => {
      console.log("get doorstaff list success", res);
      dispatch(SetDoorStaffList(res));
    })
    .catch((e) => console.log("get doorstaff error", e));
}
