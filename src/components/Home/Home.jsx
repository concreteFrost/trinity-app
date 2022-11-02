import s from "./Home.module.scss";
import { Summary } from "./Summary/Summary";

export const Home = () => (
  <div className={s.container}>
    <header>
      <h1> SIA DOORSTAFF & CENTRAL COSTS MANAGEMENT SYSTEM</h1>
    </header>
    <main>
      <div></div>
      <div>
        <Summary></Summary>
      </div>
      <div></div>
    </main>
  </div>
);
