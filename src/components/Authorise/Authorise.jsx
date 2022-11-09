import s from "./Authorise.module.scss"
import { ApproveCosts } from "./ApproveCosts/ApproveCosts";
import { ApproveDoorstaff } from "./ApproveDoorstaff/ApproveDoorstaff";
import { SwitchView } from "./SwitchView/SwitchView";
import { useState } from "react";

export const Authorise = ()=>{

    const[view,setView] = useState('doorstaff');

    function DefineView(target){
       setView(target)
    }

    return (<div className={s.container}>
        <header><h1>AUTHORISE</h1>
            <SwitchView defineView={DefineView} currentView={view}></SwitchView>
        </header>
        <main>
         {view === "doorstaff" ?  <ApproveDoorstaff /> : null }  
         {view === "costs" ?  <ApproveCosts /> : null }     
        </main>
    </div>)
}

