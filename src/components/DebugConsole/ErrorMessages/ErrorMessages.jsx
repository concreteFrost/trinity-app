import { useSelector } from "react-redux";
import s from "./ErrorMessages.module.scss"

function ErrorMessages() {
  const errorMessages = useSelector(
    (state) => state.debugConsoleReducer.errorMessages
  );
  console.log(errorMessages)
  return (
    <div>
      <ul>
        {errorMessages.length > 0
          ? errorMessages.map((obj) => {
            return (
              <li key={obj.id}>
                <div className={s.response_time}>{obj.response.responseTime}</div>
                <h5 className={s.response_desc}>{obj.message.toUpperCase()}</h5>
                <div className={s.request_container}>
                  <h5>REQUEST:</h5>
                  <p><span> endpoint: </span> {obj.request.url}</p>
                  {obj.request.data ? (
                    <div>
                      <p><span>data: </span>{obj.request.data}</p>

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

export default ErrorMessages;
