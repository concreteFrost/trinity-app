import s from "./SIA.module.scss"
import axios from "axios"
import { useSelector, useDispatch} from "react-redux"
import { GetSiaData } from "../../../redux/actions"
import { FaSearch } from "react-icons/fa"

export const SIA = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.userReducer.user.access_token)
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.get('https://testapi.etrinity.services/TrinityWebAPI/api/Activity/CheckMember/1019754813736776', {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then(res =>{ dispatch(GetSiaData(res.data))

        }).catch(e=>console.log(e))
    }

    return (<div className={s.container}>
        <form onSubmit={handleSubmit} >
            <div >
                <label htmlFor="sia">#SIA</label>
                <input type="text" name='sia' />
            </div>
            <button><FaSearch></FaSearch></button>
        </form>
    </div>
    );
}
