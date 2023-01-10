import s from "./ModalMessage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { HIDE_MODAL_MESSAGE } from "../../../redux/types";

export const ModalMessage = (props) => {
  const show = useSelector((state) => state.modalMessageReducer);
  const dispatch = useDispatch();
  const nav = useNavigate();
  console.log(show);
  function HideModal() {
    dispatch({ type: "HIDE_MODAL_MESSAGE" });
    localStorage.setItem("activityShown", true);
  }

  function viewSIAdisputes(){
    nav('/doorstaff')
    dispatch({type: HIDE_MODAL_MESSAGE})
  }

  function viewCCdisputes(){
    nav('/activity')
    dispatch({type: HIDE_MODAL_MESSAGE})
  }

  return (
    <>
      {show.showModal === true ? (
        <div className={s.container}>
          <div className={s.modal_window}>
            <div className={s.modal_message}>{show.message}</div>
            {show.DisputedSIA > 0 ? (
              <div>
                {show.DisputedSIA} SIA disputes
                <button onClick={viewSIAdisputes}>view</button>
                </div>
            ) : null}
            {show.DisputedCC > 0 ? (
              <div>{show.DisputedCC} CC disputes
              <button onClick={viewCCdisputes}>view</button>
              </div>
            ) : null}
            <div></div>
            <div className={s.modal_btn}>
              <button onClick={HideModal}>CLOSE</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
