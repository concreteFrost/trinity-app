import moment from 'moment'

const initialState = {
    setOpt:{
        activityTypeOpt:[],
        supplierOpt:[],
       
    },

    activityType: null,
    supplier:null,

    date: new Date().toISOString(),
    time: null

    
  };
  
  export const activityReducer = (state = initialState, action) => {
   
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
  