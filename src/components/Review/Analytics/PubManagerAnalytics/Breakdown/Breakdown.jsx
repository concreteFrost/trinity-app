import { useSelector } from "react-redux";
import s from "./Breakdown.module.scss";
import { BreakdownList } from "./BreakdownList/BreakdownList";


export const Breakdown = () => {
  const analytics = useSelector((state) => state.pubManagerAnalyticsReducer);

  return (
    <div className={s.container} id="component-to-export">
      <h2>BREAKDOWN</h2>
      <div className={s.breakdown_lists} >
        <BreakdownList payments={analytics.doorstaff} title={"Doorstaff"}></BreakdownList>
        <BreakdownList payments={analytics.costs} title={"Costs"}></BreakdownList>
      </div>
    </div>
  );
};
