import s from "./ModalPrompt.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { SET_DISPUTED_NOTE } from "../../../redux/types/authoriseTypes";
import { ResetModalActivity } from "../../../redux/actions/modalActions";

export const ModalPrompt = (props) => {
  const show = useSelector((state) => state.modalPromptReducer);
  const disputedNote = useSelector(
    (state) => state.modalPromptReducer.disputedNote
  );
  const dispatch = useDispatch();

  function HideModal(e) {
    e.preventDefault();
    dispatch(ResetModalActivity());
  }

  function Submit(e) {
    e.preventDefault();
  }

  return (
    <>
      {show.showModal === true ? (
        <div className={s.container}>
          <div className={s.modal_window}>
            <div className={s.modal_header}>Please enter the note</div>
            <div className={s.modal_message}>{show.message}</div>

            <div className={s.input_body}>
              <form onSubmit={Submit}>
                <textarea
                  onChange={(e) =>
                    dispatch({
                      type: SET_DISPUTED_NOTE,
                      data: e.target.value,
                    })
                  }
                  value={disputedNote}
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                ></textarea>
                <div className={s.modal_btn}>
                  <button onClick={props.submitForm}>SUBMIT</button>
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
