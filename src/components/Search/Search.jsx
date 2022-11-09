import s from "./Search.module.scss"
import { History } from "./History/History";
import { Activities } from "./Activities/Activities";
import { useState } from "react";
import { SwitchView } from "./SwitchView/SwitchView";

export const Search = () => {

    const [view, setView] = useState('history');

    function DefineView(target) {
        setView(target)
    }

    return (

        <div className={s.container}>
            <header><h1>SEARCH</h1>
                <SwitchView defineView={DefineView} currentView={view}></SwitchView>
            </header>

            <main>
                {view === "history" ? <History></History> : null}
                {view === "activities" ? <Activities></Activities> : null}
            </main>
        </div>
    );

}

