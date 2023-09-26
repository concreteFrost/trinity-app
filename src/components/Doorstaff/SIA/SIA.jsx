import s from "./SIA.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { HideLoader, ShowLoader } from "../../../redux/actions/loaderActions";
import * as DoorstaffActions from "../../../redux/actions/doorstaffActions";
import {
  GetDoorstaffPositionsAPI,
  GetSiaDataAPI,
} from "../../../services/activityApi";
import {ShowModalMessage} from "../../../redux/actions/modalActions";
import {AddSuccessMessage} from "../../../redux/actions/debugConsoleActions"

export const SIA = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.user.access_token);
  const sia = useSelector((state) => state.siaReducer.siaNumber);

  async function handleSubmit(e) {
    e.preventDefault();

    dispatch(ShowLoader());
    GetSiaDataAPI(sia, token)
      .then((siaResult) => {
        if (siaResult.message !== null) {
          dispatch(ShowModalMessage(siaResult.message));
          dispatch(DoorstaffActions.ClearSiaData());
         
        }
        dispatch(DoorstaffActions.SetSiaData(siaResult));
        dispatch(AddSuccessMessage('get sia data success'));
        GetDoorstaffPositionsAPI(token).then((res) => {
          dispatch(DoorstaffActions.GetDoorstaffPositionsOptions(res));
          dispatch(DoorstaffActions.SetDoorstaffCurrentPosition(res[0]));
        });
      })
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
