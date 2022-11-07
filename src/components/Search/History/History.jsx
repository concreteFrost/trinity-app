import s from "./History.module.scss"
import { HistoryForm } from "./HistoryForm/HistoryForm";
import { HistoryTable } from "./HistoryTable/HistoryTable";

export const History = () => (
    <div className={s.container}>
    <header><h2>Audit History</h2></header>
    <HistoryForm/>
   <HistoryTable/>
    </div>
);

