import s from "./Search.module.scss"
import { History } from "./History/History";
import { Activities } from "./Activities/Activities";

export const Search = () => (
    <div className={s.container}>
        <header><h1>SEARCH</h1></header>
        <main>
           <History></History>
           <Activities></Activities>
        </main>
    </div>
);

