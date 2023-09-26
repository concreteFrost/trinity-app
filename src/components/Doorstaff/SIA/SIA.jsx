import s from "./SIA.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import {
  HideLoader,
  SetSiaData,
  ShowLoader,
  ShowModalMessage,
} from "../../../redux/actions";
import * as DoorstaffActions from "../../../redux/actions/doorstaffActions";
import {
  GetDoorstaffPositionsAPI,
  GetSiaDataAPI,
} from "../../../services/activityApi";

export const SIA = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.user.access_token);
  const sia = useSelector((state) => state.siaReducer.siaNumber);

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(ShowLoader());
    GetSiaDataAPI(sia, token)
      .then((siaResult) => {
        console.log("get sia data success", siaResult);
        if (siaResult.message !== null) {
          dispatch(ShowModalMessage(siaResult.message));
          dispatch(DoorstaffActions.ClearSiaData());
        }
        dispatch(DoorstaffActions.SetSiaData(siaResult));
        GetDoorstaffPositionsAPI(token)
          .then((res) => {
            console.log("get positions success", res[0]);
            dispatch(DoorstaffActions.GetDoorstaffPositionsOptions(res));
            dispatch(DoorstaffActions.SetDoorstaffCurrentPosition(res[0]));
          })
          .catch((e) => {
            console.log("get positions error", e);
          });
      })
      .catch((e) => console.log("get sia data error", e))
      .finally(() => {

        dispatch(HideLoader());
      });
  }
  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sia">#SIA</label>
          <input
            type="text"
            name="sia"
            value={sia || ""}
            onChange={(e) => {
              dispatch({ type: "SET_SIA_NUMBER", data: e.target.value });
            }}
          />
        </div>
        <button>
          <FaSearch></FaSearch>
        </button>
      </form>
    </div>
  );
};
