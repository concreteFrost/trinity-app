import s from "./SIA.module.scss"
import { useSelector, useDispatch } from "react-redux"
import { FaSearch } from "react-icons/fa"
import { GetSIAdataAPI } from "../../../redux/api/siaAPI"
import { useState } from "react"
import { TailSpin } from "react-loader-spinner";


export const SIA = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.userReducer.user.access_token)
    const sia = useSelector((state) => state.siaReducer.siaNumber)
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        await dispatch(GetSIAdataAPI(token, sia))
        await setIsLoading(false)

    }
    return (<div className={s.container}>
        <form onSubmit={handleSubmit} >
            <div >
                <label htmlFor="sia">#SIA</label>
                <input type="text" name='sia' value={sia || ''} onChange={(e) => { dispatch({ type: "SET_SIA_NUMBER", data: e.target.value }) }} />
            </div>
            <button><FaSearch></FaSearch></button>
        </form>
        {isLoading === true ? (
        <div className="tail_spin_container">
          <div className="tail_spin">
            <TailSpin width={150} height={150} color={"#42aaf5"}></TailSpin>
          </div>{" "}
        </div>
      ) : null}
    </div>
    );
}
