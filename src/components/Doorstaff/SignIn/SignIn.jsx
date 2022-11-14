import React from 'react';
import s from "./SignIn.module.scss"
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


export const SignIn = () => {

    const token = useSelector((state) => state.userReducer.user.access_token)

    const headers = {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/x-www-form-urlencoded"

    }
    const doorstaffData = useSelector((state) => state.siaReducer.doorstaff);

    const [fName, setFName] = useState()
    const [sName, setSName] = useState()

    const [storedSuppliers, setStorredSuppliers] = useState([]);
    const [supplier, setSupplier] = useState({})

    const [storedPositions, setStoredPositions] = useState([]);
    const [position, setPosition] = useState({});

    const [storredRate, setStorredRate] = useState([])
    const [rate, setRate] = useState({})

    const [date, setDate] = useState(new Date().toISOString().split('T')[0])
    const [time, setTime] = useState(new Date().toLocaleTimeString([], { timeStyle: 'short' }));

    //GET NAME
    useEffect(() => {
        setFName(doorstaffData.firstName)
        setSName(doorstaffData.lastName)

        if (doorstaffData.firstName) {
            //GET SUPPLIER
            axios.get("https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupSuppliers/" + doorstaffData.position, {
                headers: headers
            }).then((res) => {
                setStorredSuppliers(res.data.suppliers);
                setSupplier(res.data.suppliers[0]);
            }).catch(e => console.log('no supplier ID'))

            //GET POSITIONS
            axios.get("https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupPositions", {
                headers: headers
            }).then((res) => {
                setStoredPositions(res.data.position)
                setPosition(res.data.position[0])
            }).catch((e) => console.log("no positions available"))
        }

    }, [doorstaffData])

    //GET RATE
    useEffect(() => {
        if (position.positionId && supplier.supplierId) {
            axios.get("https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupRates/" + position.positionId + '/' + supplier.supplierId + '/' +
                new Date(date).getTime(), {
                headers: headers,
            }).then((res) => {
                setStorredRate(res.data.rates)
                setRate(res.data.rates[0])
            }).catch((e) => { console.log('no rates') })
        }
    }, [position.positionId])

    function onSubmit(e) {
        e.preventDefault()
        const data = {
            staffId: doorstaffData.staffId,
            staffName: fName + " " + sName,
            positionId: parseInt(position.positionId),
            position: position.positionName,
            locationId: 1177,
            supplierId: supplier.supplierId,
            supplierName: supplier.supplierName,
            startTime: date + "T" + time + ":00.7826209+00:00",
            rateGroupId: rate.rateGroupId
        }
        axios({
            method: "POST",
            url: "https://testapi.etrinity.services/TrinityWebApi/api/Activity/SignOnMember",
            data: data,
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/json"
            }
        })
            .then((res) => {
                console.log(res)
            })
            .catch((e) => {
                console.log(e)
            });
            console.log(data)
    }

    function SetSupplier(e) {
        setSupplier({supplierId: e.target.value, supplierName: e.target.options[e.target.selectedIndex].innerHTML })
    }

    function SetPosition(e) {
        setPosition({ positionId: e.target.value, positionName: e.target.options[e.target.selectedIndex].innerHTML })
    }

    function SetRate(e) {
        setRate({ rateGroupId: e.target.value, rateGroupName: e.target.options[e.target.selectedIndex].innerHTML })
    }

    function SetDate(e) {
        setDate(e.target.value)
    }

    function SetTime(e) {
        setTime(e.target.value)
    }


    return (
        <div className={s.container}>
            <form onSubmit={onSubmit}>
                <div className={s.f_name}>
                    <label htmlFor="first_name">FIRST NAME</label>
                    <input type="text" name='first_name' value={fName || ''} readOnly />
                </div>

                <div className={s.l_name}>
                    <label htmlFor="last_name">LAST NAME</label>
                    <input type="text" name='last_name' value={sName || ''} readOnly />
                </div>

                <div className={s.full_name}>
                    <label htmlFor="full_name">FULL NAME</label>
                    <input type="text" name='full_name' value={fName + " " + sName || ''} readOnly />
                </div>

                <div className={s.position}>
                    <label htmlFor="position">POSITION</label>
                    <select name="position" id="position" onChange={SetPosition}>
                        {storedPositions.map(e => <option key={e.positionId} value={e.positionId}>{e.positionName}</option>)}
                    </select>
                </div>

                <div className={s.supplier}>
                    <label htmlFor="supplier">SUPPLIER</label>
                    <select name="supplier" id="supplier" onChange={SetSupplier}>
                        {storedSuppliers.map(e => <option key={e.supplierId} value={e.supplierId}>{e.supplierName}</option>)}
                    </select>
                </div>

                <div className={s.rate}>
                    <label htmlFor="rate">RATE</label>
                    <select name="rate" id="rate" onChange={SetRate}>
                        {storredRate.map(e => <option key={e.rateGroupId} value={e.rateGroupId}>{e.rateGroupName}</option>)}
                    </select>
                </div>

                <div className={s.date_started}>
                    <label htmlFor="date_started">DATE STARTED</label>
                    <input type="date" name="date_started" id="date_started" value={date} onChange={SetDate} />
                </div>

                <div className={s.start_time}>
                    <label htmlFor="start_time">START TIME</label>
                    <input type="time" name="start_time" id="start_time" value={time} onChange={SetTime} required />
                </div>

                <div className={s.buttons}>
                    <button className={s.clear}>CLEAR</button>
                    <button className={s.submit}>SUBMIT</button>
                </div>
            </form>
        </div>
    )
}
