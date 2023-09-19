import { ModalPrompt } from "../../Modal/ModalPrompt/ModalPrompt";
import { useDispatch, useSelector } from "react-redux";
import { SendDisputed, ApproveActivity } from "../../../services/areaManagerApi";
import { useEffect } from "react";
import {
  CHECK_ALL_AUTHORISE_DOORSTAFF,
  CHECK_ALL_AUTHORISE_COSTS,
  UNCHECK_ALL_AUTHORISE_DOORSTAFF,
  UNCHECK_ALL_AUTHORISE_COSTS,
  RESET_MODAL_ACTIVITY,
} from "../../../redux/types";
import { TableTemplate } from "../../Shared/TableTemplate/TableTemplate";
import { GetAuthoriseAndNotes } from "../../../services/utils/areaManagerUtils";

export const CostsAndPayments = (props) => {
  const toDispute = useSelector((state) => state.modalPromptReducer);
  const token = useSelector((state) => state.userReducer.user.access_token);
  const userReducer = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    GetAuthoriseAndNotes(token, props.system, dispatch);
  }, [window.location.href]);

  function Approve() {
    props.data.forEach((element) => {
      if (element.selected)
        ApproveActivity(token, props.system, element)
          .then((res) => {
            console.log("activity approve success", res);
            GetAuthoriseAndNotes(token, props.system, dispatch)
          })
          .catch((e) => {
            console.log("activity approve error", e);
          });
    });
  }
  function SelectAll() {
    if (props.system === "S") dispatch({ type: CHECK_ALL_AUTHORISE_DOORSTAFF });
    else dispatch({ type: CHECK_ALL_AUTHORISE_COSTS });
  }

  function UnselectAll() {
    if (props.system === "S")
      dispatch({ type: UNCHECK_ALL_AUTHORISE_DOORSTAFF });
    else dispatch({ type: UNCHECK_ALL_AUTHORISE_COSTS });
  }

  function DisputeActivity() {
    SendDisputed(props.system, token, toDispute)
      .then((res) => {
        console.log("dispute activity success", res);
        dispatch({ type: RESET_MODAL_ACTIVITY });
        GetAuthoriseAndNotes(token, props.system, dispatch)
      })
      .catch((e) => console.log("dispute activity error", e));
  }

  return (
    <div className={props.container}>
      <ModalPrompt submitForm={DisputeActivity}></ModalPrompt>
      <header>
        <h2>{props.title}</h2>
      </header>
      <TableTemplate
        columns={props.tableHeaders}
        data={props.data}
        hiddenColumn={props.tableToHide}
      ></TableTemplate>

      <div>
        {userReducer.userRole === "2" || userReducer.userRole === "1" ? (
          <ul>
            <li>
              <button onClick={UnselectAll}>NONE</button>
            </li>
            <li>
              <button onClick={SelectAll}>SELECT ALL</button>
            </li>

            <li>
              <button onClick={Approve}>APPROVE</button>{" "}
            </li>
          </ul>
        ) : null}
      </div>
    </div>
  );
};
