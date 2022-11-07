import s from "./Activities.module.scss"
import { ActivitiesForm } from "./ActivitiesForm/ActivitiesForm";
import { ActivitiesTable } from "./ActivitiesTable/ActivitiesTable";

export const Activities = () => (
    <div className={s.container}>
        <header><h2>Activities</h2></header>
            <ActivitiesForm></ActivitiesForm>
            <ActivitiesTable></ActivitiesTable>
    </div>
);

