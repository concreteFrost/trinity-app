import s from "./ModalCancel.module.scss";
import { useSelector, useDispatch } from "react-redux";
import {
  CancelDoorstaff,
  GetDoorstaffList,
} from "../../../services/activityApi";
import { HideActionModal } from "../../../redux/actions/modalActions";
import { GetResponse } from "../../../redux/actions/debugConsoleActions";

export const ModalCancel = (props) => {
  const modalCancelReducer = useSelector((state) => state.modalCancelReducer);
  const token = useSelector((state) => state.userReducer.user.access_token);

  const dispatch = useDispatch();

  function Cancel(e) {
    e.preventDefault();
    CancelDoorstaff(modalCancelReducer.activityToModify, token).then((res) => {
      dispatch(GetResponse('cancel activity success', res))
      GetDoorstaffList(token).then((res) => { });
    });
  }

  function HideModal(e) {
    e.preventDefault();
    dispatch(HideActionModal())
  }

  function Submit(e) {
    e.preventDefault();
  }

  return (
    <>
      {modalCancelReducer.isVisible === true ? (
        <div className={s.container}>
          <div className={s.modal_window}>
            <div className={s.modal_message}>
              Are you sure you want to cancel this shift?
            </div>
            <div className={s.input_body}>
              <form onSubmit={Submit}>
                <div className={s.modal_btn}>
                  <button
                    onClick={
                      modalCancelReducer.activityType === "CANCEL"
                        ? Cancel
                        : null
                    }
                  >
                    SUBMIT
                  </button>
                  <button onClick={HideModal}>CLOSE</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};
