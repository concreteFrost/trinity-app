import s from "./Authorise.module.scss"
import { ApproveCosts } from "./ApproveCosts/ApproveCosts";
import { ApproveDoorstaff } from "./ApproveDoorstaff/ApproveDoorstaff";

export const Authorise = () => (
            <div className={s.container}>
                <header><h1>Authorise</h1></header>
                <main>
                    <ApproveDoorstaff/>
                    <ApproveCosts/>
                </main>
            </div>
    );

