import s from "./Search.module.scss";
import { History } from "./History/History";
import { Activities } from "./Activities/Activities";
import { useState } from "react";


export const Search = () => {
  const [view, setView] = useState("activities");

  return (
    <div className={s.container}>

      {/* {view === "history" ? <History></History> : null} */}
      {view === "activities" ? <Activities></Activities> : null}
    </div>
  );
};
