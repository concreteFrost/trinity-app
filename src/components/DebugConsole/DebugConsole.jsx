import s from "./DebugConsole.module.scss";
import { useState } from "react";
import SuccessMessages from "./SuccessMessages/SuccessMessages";
import {
  ClearAllMessages,
  ClearSuccessMessages,
  ClearErrorMessages,
} from "../../redux/actions/debugConsoleActions";
import { useDispatch } from "react-redux";

function DebugConsole() {
  const [currentView, setCurrentView] = useState("success");
  const [isExpanded,setIsExpanded] = useState(true)
  const dispatch = useDispatch();

  const containerClasses = `${s.container} ${ isExpanded ? [s.expanded] : [s.closed]}`
  const subContainerClasses = `${s.sub_container} ${ isExpanded ? [s.expanded] : [s.closed]}`

  return (
    <div className={s.wrapper}>
      <div className={containerClasses}>
        <div className={s.console_btn}>
          <button onClick={()=>{setIsExpanded(!isExpanded)}}>CONSOLE</button>
        </div>
        <div className={subContainerClasses}>
          <div className={s.header_btns_container}>
            <button onClick={() => setCurrentView("success")}>LOGS</button>
            <button onClick={() => setCurrentView("errors")}>ERRORS</button>
          </div>
          {currentView === "success" ? (
            <SuccessMessages></SuccessMessages>
          ) : null}
          <div className={s.footer_btns_container}>
            {currentView === "success" ? (
              <button onClick={() => dispatch(ClearSuccessMessages())}>
                CLEAR
              </button>
            ) : (
              <button onClick={() => dispatch(ClearErrorMessages())}>
                CLEAR
              </button>
            )}
            <button onClick={() => dispatch(ClearAllMessages())}>
              CLEAR ALL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DebugConsole;
