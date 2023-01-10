import s from "./ModalLogout.module.scss"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserLogOff } from "../../../redux/actions";

export const ModalLogout = (props) => {
    const navigate = useNavigate();
   
    const show = useSelector((state) => state.modalLogoutReducer)
    const dispatch = useDispatch()

    function Logout(e) {
        e.preventDefault();
        dispatch(UserLogOff()); 
        localStorage.setItem('activityShown',false)  
       navigate('/login')
     }

    function HideModal(e) {
        e.preventDefault()
        dispatch({type:"HIDE_LOGOUT_MODAL"});

    }

    function Submit(e) {
        e.preventDefault();       
    }

    return (
        <>
            {show.isVisible === true ? <div className={s.container}>
                <div className={s.modal_window} >
                    <div className={s.modal_message}>Are you sure you want to logout?
                    </div>
                    <div className={s.input_body}>
                        <form onSubmit={Submit}>
                            <div className={s.modal_btn}>
                                <button onClick={Logout}>SUBMIT</button>
                                <button onClick={HideModal}>CLOSE</button>
                            </div>

                        </form>
                    </div>

                </div>
            </div> : null}
        </>
    );
}
