import s from "./ModalMessage.module.scss"
import { useSelector, useDispatch } from "react-redux";

export const ModalMessage = (props) => {

    const show = useSelector((state)=> state.modalMessageReducer)
    const dispatch = useDispatch()

    function  HideModal(){
        dispatch({type:"HIDE_MODAL_MESSAGE"})
    }

    return (
        <>
            {show.showModal === true? <div className={s.container}>
                <div className={s.modal_window}>
                    <div className={s.modal_message}>{show.message}
                    </div>
                    <div className={s.modal_btn}><button onClick={HideModal}>CLOSE</button>
                    </div>
                </div>
            </div> : null}
        </>
    );
}

