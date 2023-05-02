import s from "./SwitchType.module.scss"
import { useSelector, useDispatch } from "react-redux"

export const SwitchType = () => {

  const dispatch = useDispatch();
  const currentType = useSelector(state => state.pubManagerAnalyticsReducer.currentType);
  return (
    <div className={s.switch_type}>
      <label htmlFor="select-doorstaff">TYPE</label>
      <select
        name="select-type"
        id="selecet-type"
        value={currentType}
        onChange={(e) => dispatch({ type: "SET_CURRENT_TYPE", data: e.target.value })}
      >
        <option value="S">Doorstaff</option>
        <option value="A">Costs</option>
        <option value="C">Combined</option>
      </select>
    </div>
  )
}