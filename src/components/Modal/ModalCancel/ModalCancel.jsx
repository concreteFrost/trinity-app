import s from "./ModalCancel.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {CancelDoorStaff}from "../../../redux/api/doorstaffAPI";

export const ModalCancel = (props) => {

    const modalCancelReducer = useSelector((state) => state.modalCancelReducer)
    const token = useSelector((state) => state.userReducer.user.access_token)

    const dispatch = useDispatch()

    function Cancel(e) {
        e.preventDefault();
        dispatch(CancelDoorStaff(modalCancelReducer.activityToModify,token))
      
    }

    function HideModal(e) {
        e.preventDefault()
        dispatch({ type: "HIDE_ACTION_MODAL" });

    }

    function Submit(e) {
        e.preventDefault();    
        dispatch({ type: "HIDE_ACTION_MODAL" });
    }

    return (
        <>
            {modalCancelReducer.isVisible === true ? <div className={s.container}>
                <div className={s.modal_window} >
                    <div className={s.modal_message}>Are you sure you want to cancel this shift?
                    </div>
                    <div className={s.input_body}>
                        <form onSubmit={Submit}>
                            <div className={s.modal_btn}>
                                <button onClick={modalCancelReducer.activityType === "CANCEL" ? Cancel : null}>SUBMIT</button>
                                <button onClick={HideModal}>CLOSE</button>
                            </div>

                        </form>
                    </div>

                </div>
            </div> : null}
        </>
    );
}
