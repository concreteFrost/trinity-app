import s from "./Doorstaff.module.scss";
import { SignIn } from "./SignIn/SignIn";
import { DoorstaffTable } from "./DoorstaffTable/DoorstaffTable";
import { SIA } from "./SIA/SIA";


export const Doorstaff = () => {


    
    return (<div className={s.container}>
        <header>
            <h1>DOORSTAFF MANAGEMENT</h1>
        </header>
        <main>
            <SIA></SIA>
            <SignIn></SignIn>
            <DoorstaffTable isVisible={true}></DoorstaffTable>
        </main>

    </div>
    )
}

