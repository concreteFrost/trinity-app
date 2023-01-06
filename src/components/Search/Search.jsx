import s from "./Search.module.scss"
import { History } from "./History/History";
import { Activities } from "./Activities/Activities";
import { useState } from "react";
import { SwitchView } from "../Shared/SwitchView/SwitchView";

export const Search = () => {

    const [view, setView] = useState('activities');

    function DefineView(target) {
        setView(target)
    }

    return (

        <div className={s.container}>
            <header><h1>SEARCH</h1>
            {/* <SwitchView defineView={DefineView} inputs={['history','activities']} currentView={view} ></SwitchView> */}
            </header>

            <main>
                {/* {view === "history" ? <History></History> : null} */}
                {view === "activities" ? <Activities></Activities> : null}
            </main>
        </div>
    );

}

