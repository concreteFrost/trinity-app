import React from "react";
import s from "./SignIn.module.scss";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { ClearSiaData, GetDoorstaff} from '../../../redux/actions'

export const SignIn = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.user.access_token);

  const headers = {
    Authorization: "Bearer " + token,
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const doorstaffData = useSelector((state) => state.siaReducer.doorstaff);

  const [name, setName] = useState();
  const [secondName, setSecondName] = useState();

  const [storedSuppliers, setStorredSuppliers] = useState([]);
  const [supplier, setSupplier] = useState({});

  const [storedPositions, setStoredPositions] = useState([]);
  const [position, setPosition] = useState({});

  const [storedRates, setStoredRates] = useState([]);
  const [rate, setRate] = useState({});

  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

  const [time, setTime] = useState(
    new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  );

  let data = {}

  //GET NAME
  useEffect(() => {
    //GET SUPPLIER
    if (doorstaffData.staffId) {
      setName(doorstaffData.firstName);
      setSecondName(doorstaffData.lastName);
      axios
        .get(
          "https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupSuppliers/" +
          doorstaffData.position,
          {
            headers: headers,
          }
        )
        .then((res) => {
          setStorredSuppliers(res.data.suppliers);
          setSupplier(res.data.suppliers[0]);
        })
        .catch((e) => console.log("no supplier ID"));

      //GET POSITIONS
      axios
        .get(
          "https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupPositions",
          {
            headers: headers,
          }
        )
        .then((res) => {
          setStoredPositions(res.data.position);
          setPosition(res.data.position[0]);
        })
        .catch((e) => console.log("no positions available"));
    }
    else {
      Clear()
    }
  }, [doorstaffData.staffId]);

  //GET RATE
  useEffect(() => {
    if (position.positionId && supplier.supplierId)
      axios
        .get(
          "https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupRates/" +
          position.positionId +
          "/" +
          supplier.supplierId +
          "/" +
          new Date(date).getTime(),
          {
            headers: headers,
          }
        )
        .then((res) => {
          setStoredRates(res.data.rates);
          setRate(res.data.rates[0]);
        })
        .catch((e) => {
          console.log("no rates");
        });

  }, [position.positionId, supplier.supplierId]);

  function Submit() {
    if (rate.rateGroupId) {
      data = {
        staffId: doorstaffData.staffId,
        staffName: doorstaffData.firstName + " " + doorstaffData.lastName,
        positionId: parseInt(position.positionId),
        position: position.positionName,
        locationId: token.locationId,
        supplierId: supplier.supplierId,
        supplierName: supplier.supplierName,
        startTime: date + "T" + time + ":00.7826209+00:00",
        rateGroupId: rate.rateGroupId,
      }
      axios({
        method: "POST",
        url: "https://testapi.etrinity.services/TrinityWebApi/api/Activity/SignOnMember",
        data: data,
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      }).then((res) => {
         dispatch(GetDoorstaff(token))
      }).then(() => Clear())
        .catch((e) => {
          console.log(e);
        });
    }
  }

  function Clear() {
    setStoredRates([])
    setStoredPositions([])
    setStorredSuppliers([])
    setPosition({})
    setSupplier({})
    setName('')
    setSecondName('')
    setRate('')
    dispatch(ClearSiaData())
  }



  function SetSupplier(e) {
    let data = {
      supplierId: e.target.value,
      supplierName: e.target.options[e.target.selectedIndex].innerHTML,
    };
    setSupplier(data);
  }

  function SetPosition(e) {
    const data = {
      positionId: e.target.value,
      positionName: e.target.options[e.target.selectedIndex].innerHTML,
    };
    setPosition(data);
  }

  function SetRate(e) {
    const data = {
      rateGroupId: e.target.value,
      rateGroupName: e.target.options[e.target.selectedIndex].innerHTML,
    };
    setRate(data);
  }



  return (
    <div className={s.container}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className={s.f_name}>
          <label htmlFor="first_name">FIRST NAME</label>
          <input type="text" name="first_name" value={name || ""} readOnly />
        </div>

        <div className={s.l_name}>
          <label htmlFor="last_name">LAST NAME</label>
          <input
            type="text"
            name="last_name"
            value={secondName || ""}
            readOnly
          />
        </div>

        <div className={s.position}>
          <label htmlFor="position">POSITION</label>
          <select name="position" id="position" onChange={SetPosition}>
            {storedPositions
              ? storedPositions.map((e) => (
                <option key={e.positionId} value={e.positionId}>
                  {e.positionName}
                </option>
              ))
              : null}
          </select>
        </div>

        <div className={s.supplier}>
          <label htmlFor="supplier">SUPPLIER</label>
          <select name="supplier" id="supplier" onChange={SetSupplier}>
            {storedSuppliers
              ? storedSuppliers.map((e) => (
                <option key={e.supplierId} value={e.supplierId}>
                  {e.supplierName}
                </option>
              ))
              : null}
          </select>
        </div>

        <div className={s.rate}>
          <label htmlFor="rate">RATE</label>
          <select name="rate" id="rate" onChange={SetRate}>
            {storedRates
              ? storedRates.map((e) => (
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
              setDate(e.target.value);
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
              setTime(e.target.value);
            }}
            required
          />
        </div>

        <div className={s.buttons}>
          <button className={s.clear} onClick={Clear}>
            CLEAR
          </button>
          <button className={s.submit} onClick={Submit}>
            SUBMIT
          </button>
        </div>
      </form>
    </div>
  );
};
