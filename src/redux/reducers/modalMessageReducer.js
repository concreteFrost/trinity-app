const initialState = {
    showModal: false,
    message: ""
};

export const modalMessageReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SHOW_MODAL_MESSAGE":
            return {
                ...state, showModal: true, message: action.data
            }
        case "HIDE_MODAL_MESSAGE": {
            return { ...state, showModal: false, message: '' }
        }
        default:
            return state;
    }
};
