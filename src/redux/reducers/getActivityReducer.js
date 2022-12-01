import  {GET_CURRENT_ACTIVITY,GET_RECENT_ACTIVITY,GET_DISPUTED_ACTIVITY} from '../types'

const initialState = {
    current:[],
    recent:[],
    disputed:[]
}

export const getActivityReducer = (state= initialState, action)=>{
    switch(action.type){
        case GET_CURRENT_ACTIVITY:{
            return{
              ...state,
              current: action.data
            }
          }
          case GET_RECENT_ACTIVITY:{
            return{
              ...state,
              recent: action.data
            }
          }
          case GET_DISPUTED_ACTIVITY:{
            return{
              ...state,
              disputed: action.data
            }
          }
        default: {
            return state
        }
    }
}