import s from "./PubManagerAnalytics.module.scss";
import { SwitchType } from "./SwitchType/SwitchType";
import { DatesForm } from "./DatesForm/DatesForm";
import { Chart } from "../../../Shared/Chart/Chart";
import { useSelector } from "react-redux";
import { Breakdown } from "./Breakdown/Breakdown";

export const PubManagerAnalytics = () => {
  const analytics = useSelector((state) => state.pubManagerAnalyticsReducer);

  return (
    <div className={s.container}>
      <div className={s.grid_area}>
        <div className={s.switch_type}>
          <SwitchType></SwitchType>
        </div>
        <div className={s.form}>
          <DatesForm></DatesForm>
        </div>
        <div className={s.chart}>
          <Chart data={analytics}></Chart>
        </div>
      </div>
      <div className={s.breakdown}>
        <Breakdown></Breakdown>
      </div>
    </div>
  );
};
