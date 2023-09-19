import s from "./NoteElement.module.scss";
import { useDispatch } from "react-redux";

export const NoteElement = (props) => {
  const dispatch = useDispatch();
  function viewNote(paymentAuthId) {
    dispatch({
      type: "SHOW_MODAL_MESSAGE",
      data: paymentAuthId[paymentAuthId.length - 1].name,
    });
  }
  return (
    <div className={s.disputed_note}>
      <button
        onClick={() => {
          viewNote(props.row.original.disputedNotes);
        }}
      >
        NOTE
      </button>
    </div>
  );
};
