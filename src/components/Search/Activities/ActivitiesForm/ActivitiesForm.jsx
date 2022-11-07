import s from "./ActivitiesForm.module.scss"

export const ActivitiesForm = () => (
    <div className={s.container}>
          
        <form action="#">
            <div><label htmlFor="staff-group">STAFF/GROUP</label>
                <select name="staff-group" id="staff-group">
                    <option value="test1">Test 1</option>
                </select>
                <select name="staff-group-2" id="staff-group-2">
                    <option value="staff-group-2">Test 1</option>
                </select>
            </div>

            <div >
            <label htmlFor="location-group">LOCATION/GROUP</label>
                <select name="location-group" id="location-group">
                    <option value="test1">Test 1</option>
                </select>

              
                <select name="location-group-2" id="location-group-2">
                    <option value="location-group-2">Test 1</option>
                </select>
            </div>

            <div >
            <label htmlFor="supplier-group">SUPPLIER/GROUP</label>
                <select name="supplier-group" id="supplier-group">
                    <option value="test1">Test 1</option>
                </select>

              
                <select name="supplier-group-2" id="supplier-group-2">
                    <option value="location-group-2">Test 1</option>
                </select>
            </div>

            <div >
            <label htmlFor="payment-status" className={s.payment_status}>PAYMENT STATUS</label>
                <select name="payment-status" id="payment-status">
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

