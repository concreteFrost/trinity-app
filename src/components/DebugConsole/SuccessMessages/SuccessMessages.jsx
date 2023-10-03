import { useSelector } from "react-redux";
import s from "./SuccessMessages.module.scss"

function SuccessMessages() {
  const successMessages = useSelector(
    (state) => state.debugConsoleReducer.successMessages
  );
  const currentComponent = useSelector( (state) => state.debugConsoleReducer.currentComponent)
 
  return (
    <div>
      <ul>
        {successMessages.length > 0
          ? successMessages.filter((x)=>{return x.component === currentComponent || currentComponent === 'all'}).map((obj) => {
            return (
              <li key={obj.id}>
                <div className={s.response_time}>{obj.response.responseTime}</div>
                <h5 className={s.response_desc}>{obj.message.toUpperCase()}</h5>
                <div className={s.request_container}>
                  <h5>REQUEST:</h5>
                  <p><span> endpoint: </span> {obj.request.url}</p>
                  {obj.request.data ? (
                    <div>
                      <p><span>data: </span></p>
                      {Object.entries(obj.request.data).map(([key, val]) => (
                        <p key={key}>
                          <i>{key}</i> : {val}
                        </p>
                      ))}
                    </div>
                  ) : <p><span>data: </span> <i>null</i> </p>}
                </div>
                <div className={s.response_container}>
                  <h5>RESPONSE: </h5>
                  <p><span>status: </span> {obj.response.status}</p>
                  <p><span>method: </span> {obj.response.method}</p>
                  <p><span>message: </span>{obj.response.message ? obj.response.message : 'null'}</p>
                </div>
              </li>
            );
          })
          : <li><p>nothing to show</p></li>}
      </ul>
    </div>
  );
}

export default SuccessMessages;
