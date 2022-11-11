import React from 'react';
import s from "./SignIn.module.scss"
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


export const SignIn = () => {

    const token = useSelector((state) => state.userReducer.user.access_token)

    const doorstaffData = useSelector((state) => state.siaReducer.doorstaff);
    const [fName, setFName] = useState()
    const [sName, setSName] = useState()

    const [supplierOPT, setSupplierOPT] = useState([])
    const [supplierID, setSupplierID] = useState();

    const [rate, setRate] = useState([])
    const [date, setDate] = useState(new Date().toISOString().split('T')[0])

    //GET NAME
    useEffect(() => {
        setFName(doorstaffData.firstName)
        setSName(doorstaffData.lastName)
    }, [doorstaffData])

    //GET SUPPLIER OPTIONS
    useEffect(() => {
        if (doorstaffData.position) {
            axios.get("https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupSuppliers/" + doorstaffData.position, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((res) => {
                setSupplierOPT(res.data.suppliers)
                setSupplierID(res.data.suppliers[0].supplierId)
              
            })
        }
    }, [doorstaffData])

    //GET RATE
    useEffect(() => {
        if (supplierID) {
            axios.get("https://testapi.etrinity.services/TrinityWebApi/api/Activity/LookupRates/" + doorstaffData.position + '/' + supplierID + '/' +
                new Date(date).getTime(), {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((res) => {
                console.log('rate', res)
                console.log("supplier id ",supplierID);

            }).catch((e) => { console.log('error') })

        }
    }, [supplierID])

    function SetSupplierID(e) {
        setSupplierID(e.target.value)
    }

    function SetDate(e) {
        setDate(e.target.value)
    }

    return (
        <div className={s.container}>
            <form action="#">
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
                    <select name="position" id="position">
                    </select>
                </div>

                <div className={s.supplier}>
                    <label htmlFor="supplier">SUPPLIER</label>
                    <select name="supplier" id="supplier" onChange={SetSupplierID}>
                        {supplierOPT.map(e => <option key={e.supplierId} value={e.supplierId}>{e.supplierName}</option>)}
                    </select>
                </div>

                <div className={s.rate}>
                    <label htmlFor="rate">RATE</label>
                    <select name="rate" id="rate">
                    </select>
                </div>

                <div className={s.date_started}>
                    <label htmlFor="date_started">DATE STARTED</label>
                    <input type="date" name="date_started" id="date_started" value={date} onChange={SetDate} />
                </div>

                <div className={s.start_time}>
                    <label htmlFor="start_time">START TIME</label>
                    <input type="time" name="start_time" id="start_time" />
                </div>

                <div className={s.buttons}>
                    <button className={s.clear}>CLEAR</button>
                    <button className={s.submit}>SUBMIT</button>
                </div>
            </form>
        </div>
    )
}


// SIA FIRST NAME LAST NAME FULL NAME POSITION SUPPLIER RATE DATE STARTED START TIME