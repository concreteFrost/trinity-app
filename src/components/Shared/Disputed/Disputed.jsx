import s from "./Disputed.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { TableTemplate } from "../TableTemplate/TableTemplate";
import { ModalPrompt } from "../../Modal/ModalPrompt/ModalPrompt";
import { GetDisputedActivityAPI, SendBackDisputedAPI, ViewDisputedNoteAPI } from "../../../services/disputedApi";
import { ResetModalActivity,GetDisputedDoorstaff, ShowModalMessage, ShowModalPrompt, SetDisputedPaymentID } from "../../../redux/actions.js"
import * as ActivityActions from "../../../redux/actions/activityActions"
import * as DoorstaffActions from "../../../redux/actions/doorstaffActions"

export const Disputed = (props) => {

  const tableHeader = [
    {
      Header: "NAME",
      accessor: "staffName",

    },
    {
      Header: "LOCATION",
      accessor: 'locationName'
    },
    {
      Header: "SUPPLIER",
      accessor: "supplierName"
    },
    {
      Header: "STATUS",
      accessor: "status"
    },
    {
      Header: "ACTIONS",
      accessor: "activityId",
      style: {
        color: 'red'
      },
      Cell: ({ value }) => (
        <div className={s.actions}>
          <div><button value={value} onClick={() => { viewNote(value) }}>NOTE</button> </div>
          <div><button className={s.dispute_btn} onClick={() => { showDisputeModal(value) }}>RETURN</button> </div>
        </div>

      )
    },

  ]

  const token = useSelector((state) => state.userReducer.user.access_token);
  const currentDisputed = useSelector(state => state.modalPromptReducer);
  const dispatch = useDispatch();

  function showDisputeModal(id) {
    dispatch(ShowModalPrompt());
    dispatch(SetDisputedPaymentID(id));

  }

  function viewNote(e) {
    ViewDisputedNoteAPI(token, props.system, e).then((res) => {
      dispatch(ShowModalMessage(res.data.record[res.data.record.length - 1].name))
    })
  }

  async function DisputeBack() {

    await SendBackDisputedAPI(token, currentDisputed, props.system).then(() => {
      dispatch(ResetModalActivity())
    })

    await GetDisputedActivityAPI(token, props.system).then((res) => {
      switch (props.system) {
        case "A":
          dispatch(ActivityActions.GetDisputedActivity(res.data.reportRecord))
          break;
        case "S":
          dispatch(DoorstaffActions.GetDisputedDoorstaff(res.data.reportRecord))
          break;
      }

    })
  }
  return (
    <>
      <ModalPrompt submitForm={DisputeBack}></ModalPrompt>
      <div className={s.container}>
        <TableTemplate columns={tableHeader} data={props.data} ></TableTemplate>
      </div>
    </>
  );
};
