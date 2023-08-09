import {  useDispatch } from "react-redux";
import { SELECT_ALL_DOORSTAFF_TO_SIGN_OUT, DESELECT_ALL_DOORSTAFF_TO_SIGN_OUT } from "../../../../redux/types";
import s from "./CurrentFooter.module.scss"

export const CurrentFooter=(props)=>{

    const dispatch = useDispatch();

    return(
        <div className={s.button_footer}>
        <div><button onClick={() => dispatch({ type: SELECT_ALL_DOORSTAFF_TO_SIGN_OUT })}> SELECT ALL</button></div>
        <div><button onClick={() => dispatch({ type: DESELECT_ALL_DOORSTAFF_TO_SIGN_OUT })}> DESELECT ALL</button></div>
        <div><button onClick={props.ShowSignOffSelectedModal}>SIGN OUT</button> </div>
      </div>
    )
}