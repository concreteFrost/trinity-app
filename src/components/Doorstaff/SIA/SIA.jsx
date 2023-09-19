import s from "./SIA.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { TailSpin } from "react-loader-spinner";
import {
  ClearSiaData,
  GetDoorstaffPositionsOptions,
  SetDoorstaffCurrentPosition,
  SetSiaData,
  ShowModalMessage,
} from "../../../redux/actions";
import {
  GetDoorstaffPositions,
  GetSiaData,
} from "../../../services/activityApi";

export const SIA = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.user.access_token);
  const sia = useSelector((state) => state.siaReducer.siaNumber);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    GetSiaData(sia, token)
      .then((siaResult) => {
        console.log("get sia data success", siaResult);
        if (siaResult.message !== null) {
          dispatch(ShowModalMessage(siaResult.message));
          dispatch(ClearSiaData());
        }
        dispatch(SetSiaData(siaResult));
        GetDoorstaffPositions(token)
          .then((res) => {
            console.log("get positions success", res[0]);
            dispatch(GetDoorstaffPositionsOptions(res));
            dispatch(SetDoorstaffCurrentPosition(res[0]));
          })
          .catch((e) => {
            console.log("get positions error", e);
          });
      })
      .catch((e) => console.log("get sia data error", e))
      .finally(() => {
        setIsLoading(false);
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
      {isLoading === true ? (
        <div className="tail_spin_container">
          <div className="tail_spin">
            <TailSpin width={150} height={150} color={"#42aaf5"}></TailSpin>
          </div>{" "}
        </div>
      ) : null}
    </div>
  );
};
