import s from "./SIA.module.scss"
import { useSelector, useDispatch} from "react-redux"
import { FaSearch } from "react-icons/fa"
import { GetSIAdataAPI } from "../../../redux/api/siaAPI"



export const SIA = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.userReducer.user.access_token)
    const sia = useSelector((state)=> state.siaReducer.siaNumber)

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(GetSIAdataAPI(token,sia))

    }
    return (<div className={s.container}>
        <form onSubmit={handleSubmit} >
            <div >
                <label htmlFor="sia">#SIA</label>
                <input type="text" name='sia' value={sia || ''} onChange={(e)=>{dispatch({type:"SET_SIA_NUMBER", data : e.target.value})}} />
            </div>
            <button><FaSearch></FaSearch></button>
        </form>
    </div>
    );
}
