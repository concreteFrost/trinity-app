import s from "./Activity.module.scss";
import { AddActivity } from "./Current/AddActivity/AddActivity";
import { ActivityTable } from "./Current/ActivityTable/ActivityTable";
import { SwitchView } from "./SwitchView/SwitchView";
import { useState } from "react";
import { Recent } from "./Recent/Recent";


export const Activity = () => {
    const [view, setView] = useState('current');

    function DefineView(target) {
      setView(target)
    }
  return (
    <div className={s.container}>
      <header>
        <h1>ACTIVITY</h1>
        <SwitchView defineView={DefineView} currentView={view}></SwitchView>
      </header>
      <main>
        {view ==='current'? <><AddActivity></AddActivity>
        <ActivityTable isVisible={true}></ActivityTable></> : null}
        {view ==='recent'?<><Recent></Recent></> : null}
      </main>
    </div>
  );
};
