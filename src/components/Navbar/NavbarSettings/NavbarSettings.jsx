import { useDispatch, useSelector } from "react-redux";
import s from "./NavbarSettings.module.scss";
import { ToggleDebugConsole } from "../../../redux/actions/debugConsoleActions";

function NavbarSettings(props){
    const isDebigConsoleVisible = useSelector((state)=> state.debugConsoleReducer.isConsoleVisible);
    const dispatch = useDispatch()

    function SetDebugConsoleVisible(){
        dispatch(ToggleDebugConsole())
    }

return(<div className={s.container}>
    <div className={s.settings_item}>
    <label>show debug console</label>
    <input type="checkbox" checked={isDebigConsoleVisible} onChange={SetDebugConsoleVisible}/>
    </div>
  
</div>)
}

export default NavbarSettings;