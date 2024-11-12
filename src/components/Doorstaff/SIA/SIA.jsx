import s from "./SIA.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { HideLoader, ShowLoader } from "redux/actions/loaderActions";
import { GetSiaDataAPI } from "services/activityApi";
import { ShowModalMessage } from "redux/actions/modalActions";
import { GetBadResponse } from "redux/actions/debugConsoleActions";
import isErrorStatus from "utils/checkStatusCode";

export const SIA = ({ sia, setSia, clearDoorstaffData }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.user.access_token);

  function handleSetSiaNumber(e) {
    setSia((prev) => {
      return { ...prev, siaNumber: e.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    clearDoorstaffData();
    dispatch(ShowLoader());

    try {
      const res = await GetSiaDataAPI(sia.siaNumber, token);
      if (res.data.message !== null) {
        dispatch(ShowModalMessage(res.data.message));
        return;
      }

      if (isErrorStatus(res)) {
        dispatch(GetBadResponse("get sia data error", res));
        return;
      }

      setSia((prev) => {
        return {
          ...prev,
          doorstaff: {
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            staffId: res.data.staffId,
          },
          siaNumber: res.data.licenceNumber,
        };
      });
    } catch (error) {
      dispatch(GetBadResponse("get sia data error", error));
    } finally {
      dispatch(HideLoader());
    }
  }

  return (
    <div className={s.container}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="sia">#SIA</label>
          <input
            type="text"
            name="sia"
            value={sia.siaNumber || ""}
            onChange={(e) => {
              handleSetSiaNumber(e);
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
