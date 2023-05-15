import { useSelector } from "react-redux";
import s from "./Breakdown.module.scss";
import { BreakdownList } from "./BreakdownList/BreakdownList";

function breakByGroups(obj, target) {
  obj.sort((a, b) => a.locationName.localeCompare(b.locationName)); // Sort the obj array alphabetically by locationName

  obj.forEach((item) => {
    const groupKey = item.locationName;
    if (target[groupKey]) {
      target[groupKey].push(item);
    } else {
      target[groupKey] = [item];
    }
  });
}


export const Breakdown = () => {
  const analytics = useSelector((state) => state.areaManagerAnalyticsReducer);

  const doorGroups = {};
  const costsGroups = {};

  breakByGroups(analytics.doorstaff, doorGroups);
  breakByGroups(analytics.costs, costsGroups);

  const doorGroupsArray = Object.keys(doorGroups);
  const costsGroupsArray = Object.keys(costsGroups);

  return (
    <div className={s.container} id="component-to-export">
      <h2>BREAKDOWN</h2>
      <div className={s.breakdown_group}>
        <div className={s.breakdown_lists}>
          <h3>Doorstaff</h3>
          <ul>
            {doorGroupsArray.length > 0 ? (
              doorGroupsArray.map((key) => (
                <li key={key}>
                  <BreakdownList
                    payments={doorGroups[key]}
                    title={key}
                  ></BreakdownList>
                </li>
              ))
            ) : (
              null
            )}
          </ul>
        </div>
        <div className={s.breakdown_lists}>
          <h3>Costs</h3>
          <ul>
            {costsGroupsArray.length > 0 ? (
              costsGroupsArray.map((key) => (
                <li key={key}>
                  <BreakdownList
                    payments={costsGroups[key]}
                    title={key}
                  ></BreakdownList>
                </li>
              ))
            ) : (
              null
            )}
          </ul>
        </div>
      </div>

    </div>
  );
};
