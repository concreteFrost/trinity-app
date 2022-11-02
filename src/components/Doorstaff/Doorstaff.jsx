import s from "./Doorstaff.module.scss";
import { SignIn } from "./SignIn/SignIn";
import { DoorstaffTable } from "./DoorstaffTable/DoorstaffTable";

export const Doorstaff = () => (
    <div className={s.container}>
        <header>
            <h1>DOORSTAFF MANAGEMENT</h1>
        </header>
        <main>
            <SignIn></SignIn>
            <DoorstaffTable></DoorstaffTable>
        </main>

    </div>
);

