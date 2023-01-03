import s from "./Activity.module.scss";
import { AddActivity } from "./Current/AddActivity/AddActivity";
import { ActivityTable } from "./Current/ActivityTable/ActivityTable";
import { SwitchView } from "../Shared/SwitchView/SwitchView";
import { useState } from "react";
import { Recent } from "./Recent/Recent";
import { Disputed } from "../Shared/Disputed/Disputed";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetDisputedActivity } from "../../redux/api/disputedApi";



export const Activity = () => {
    const [view, setView] = useState('current');
    
  const token = useSelector((state) => state.userReducer.user.access_token);
  const dispatch = useDispatch();

    const disputedctivity = useSelector(s => s.getActivityReducer.disputed)
    useEffect(()=>{
      dispatch(GetDisputedActivity(token,"A"))
  },[])

    function DefineView(target) {
      setView(target)
    }
  return (
    <div className={s.container}>
      <header>
        <h1>ACTIVITY</h1>
        <SwitchView defineView={DefineView} inputs={['current','recent','disputed']} currentView={view} countedActivity={disputedctivity.length}></SwitchView>
      </header>
      <main>
        {view ==='current'? <><AddActivity></AddActivity>
        <ActivityTable isVisible={true}></ActivityTable></> : null}
        {view ==='recent'?<><Recent></Recent></> : null}
        {view ==='disputed'?<><Disputed data={disputedctivity} system={"A"}></Disputed></> : null}
      </main>
    </div>
  );
};
