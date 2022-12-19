const initialState = {
    showModal: false,
    message: "",
    paymentActivityID : null,
    disputedNote: ""
};

export const modalPromptReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SHOW_MODAL_PROMPT":
            return {
                ...state, showModal: true, message: action.data
            }
        case "HIDE_MODAL_PROMPT": {
            return { ...state, showModal: false, message: '' }
        }
        case "SET_DISPUTED_PAYMENT_ID":
            return{
                ...state, paymentActivityID : action.data
            }
        case "SET_DISPUTED_NOTE":
            return{
                ...state, disputedNote: action.data
            }
            case "RESET_MODAL_ACTIVITY":
                return{
                   initialState
                }
        default:
            return state;
    }
};
