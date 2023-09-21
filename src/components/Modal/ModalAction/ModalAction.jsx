import s from "./ModalAction.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RecallActivity } from "../../../services/areaManagerApi";
import { SHOW_MODAL_MESSAGE } from "../../../redux/types";
import { GetAuthoriseAndNotes } from "../../../services/utils/areaManagerUtils";
import { CancelDoorstaffAPI } from "../../../services/activityApi";
import { RefreshDoorstaffList } from "../../../services/utils/activityUtils";
import { HideActionModal } from "../../../redux/actions";

export const ModalAction = () => {
  const modalActionReducer = useSelector((state) => state.modalActionReducer);
  const token = useSelector((state) => state.userReducer.user.access_token);

  function SetMsgBody() {
    let msg = "";
    switch (modalActionReducer.activityType) {
      case "CANCEL":
        msg = "Are you sure you want to cancel this shift?";
        break;
      case "RECALL":
        msg = "Are you sure you want to recall this shift?";
        break;
      case "DELETE":
        msg = "Are you sure you want to delete this shift?";
        break;
      default:
        msg = "Are you sure you want to cancel this shift?";
        break;
    }

    return msg;
  }

  const dispatch = useDispatch();

  function Cancel() {
    CancelDoorstaffAPI(modalActionReducer.activityToModify, token).then((res) => {
      console.log('cancel activity success', res)
      dispatch(HideActionModal());
      RefreshDoorstaffList(token, dispatch);
    })
  }
  function Recall() {
    RecallActivity(token, modalActionReducer.activityToModify)
      .then((res) => {
        if (!res.success) {
          dispatch({ type: SHOW_MODAL_MESSAGE, data: res.message });
        } else {
          console.log("recall activity success", res);
          GetAuthoriseAndNotes(token, "S", dispatch);
          GetAuthoriseAndNotes(token, "A", dispatch);
        }
      })
      .catch((e) => console.log("recall activity error", e));
  }

  function DefineActiveOperation() {
    switch (modalActionReducer.activityType) {
      case "CANCEL":
        return Cancel();
      case "RECALL":
        return Recall();
      default:
        return Cancel();
    }
  }

  function HideModal(e) {
    e.preventDefault();
    dispatch({ type: "HIDE_ACTION_MODAL" });
  }

  function Submit(e) {
    e.preventDefault();
    dispatch({ type: "HIDE_ACTION_MODAL" });
  }

  return (
    <>
      {modalActionReducer.isVisible === true ? (
        <div className={s.container}>
          <div className={s.modal_window}>
            <div className={s.modal_message}>{SetMsgBody()}</div>
            <div className={s.input_body}>
              <form onSubmit={Submit}>
                <div className={s.modal_btn}>
                  <button onClick={DefineActiveOperation}>SUBMIT</button>
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
