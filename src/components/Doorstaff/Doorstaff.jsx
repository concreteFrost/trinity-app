import s from "./Doorstaff.module.scss";
import { SignIn } from "./SignIn/SignIn";
import { Current} from "./Current/Current";
import { SIA } from "./SIA/SIA";
import { useState } from "react";
import { SwitchView } from "./SwitchView/SwitchView";
import { Recent } from "./Recent/Recent";

export const Doorstaff = () => {
  const [list, showList] = useState(true);

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
      {/* <button onClick={() => showList(!list)}>{list ? 'hide sia' : 'show sia'}</button>
      {list ? (
        <div>
          <ul>
            <li>1018248700079102</li>
            <li>1011954658948319</li>
            <li>1014172466223788</li>
            <li>1015590288854388</li>
            <li>1011611024824106</li>
          </ul>
        </div>
      ) : null} */}
      <main>

        {view === 'current' ? <>
        <SIA></SIA>
        <SignIn></SignIn>
        <Current isVisible={true}></Current>
        </> : null }
        {view === 'recent' ? <Recent isVisible={true}></Recent> : null }
        {view === 'disputed' ? <Current isVisible={true}></Current> : null }
        
      </main>
    </div>
  );
};
