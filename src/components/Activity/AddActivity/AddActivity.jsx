import s from "./AddActivity.module.scss"
import { useSelector, useDispatch } from 'react-redux'
import { useEffect, useState } from "react";
import { GetActivityTypeOpt, GetSupplierOpt } from "../../../redux/api/activityApi";
import axios from "axios";

export const AddActivity = () => {

    const activityOpt = useSelector(state => state.activityReducer.setOpt.activityTypeOpt);

    const supplierOpt = useSelector(state => state.activityReducer.setOpt.supplierOpt);

    const token = useSelector((state) => state.userReducer.user.access_token);

    const [date, setDate] = useState(new Date().toISOString().split("T")[0])
    const [time, setTime] = useState(
        new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        })
    );

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetActivityTypeOpt(token))
    }, [])

    function FirstSubmit(e){
        e.preventDefault();
        const activityID =e.target[0].value
        const supplierID = e.target[1].value
        const _time = e.target[2].value +"T"+ e.target[3].value + ":00.7826209+00:00"
        const data = {
            activityID : activityID,
            supplierID : supplierID,
            time : _time
        }

        axios
          .get(
            "https://testapi.etrinity.services/TrinityWebApi/api/CentralCosts/LookupRate",     
            {
              headers: {
               Authorization: "Bearer " + token,       
              },

            }
          )
          .then((res) => {
            console.log(data)
            console.log(res)
          })
          .catch((e) => {
            console.log(e)

          });
      
    }

    return (
        <div className={s.container}>
            <form  onSubmit={FirstSubmit}>
                <div className={s.general}>
                    <label htmlFor="type">TYPE</label>
                    <select name="type" onChange={(e) => { dispatch(GetSupplierOpt(token, e.target.value)) }}>
                        {activityOpt.length > 0 ?
                            activityOpt.map((e) => {
                                return <option key={e.id} value={e.id}>{e.name}</option>
                            })
                            : null}
                    </select>

                    <label htmlFor="supplier">SUPPLIER</label>
                    <select name="supplier">
                        {supplierOpt.length > 0 ? supplierOpt.map((e) => { return <option key={e.supplierId} value={e.supplierId}>{e.supplierName}</option> }) : null}
                    </select>
                </div>

                <div className={s.date}>
                    <label htmlFor="date">DATE</label>
                    <input type="date" name="date" value={date} onChange={(e) => setDate(e.target.value)} />

                    <label htmlFor="time">TIME</label>
                    <input type="time" name="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </div>

                <div className={s.check_rate}>
                <button>CHECK RATE</button>
                </div>

              
            </form>
            <form >
                <div className={s.rate}>
                    <label >RATE</label>
                    <div className={s.radio}>
                        <label htmlFor="fixed">fixed</label>
                        <input type="radio" name="rate" id="fixed" value="fixed" />

                        <label htmlFor="custom">custom</label>
                        <input type="radio" name="rate" id="custom" value="custom" />
                    </div>
                </div>

                <div className={s.hours}>

                    <label htmlFor="hours-worked">HOURS WORKED</label>
                    <input type="number" name="hours-worked" />

                    <label htmlFor="value">VALUE</label>
                    <input type="number" name="value" />
                </div>


                <div className={s.notes}>
                    <label htmlFor="notes">NOTES</label>
                    <textarea name="notes" cols="30" rows="10"></textarea>
                </div>

                <div className={s.buttons}>
                    <button className={s.clear}>CLEAR</button>
                    <button className={s.add}>ADD</button>
                </div>
            </form>
        </div>

    )
};

