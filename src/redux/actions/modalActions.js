import * as ModalTypes from "../types/modalTypes"

export function ShowModalMessage(message) {
    return { type: ModalTypes.SHOW_MODAL_MESSAGE, data: message };
  }
  
  export function ShowCancelModal(activityIdToCancel) {
    return {
      type: ModalTypes.SHOW_ACTION_MODAL,
      activityToModify: activityIdToCancel,
      activityType: "CANCEL",
    };
  }

  export function ShowModalPrompt() {
    return { type: ModalTypes.SHOW_MODAL_PROMPT }
  }
  
  export function HideActionModal() {
    return { type: ModalTypes.HIDE_ACTION_MODAL }
  }

  export function HideModalMessage(){
    return {type: ModalTypes.HIDE_MODAL_MESSAGE}
  }
  
  export function ResetModalActivity() {
    return { type: ModalTypes.RESET_MODAL_ACTIVITY }
  }