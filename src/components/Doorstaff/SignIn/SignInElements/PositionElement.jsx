import React from "react";
import s from "../SignIn.module.scss";
import { GetBadResponse } from "../../../../redux/actions/debugConsoleActions";
import { useDispatch, useSelector } from "react-redux";
import isErrorStatus from "../../../../utils/checkStatusCode";
import { ShowModalMessage } from "../../../../redux/actions/modalActions";
import { GetDoorstaffPositionsAPI } from "../../../../services/activityApi";
import { useEffect } from "react";

function PositionElement({ sia, handleUpdateSia }) {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.user);

  async function getPositions() {
    if (sia.doorstaff.firstName === "") return;

    try {
      const res = await GetDoorstaffPositionsAPI(token.access_token);
      if (res.data.position.length < 0) return;

      handleUpdateSia({
        options: { ...sia.options, positions: res.data.position },
      });
    } catch (error) {
      dispatch(GetBadResponse("get positions", error, "doorstaff"));
    }
  }

  useEffect(() => {
    getPositions();
  }, [sia.doorstaff.firstName]);

  function handlePositionUpdate(e) {
    const position = e.target.value;
    const positionName = e.target.options[e.target.selectedIndex].text;

    handleUpdateSia({
      position: {
        positionId: position,
        positionName: positionName,
      },
    });
  }

  return (
    <div className={s.position}>
      <label>POSITION</label>
      <select
        onChange={handlePositionUpdate}
        disabled={sia.options.positions.length === 0}
      >
        <option value={-1}>Select Position</option>
        {sia.options.positions.map((position) => (
          <option key={position.positionId} value={position.positionId}>
            {position.positionName}
          </option>
        ))}
      </select>
    </div>
  );
}

export default PositionElement;
