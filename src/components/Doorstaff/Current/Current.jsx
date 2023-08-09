import s from "./Current.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { GetDoorstaff } from "../../../redux/api/doorstaffAPI";
import { useEffect, useState } from "react";
import { CurrentFooter } from "./CurrentFooter/CurrentFooter";
import { CurrentModal } from "./CurrentModal/CurrentModal";
import { CurrentTable } from "./CurrentTable/CurrentTable";
import { isVisible } from "@testing-library/user-event/dist/utils";


export const Current = (props) => {

  const dispatch = useDispatch();

  const token = useSelector((state) => state.userReducer.user);
  const doorstaff = useSelector(
    (state) => state.doorstaffReducer.current
  );

  const [isSignOffModalVisible, setIsSignOffModalVisible] = useState(false);

  const errorMessage = useSelector((state => state.doorstaffReducer.errorMessage))

  useEffect(() => {
    dispatch(GetDoorstaff(token.access_token));
  }, []);

  function ShowSignOffSelectedModal() {
    setIsSignOffModalVisible(doorstaff.some(x => x.isChecked))
  }

  return (
    <div className={s.container}>
      {errorMessage.length > 0 && !isSignOffModalVisible ? <div className={s.error}>{errorMessage}</div> : null}
      <div className={s.wrapper}>
      <CurrentTable doorstaff={doorstaff} isVisible={isVisible} token={token}></CurrentTable>
      </div>
      {props.isVisible && doorstaff.length > 0 ?
        <CurrentFooter ShowSignOffSelectedModal={ShowSignOffSelectedModal}></CurrentFooter>
        : null}

      {props.isVisible && isSignOffModalVisible ? <CurrentModal doorstaff={doorstaff} token={token} setIsSignOffModalVisible={setIsSignOffModalVisible} errorMessage={errorMessage}></CurrentModal> : null}
    </div>
  );
};
