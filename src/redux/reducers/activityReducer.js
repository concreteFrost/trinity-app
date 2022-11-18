const initialState = {
    setOpt:{
        activityTypeOpt:[],
        supplierOpt:[],
       
    },

    activityType: null,
    supplier:null,

    date: new Date().toLocaleDateString('en-CA'),
    time: null

    
  };
  
  export const activityReducer = (state = initialState, action) => {
    console.log('state of activity', state.setOpt)
    switch (action.type) {
      case "SET_ACTIVITY_TYPE_OPT":
        return{
            ...state, setOpt: {...state.setOpt, activityTypeOpt : action.data}
        }
        case "SET_SUPPLIER_OPT":
        return{
            ...state, setOpt: {...state.setOpt, supplierOpt : action.data}
        }
        case "SET_ACTIVITY":
            return{
                ...state, activityType : action.data
            }
            case "SET_SUPPLIER":
                return{
                    ...state, supplier : action.data
                }
      default:
        return state;
    }
  };
  