import { useSelector } from "react-redux";

function SuccessMessages() {
  const successMessages = useSelector(
    (state) => state.debugConsoleReducer.successMessages
  );
  return (
    <div>
      <ul>
        {successMessages.length > 0
          ? successMessages.map((message) => {
              return (
                <li key={message.id}>
                  <i>{message.time}</i>
                  <p>{message.message}</p>
                </li>
              );
            })
          : <li><p>nothing to show</p></li>}
      </ul>
    </div>
  );
}

export default SuccessMessages;
