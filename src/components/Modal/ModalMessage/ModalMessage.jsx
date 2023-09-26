import s from "./ModalMessage.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {HideModalMessage} from "../../../redux/actions/modalActions"

export const ModalMessage = (props) => {
  const show = useSelector((state) => state.modalMessageReducer);
  const dispatch = useDispatch();
  const nav = useNavigate();

  function HideModal() {
    dispatch(HideModalMessage());
  }

  function viewSIAdisputes() {
    nav('/doorstaff/disputed')
    dispatch(HideModalMessage())
  }

  function viewCCdisputes() {
    nav('/activity/disputed')
    dispatch(HideModalMessage())
  }

  return (
    <>
      {show.showModal === true ? (
        <div className={s.container}>
          <div className={s.modal_window}>
            <div className={s.modal_header}>{show.header}</div>
            <div className={s.modal_message}>{show.message}</div>
            <section>
              {show.DisputedSIA > 0 ? (
                <div className={s.modal_dispute_activity}>
                  <span className={s.dispute_count}>{show.DisputedSIA} </span>SIA disputes
                  <button onClick={viewSIAdisputes}>view</button>
                </div>
              ) : null}
              {show.DisputedCC > 0 ? (
                <div className={s.modal_dispute_activity}><span className={s.dispute_count}>{show.DisputedCC}</span>CC disputes
                  <button onClick={viewCCdisputes}>view</button>
                </div>
              ) : null}
            </section>


            <div className={s.modal_btn}>
              <button onClick={HideModal}>CLOSE</button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
