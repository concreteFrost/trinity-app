import { useDispatch } from "react-redux";
import s from "./CurrentFooter.module.scss"
import * as DoorstaffActions from "../../../../redux/actions/doorstaffActions"

export const CurrentFooter = (props) => {

  const dispatch = useDispatch();

  return (
    <div className={s.button_footer}>
      <div><button onClick={() => dispatch(DoorstaffActions.SelectAllDoorstaffToSingOut())}> SELECT ALL</button></div>
      <div><button onClick={() => dispatch(DoorstaffActions.DeselectAllDoorstaffToSignOut())}> DESELECT ALL</button></div>
      <div><button onClick={props.ShowSignOffSelectedModal}>SIGN OUT</button> </div>
    </div>
  )
}