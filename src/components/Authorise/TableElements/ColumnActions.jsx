import s from "./ColumnActions.module.scss"
import { useDispatch, useSelector } from "react-redux";
export const ColumnActions = (props) => {

    const dispatch = useDispatch();
    const token = useSelector((state) => state.userReducer.user.access_token);
    const userRole = useSelector((state) => state.userReducer.user.userRole);

    function handleCheck(e, actions, id) {
        dispatch({
            type: actions,
            data: { id: parseInt(id), selected: e.target.checked },
        });
    }

    function toggleMoreActions(e) {
        let path = window.location.href;
        path.endsWith('doorstaff') ? dispatch({ type: "TOGGLE_MORE_ACTIONS_FOR_DOORSTAFF", data: e })
            : dispatch({ type: "TOGGLE_MORE_ACTIONS_FOR_COSTS", data: e })
    }

    function showRecallModal(activityId) {
        dispatch({ type: "SHOW_ACTION_MODAL", activityToModify: activityId, activityType: "RECALL" })
    }

    function showDeleteModal(activityId) {
        dispatch({ type: "SHOW_ACTION_MODAL", activityToModify: activityId, activityType: "DELETE" })
    }

    function showRecallIfno() {
        dispatch({ type: "SHOW_MODAL_MESSAGE", data: 'Resets the sign-off time and returns this activity back to the Pub Manager to enter a new sign off time' })
    }

    return (<div className={s.actions_wrapper}>
        <div className={s.actions}>
            <input
                type="checkbox"
                name={props.row.original.activityId}
                id={props.row.original.activityId}
                onChange={(e) => {
                    handleCheck(e, props.checkMethod, props.row.original.activityId);
                }}
                checked={props.row.original.selected}
            />

            <button
                onClick={() => {
                    dispatch({ type: "SHOW_MODAL_PROMPT" });
                    dispatch({
                        type: "SET_DISPUTED_PAYMENT_ID",
                        data: props.row.original.activityId,
                    });
                }}
            >
                DISPUTE
            </button>
            <button onClick={() => toggleMoreActions(props.row.original.activityId)}>MORE</button>
        </div>
        {props.row.original.moreActionsVisible ? <div className={s.additional_actions}>
            <div className={s.additional_action_item}>

                <button className={s.recall} onClick={() => showRecallModal(props.row.original.activityId)}>RESET</button>
                <button className={s.question} onClick={showRecallIfno}>?</button>
            </div>
            {/* {userRole === '1' ? <div className={s.additional_action_item}>
                <button className={s.delete} onClick={() => showDeleteModal(props.row.original.activityId)}>DELETE</button>
                <button className={s.question}>?</button>
            </div> : null} */}
        </div> : null}
    </div>)
}