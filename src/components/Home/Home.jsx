import s from "./Home.module.scss";
import { Summary } from "./Summary/Summary";

import { ActivityTable } from "../Activity/ActivityTable/ActivityTable";
import { Current } from "../Doorstaff/Current/Current";

export const Home = () => (
  <div className={s.container}>
    <header>
      <h1> SIA DOORSTAFF & CENTRAL COSTS MANAGEMENT SYSTEM</h1>
    </header>
    <main>
      
      <Summary></Summary>
      <div>
        <header><h2>Doorstaff onsite</h2></header>
        <Current ></Current>
      </div>
      <div>
        <header><h2>Activity list</h2></header>
        <ActivityTable></ActivityTable>
      </div>

    </main>
  </div>
);
