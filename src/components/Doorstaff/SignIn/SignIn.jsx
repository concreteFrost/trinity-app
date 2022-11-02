import React from 'react';
import s from "./SignIn.module.scss"


export const SignIn = () => (
    <div className={s.container}>
        <form action="#">
            <div className={s.sia} >
                <label htmlFor="sia">#SIA</label>
                <input type="text" name='sia' />
            </div>

            <div className={s.f_name}>
                <label htmlFor="first_name">FIRST NAME</label>
                <input type="text" name='first_name' />
            </div>

            <div className={s.l_name}>
                <label htmlFor="last_name">LAST NAME</label>
                <input type="text" name='last_name' />
            </div>

            <div className={s.full_name}>
                <label htmlFor="full_name">FULL NAME</label>
                <input type="text" name='full_name' />
            </div>

            <div className={s.position}>
                <label htmlFor="position">POSITION</label>
                <select name="position" id="position">
                    <option value="test1">Test 1</option>
                </select>
            </div>

            <div className={s.supplier}>
                <label htmlFor="supplier">SUPPLIER</label>
                <select name="supplier" id="supplier">
                    <option value="test1">Test 1</option>
                </select>
            </div>

            <div className={s.rate}>
                <label htmlFor="rate">RATE</label>
                <select name="rate" id="rate">
                    <option value="test1">Test 1</option>
                </select>
            </div>

            <div className={s.date_started}>
                <label htmlFor="date_started">DATE STARTED</label>
                <input type="date" name="date_started" id="date_started" />
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
);

// SIA FIRST NAME LAST NAME FULL NAME POSITION SUPPLIER RATE DATE STARTED START TIME