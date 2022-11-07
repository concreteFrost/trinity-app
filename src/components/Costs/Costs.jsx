import s from "./Costs.module.scss"
import { CostsForm } from "./CostsForm/CostsForm"
import { CostsDoorstaff } from "./CostsDoorstaff/CostsDoorstaff";
import { CostsOther } from "./CostsOther/CostsOther";

export const Costs = () => (
    <div className={s.container}>
        <header><h1>COSTS</h1></header>

        <main>
            <CostsForm></CostsForm>
            <div>
                <h2>DOORSTAFF</h2>
                <CostsDoorstaff></CostsDoorstaff>
            </div>
            <div>
                <h2>OTHER</h2>
                <CostsOther></CostsOther>
            </div>
        </main>

    </div>
);

