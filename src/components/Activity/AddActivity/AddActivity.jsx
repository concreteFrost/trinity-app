import s from "./AddActivity.module.scss"

export const AddActivity = () => (
    <div className={s.container}>
        <form action="#">
            <div className={s.general}>
                <label htmlFor="type">TYPE</label>
                <select name="type">
                    <option value="entertainment">ENTERTAINMENT</option>
                    <option value="windows">WINDOWS</option>
                    <option value="cleaning">CLEANING</option>
                    <option value="flowers">FLOWERS</option>
                    <option value="garden maintainence">GARDEN MAINTAINENCE</option>
                </select>

                <label htmlFor="supplier">SUPPLIER</label>
                <select name="supplier">
                    <option value="test1">TEST 1</option>
                </select>
            </div>

            <div className={s.date}>
                <label htmlFor="date">DATE</label>
                <input type="date" name="date" />

                <label htmlFor="time">TIME</label>
                <input type="time" name="time" />
            </div>

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
);

