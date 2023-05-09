import s from "./AreaManagerAnalytics.module.scss";
import { LocationList } from "./LocationList/LocationList";
import { DatesForm } from "./DatesForm/DatesForm";
import { Chart } from "./Chart/Chart";
import { useSelector } from "react-redux";

export const AreaManagerAnalytics = () => {
  const costs = useSelector((state) => state.areaManagerAnalyticsReducer);

  return (
    <div className={s.container}>
      <div className={s.grid_area}>
        <div className={s.switch_type}>
          <LocationList></LocationList>
        </div>
        <div className={s.form}>
          <DatesForm></DatesForm>
        </div>
        <div className={s.chart}>
          <Chart activity={costs.costs}></Chart>
        </div>
      </div>
    <div className={s.breakdown}>BREAKDOWN</div>  
    </div>
  );
};
