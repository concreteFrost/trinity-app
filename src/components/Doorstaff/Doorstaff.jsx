import s from "./Doorstaff.module.scss";
import { SignIn } from "./SignIn/SignIn";
import { DoorstaffTable } from "./DoorstaffTable/DoorstaffTable";
import { SIA } from "./SIA/SIA";
import { useState } from "react";

export const Doorstaff = () => {
  const [list, showList] = useState(true);
  return (
    <div className={s.container}>
      <header>
        <h1>DOORSTAFF MANAGEMENT</h1>
      </header>
      <button onClick={()=>showList(!list)}>{list ? 'hide sia' : 'show sia'}</button>
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
      ) : null}
      <main>
        <SIA></SIA>
        <SignIn></SignIn>
        <DoorstaffTable isVisible={true}></DoorstaffTable>
      </main>
    </div>
  );
};
