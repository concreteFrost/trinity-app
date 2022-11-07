import s from "./HistoryForm.module.scss"

export const HistoryForm = () => (
    <div className={s.container}>
        <form action="#">
            <div><label htmlFor="user">USER</label>
                <select name="user" id="user">
                    <option value="test1">Test 1</option>
                </select>

                <label htmlFor="staff">STAFF</label>
                <select name="staff" id="staff">
                    <option value="test1">Test 1</option>
                </select>
            </div>

            <div >
                <label htmlFor="location">LOCATION</label>
                <select name="location" id="location">
                    <option value="test1">Test 1</option>
                </select>

                <label htmlFor="type">TYPE</label>
                <select name="type" id="type">
                    <option value="test1">Test 1</option>
                </select>
            </div>

            <div className={s.reference}>
                <label htmlFor="reference">REFERENCE NUMBER</label>
                <input type="number" name="reference" id="reference" />
            </div>


            <div className={s.dates}>
                <div>  <label htmlFor="from-date">FROM</label>
                    <input type="date" name="from-date" id="fro-date" />
                </div>
                <div>   <label htmlFor="to-date">TO</label>
                    <input type="date" name="to-date" id="to-date" /></div>
            </div>


            <div className={s.button_col}><button>SEARCH</button></div>
        </form>
    </div>
);

