import s from "./CostsForm.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { GetCosts } from "../../../redux/api/costAPI";


export const CostsForm = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.userReducer.user.access_token);

    function SubmitForm(e){
        e.preventDefault();
        const date = e.target[0].value
        dispatch(GetCosts(token,date,'D'))
        dispatch(GetCosts(token,date,'W'))
        dispatch(GetCosts(token,date,'M'))
    }
    return (
        <div className={s.container}>
            <form onSubmit={SubmitForm}>
                <label htmlFor="">PERIOD</label>
                <input type="date" name="search-date" id="search-date" />
                <button>VIEW</button>
            </form>
        </div>)
}

