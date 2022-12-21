import s from "./Doorstaff.module.scss";
import { SignIn } from "./SignIn/SignIn";
import { Current} from "./Current/Current";
import { SIA } from "./SIA/SIA";
import { useState, useEffect } from "react";
import { GetDisputedActivity } from "../../redux/api/disputedApi";
import { useSelector,useDispatch } from "react-redux";
import { Recent } from "./Recent/Recent";
import { Disputed } from "../Shared/Disputed/Disputed";
import { SwitchView } from "../Shared/SwitchView/SwitchView";

export const Doorstaff = () => {


  const [view, setView] = useState('current');

  const token = useSelector((state) => state.userReducer.user.access_token);
  const dispatch = useDispatch();

    const disputedctivity = useSelector(s => s.doorstaffReducer.disputed)
    useEffect(()=>{
      dispatch(GetDisputedActivity(token,"S"))
  },[])


  function DefineView(target) {
    setView(target)
  }

  return (
    <div className={s.container}>
      <header>
        <h1>DOORSTAFF MANAGEMENT</h1>
        <SwitchView defineView={DefineView} currentView={view} countedActivity={disputedctivity.length}></SwitchView>
      </header>

      <main>

        {view === 'current' ? <>
        <SIA></SIA>
        <SignIn></SignIn>
        <Current isVisible={true}></Current>
        </> : null }
        {view === 'recent' ? <Recent isVisible={true}></Recent> : null }
        {view === 'disputed' ? <Disputed data={disputedctivity} system={"S"}></Disputed> : null }
      </main>
    </div>
  );
};
