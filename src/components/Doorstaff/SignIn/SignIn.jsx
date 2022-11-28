import React from "react";
import s from "./SignIn.module.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { GetDoorstaffPositions, GetDoorstaffRates, GetDoorstaffSuppliers, SetDoorStaff } from '../../../redux/api/doorstaffAPI'
import { ClearSiaData } from "../../../redux/actions";

export const SignIn = (props) => {
  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user);
  const errorMessage = useSelector((state) => state.siaReducer.errorMessage)

  const headers = {
    Authorization: "Bearer " + token.access_token,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const doorstaffData = useSelector((state) => state.siaReducer.doorstaff);

  const options = useSelector((state => state.siaReducer.options));

  const supplier = useSelector(state => state.siaReducer.supplier)
  const position = useSelector(state => state.siaReducer.position)
  const rate = useSelector(state => state.siaReducer.rate)

  const date = useSelector(state => state.siaReducer.date)
  const time = useSelector(state => state.siaReducer.time)

  useEffect(() => {
    if (doorstaffData.staffId)
      dispatch(GetDoorstaffPositions(headers))
  }, [doorstaffData.staffId])

  useEffect(() => {
    if (position !== null)
      dispatch(GetDoorstaffSuppliers(headers, position.positionId))
  }, [position])

  //GET RATE
  useEffect(() => {
    if (position !== null && supplier !== null)
      dispatch(GetDoorstaffRates(position.positionId, supplier.supplierId, date, headers))
  }, [position, supplier]);

  function Submit() {
    if (rate !== null) {
      const data = {
        staffId: doorstaffData.staffId,
        staffName: doorstaffData.firstName + " " + doorstaffData.lastName,
        positionId: parseInt(position.positionId),
        position: position.positionName,
        locationId: parseInt(token.locationId),
        supplierId: parseInt(supplier.supplierId),
        supplierName: supplier.supplierName,
        startTime: date + "T" + time + ":00.7826209+00:00",
        rateGroupId: rate,

      }
      dispatch(SetDoorStaff(token.access_token, data))
    }
  }

  return (
    <div className={s.container}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={s.f_name}>
          <label htmlFor="first_name">FIRST NAME</label>
          <input type="text" name="first_name" value={doorstaffData.firstName || ""} readOnly />
        </div>

        <div className={s.l_name}>
          <label htmlFor="last_name">LAST NAME</label>
          <input
            type="text"
            name="last_name"
            value={doorstaffData.lastName || ""}
            readOnly
          />
        </div>

        <div className={s.position}>
          <label htmlFor="position">POSITION</label>
          <select name="position" id="position" onChange={(e) => { dispatch({ type: "SET_DOORSTAFF_POSITION", data: { positionId: e.target.value, positionName: e.target.options[e.target.selectedIndex].text } }) }}>
            {options.positions.length > 0
              ? options.positions.map((e) => (
                <option key={e.positionId} value={e.positionId}>
                  {e.positionName}
                </option>
              ))
              : null}
          </select>
        </div>

        <div className={s.supplier}>
          <label htmlFor="supplier">SUPPLIER</label>
          <select name="supplier" id="supplier" onChange={(e) => { dispatch({ type: "SET_DOORSTAFF_SUPPLIER", data: { supplierId: e.target.value, supplierName: e.target.options[e.target.selectedIndex].text } }) }}>
            {options.suppliers.length > 0
              ? options.suppliers.map((e) => (
                <option key={e.supplierId} value={e.supplierId}>
                  {e.supplierName}
                </option>
              ))
              : null}
          </select>
        </div>

        <div className={s.rate}>
          <label htmlFor="rate">RATE</label>
          <select name="rate" id="rate" onChange={(e) => dispatch({ type: "SET_DOORSTAFF_RATE", data: e.target.value })}>
            {options.rates.length > 0
              ? options.rates.map((e) => (
                <option key={e.rateGroupId} value={e.rateGroupId}>
                  {e.rateGroupName}
                </option>
              ))
              : null}
          </select>
        </div>

        <div className={s.date_started}>
          <label htmlFor="date_started">DATE STARTED</label>
          <input
            type="date"
            name="date_started"
            id="date_started"
            value={date}
            onChange={(e) => {
              dispatch({ type: "SET_DOORSTAFF_START_DATE", data: e.target.value })
            }}
          />
        </div>

        <div className={s.start_time}>
          <label htmlFor="start_time">START TIME</label>
          <input
            type="time"
            name="start_time"
            id="start_time"
            value={time}
            onChange={(e) => {
              dispatch({ type: "SET_DOORSTAFF_START_TIME", data: e.target.value })
            }}
            required
          />
        </div>

        <div className={s.buttons}>
          <button className={s.clear} onClick={()=>dispatch(ClearSiaData())}>
            CLEAR
          </button>
          <button className={s.submit} onClick={Submit}>
            SUBMIT
          </button>
        </div>
      </form>
      {errorMessage.length > 0 ? <div className={s.error_message}>
        {errorMessage}
      </div> : null}

    </div>


  );
};
