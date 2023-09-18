import s from "./TypeSelect.module.scss"

export const TypeSelect = (props) => {


    return (<div className={s.locations_select}>
        <label htmlFor="select-doorstaff">TYPE</label>
        <select
            name="select-doorstaff"
            id="selecet-doorstaff"
            onChange={(e) => {
                props.setType(e.target.value);
                e.target.value === "payments"
                    ? props.setShowAuthLevel("")
                    : props.setShowAuthLevel("status");
            }}
        >
            <option value="costs">Costs</option>
            <option value="payments">Payments</option>
        </select>
    </div>)
}