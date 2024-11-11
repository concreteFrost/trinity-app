import { useSelector } from "react-redux";
import s from "./ErrorMessages.module.scss";
import { SendIssueLog } from "../../../services/reportApi";
import { ShowModalMessage } from "../../../redux/actions/modalActions";
import { useDispatch } from "react-redux";
import { DeleteErrorMessage } from "../../../redux/actions/debugConsoleActions";

function ErrorMessages() {
  const errorMessages = useSelector(
    (state) => state.debugConsoleReducer.errorMessages
  );
  const currentComponent = useSelector(
    (state) => state.debugConsoleReducer.currentComponent
  );
  const user = useSelector((state) => state.userReducer.user);
  const dispatch = useDispatch();

  async function sendReport(message) {
    const messageContent = {
      componentName: message.component,
      message: message.message,
      request: {
        data: message.request.data,
        url: message.request.url,
      },
      response: {
        message: message.response.message,
        method: message.response.method,
        responseTime: message.response.responseTime,
        status: message.response.status,
      },
    };

    // Создание текстового файла
    const blob = new Blob([JSON.stringify(messageContent)], {
      type: "text/plain",
    });

    console.log(messageContent);
    const file = new File([blob], "report.txt", { type: "text/plain" });

    const formData = new FormData();
    formData.append("file", file); // Имя поля должно соответствовать ожиданиям на сервере

    try {
      const res = await SendIssueLog(user.access_token, formData);

      if (res.data.success) {
        dispatch(DeleteErrorMessage(message.id));
      }
    } catch (e) {
      let msg;

      if (e.response.data.message) {
        msg = e.response.data.message;
      } else {
        msg = "Something went wrong";
      }
      dispatch(ShowModalMessage(msg));
      console.error("Error sending report:", e);
    }
  }

  return (
    <div>
      <ul>
        {errorMessages.length > 0 ? (
          errorMessages
            .filter((x) => {
              return (
                x.component === currentComponent || currentComponent === "all"
              );
            })
            .map((obj) => {
              return (
                <li key={errorMessages.indexOf(obj)}>
                  <div className={s.response_time}>
                    {obj.response.responseTime}
                  </div>
                  <h5 className={s.response_desc}>
                    {obj.message.toUpperCase()}
                  </h5>
                  <div className={s.request_container}>
                    <h5>REQUEST:</h5>
                    <p>
                      <span> endpoint: </span> {obj.request.url}
                    </p>
                    {obj.request.data ? (
                      <div>
                        <p>
                          <span>data: </span>
                        </p>
                        {obj.request.data}
                      </div>
                    ) : (
                      <p>
                        <span>data: </span> <i>null</i>{" "}
                      </p>
                    )}
                  </div>
                  <div className={s.response_container}>
                    <h5>RESPONSE: </h5>
                    <p>
                      <span>status: </span> {obj.response.status}
                    </p>
                    <p>
                      <span>method: </span> {obj.response.method}
                    </p>
                    <p>
                      <span>message: </span>
                      {obj.response.message ? obj.response.message : "null"}
                    </p>
                  </div>
                  <div
                    className={s.report_container}
                    onClick={() => sendReport(obj)}
                  >
                    <button className={s.report_btn}>REPORT</button>
                  </div>
                </li>
              );
            })
        ) : (
          <li>
            <p>nothing to show</p>
          </li>
        )}
      </ul>
    </div>
  );
}

export default ErrorMessages;
