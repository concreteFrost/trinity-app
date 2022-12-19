import s from "./Doorstaff.module.scss";
import { SignIn } from "./SignIn/SignIn";
import { Current} from "./Current/Current";
import { SIA } from "./SIA/SIA";
import { useState } from "react";
import { SwitchView } from "./SwitchView/SwitchView";
import { Recent } from "./Recent/Recent";
import { Disputed } from "./Disputed/Disputed";

export const Doorstaff = () => {


  const [view, setView] = useState('current');

  function DefineView(target) {
    setView(target)
  }

  return (
    <div className={s.container}>
      <header>
        <h1>DOORSTAFF MANAGEMENT</h1>
        <SwitchView defineView={DefineView} currentView={view}></SwitchView>
      </header>

      <main>

        {view === 'current' ? <>
        <SIA></SIA>
        <SignIn></SignIn>
        <Current isVisible={true}></Current>
        </> : null }
        {view === 'recent' ? <Recent isVisible={true}></Recent> : null }
        {view === 'disputed' ? <Disputed isVisible={true}></Disputed> : null }
        
      </main>
    </div>
  );
};
