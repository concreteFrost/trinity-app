import { useDispatch } from "react-redux";
import s from "./CurrentFooter.module.scss"
import { DeselectAllDoorstaffToSignOut, SelectAllDoorstaffToSingOut } from "../../../../redux/actions";

export const CurrentFooter = (props) => {

  const dispatch = useDispatch();

  return (
    <div className={s.button_footer}>
      <div><button onClick={() => dispatch(SelectAllDoorstaffToSingOut())}> SELECT ALL</button></div>
      <div><button onClick={() => dispatch(DeselectAllDoorstaffToSignOut())}> DESELECT ALL</button></div>
      <div><button onClick={props.ShowSignOffSelectedModal}>SIGN OUT</button> </div>
    </div>
  )
}