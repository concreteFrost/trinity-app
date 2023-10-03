import { ModalPrompt } from "../../Modal/ModalPrompt/ModalPrompt";
import { useDispatch, useSelector } from "react-redux";
import {
  SendDisputed,
  ApproveActivity,
} from "../../../services/areaManagerApi";
import { useEffect } from "react";
import * as AuthoriseActions from "../../../redux/actions/authoriseActions";
import { TableTemplate } from "../../Shared/TableTemplate/TableTemplate";
import { GetAuthoriseAndNotes } from "../../../services/utils/areaManagerUtils";
import * as ModalActions from "../../../redux/actions/modalActions";
import { GetBadResponse, GetResponse } from "../../../redux/actions/debugConsoleActions";

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
            dispatch(GetResponse('approve activity success', res,'authorise'))
            GetAuthoriseAndNotes(token, props.system, dispatch);
          })
          .catch((e) => { dispatch(GetBadResponse('approve activity error', e,'authorise')) });
    });
  }
  function SelectAll() {
    if (props.system === "S")
      dispatch(AuthoriseActions.CheckAllAuthoriseDoorstass());
    else dispatch(AuthoriseActions.CheckAllAuthoriseCosts());
  }

  function UnselectAll() {
    if (props.system === "S")
      dispatch(AuthoriseActions.UncheckAllAuthoriseDoorstaff());
    else dispatch(AuthoriseActions.UncheckAllAuthoriseCosts());
  }

  function DisputeActivity() {
    SendDisputed(props.system, token, toDispute).then((res) => {
      dispatch(GetResponse('send disputed activity success', res,'authorise'))
      ModalActions.ResetModalActivity();
      GetAuthoriseAndNotes(token, props.system, dispatch);
    }).catch((e) => {
      dispatch(GetBadResponse('send disputed activity error', e,'authorise'))
    });
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
