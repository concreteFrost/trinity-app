import  * as ActivityTypes  from '../types/activityTypes'

const initialState = {
    current:[],
    recent:[],
    disputed:[]
}

export const getActivityReducer = (state= initialState, action)=>{
    switch(action.type){
        case ActivityTypes.GET_CURRENT_ACTIVITY:{
            return{
              ...state,
              current: action.data
            }
          }
          case ActivityTypes.GET_RECENT_ACTIVITY:{
            return{
              ...state,
              recent: action.data
            }
          }
          case ActivityTypes.GET_DISPUTED_ACTIVITY:{
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