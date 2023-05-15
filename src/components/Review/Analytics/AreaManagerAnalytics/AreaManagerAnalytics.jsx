import s from "./AreaManagerAnalytics.module.scss";
import { LocationList } from "./LocationList/LocationList";
import { DatesForm } from "./DatesForm/DatesForm";
import { Chart } from "./Chart/Chart";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Breakdown } from "./Breakdown/Breakdown";


export const AreaManagerAnalytics = () => {
  const costs = useSelector((state) => state.areaManagerAnalyticsReducer.costs);
  const doorstaff = useSelector((state) => state.areaManagerAnalyticsReducer.doorstaff);

  const [showDropdown, setShowDropdown] = useState(false);

  function toggleShowLocations() {
    setShowDropdown(!showDropdown);
  }

  function closeLocations() {

    if (showDropdown)
      setShowDropdown(false)
  }
  return (
    <div className={s.container}  >
      <div className={s.switch_type} >
        <LocationList toggleShowLocations={toggleShowLocations} showDropdown={showDropdown}></LocationList>
      </div>
      <div className={s.form} onClick={closeLocations}>
        <DatesForm></DatesForm>
      </div>
      <div className={s.chart_area} onClick={closeLocations}>
        <Chart data={doorstaff} title={"doorstaff"}></Chart>
        <Chart data={costs} title={"costs"}></Chart>
      </div>
      <div className={s.breakdown}><Breakdown></Breakdown></div>
    </div>
  );
};
