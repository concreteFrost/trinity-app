import s from "./Activity.module.scss"
import { AddActivity } from "./AddActivity/AddActivity";
import { ActivityTable } from "./ActivityTable/ActivityTable";


export const Activity = () => (
    <div className={s.container}>
        <header><h1>ACTIVITY</h1></header>
        <main>
        <AddActivity></AddActivity>
        <ActivityTable isVisible={true}></ActivityTable>
        </main>
    </div>
);

