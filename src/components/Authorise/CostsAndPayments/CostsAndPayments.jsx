import { ModalPrompt } from "../../Modal/ModalPrompt/ModalPrompt";
import { useDispatch, useSelector } from "react-redux";
import { GetAuthorise, ApproveActivity } from "../../../redux/api/authoriseApi";
import { SendDisputed } from "../../../redux/api/disputedApi";
import { useEffect } from "react";
import {
  CHECK_ALL_AUTHORISE_DOORSTAFF,
  CHECK_ALL_AUTHORISE_COSTS,
  UNCHECK_ALL_AUTHORISE_DOORSTAFF,
  UNCHECK_ALL_AUTHORISE_COSTS,
} from "../../../redux/types";
import { TableTemplate } from "../../Shared/TableTemplate/TableTemplate";


export const CostsAndPayments = (props) => {
  const toDispute = useSelector((state) => state.modalPromptReducer);
  const token = useSelector((state) => state.userReducer.user.access_token);
  const userReducer = useSelector(state => state.userReducer.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAuthorise(props.system, token));
  }, []);

  function Approve() {
    props.data.forEach((element) => {
      if (element.selected)
        dispatch(ApproveActivity(props.system, token, element));
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
    dispatch(SendDisputed(props.system, token, toDispute));
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
        {userReducer.userRole === "2" ? <ul>
          <li>
            <button onClick={UnselectAll}>NONE</button>
          </li>
          <li>
            <button onClick={SelectAll}>SELECT ALL</button>
          </li>

          <li>
            <button onClick={Approve}>APPROVE</button>{" "}
          </li>
        </ul> : null}

      </div>
    </div>
  );
};
