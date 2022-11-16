const initialState = {
    doorstaff: []
};



export const doorstaffOnSiteReducer = (state = initialState, action) => {

    switch (action.type) {
        case "SET_DOORSTAFF":
            return {
                ...state,    
                doorstaff : action.data       
            };
        case "DELETE_DOORSTAFF":
            return {
                ...state,
                doorstaff: {},
            };
        default:
            return state;
    }
};
