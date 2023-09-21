import { GetDoorstaffListAPI } from "../activityApi";
import { SetDoorStaffList } from "../../redux/actions";

export function RefreshDoorstaffList(token, dispatch) {
  GetDoorstaffListAPI(token)
    .then((res) => {
      console.log("get doorstaff list success", res);
      dispatch(SetDoorStaffList(res));
    })
    .catch((e) => console.log("get doorstaff error", e));
}
