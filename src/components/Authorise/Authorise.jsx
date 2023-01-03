import s from "./Authorise.module.scss"
import { ApproveTable } from "./ApproveTable/ApproveTable";
import { SwitchView } from "../Shared/SwitchView/SwitchView";
import { useState } from "react";
import { useSelector } from "react-redux";


export const Authorise = () => {

    const [view, setView] = useState('doorstaff');

    function DefineView(target) {
        setView(target)
    }

    const doorstaff = useSelector(state => state.authoriseReducer.doorstaff);
    console.log(doorstaff)
    const costs = useSelector(state => state.authoriseReducer.costs);

    const doorstaffActions = [
        "CHECK_AUTHORISE_DOORSTAFF",
        "CHECK_ALL_AUTHORISE_DOORSTAFF",
        "UNCHECK_AUTHORISE_DOORSTAFF",
        "UNCHECK_ALL_AUTHORISE_DOORSTAFF"
    ]

    const costActions = [
        "CHECK_AUTHORISE_COSTS",
        "CHECK_ALL_AUTHORISE_COSTS",
        "UNCHECK_AUTHORISE_COSTS",
        "UNCHECK_ALL_AUTHORISE_COSTS"
    ]

    const doorstaffHeaders = [
        'START', 'FINISH','PUB', 'SUPPLIER', 'NAME', 'POSITION', 'COST', 'NOTES', 'SELECT'
    ]

    const costHeaders = [
        'START',
        'FINISH',
        'PUB',
        'SUPPLIER',
        'ANALYSIS',
        'POSITION',
        'COST',
        'NOTES',
        'SELECT']

    return (<div className={s.container}>
        <header><h1>AUTHORISE</h1>
        <SwitchView defineView={DefineView} inputs={['doorstaff','costs']} currentView={view} ></SwitchView>
        </header>
        <main>
            {view === "doorstaff" ? <ApproveTable data={doorstaff} system={"S"} actions={doorstaffActions} tableHeaders={doorstaffHeaders} /> : null}
            {view === "costs" ? <ApproveTable data={costs} system={"A"} actions={costActions} tableHeaders={costHeaders} /> : null }   
        </main>
    </div>)
}

