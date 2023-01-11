import s from "./Costs.module.scss"
import { CostsForm } from "./CostsForm/CostsForm"
import { CostsTable } from "./CostsTable/DoorstaffTable/CostsTable";
import { useSelector } from "react-redux";

export const Costs = () => {
    const doorstaff = useSelector(state=> state.costsReducer.doorstaff)
    const costs = useSelector(state=> state.costsReducer.costs)
    return (
        <div className={s.container}>
            <header><h1>SUMMARY REVIEW</h1></header>
           
            <main> 
                <CostsForm></CostsForm>
                <div>
                    <h2>DOORSTAFF</h2>
                    <CostsTable data={doorstaff}></CostsTable>
                </div>
                <div>
                    <h2>OTHER</h2>
                    <CostsTable data={costs}></CostsTable>
                </div>
            </main>

        </div>
    );
}

