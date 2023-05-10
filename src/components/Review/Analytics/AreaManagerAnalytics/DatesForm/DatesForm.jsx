import s from "./DatesForm.module.scss";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { baseUrl } from "../../../../../contexts/baseUrl";

export const DatesForm = () => {
  const analytics = useSelector((state) => state.areaManagerAnalyticsReducer);
  const user = useSelector((state) => state.userReducer.user);

  const dispatch = useDispatch();

  async function Submit(e) {
    e.preventDefault();
    const fetchData = async (system) => {

      let fetchedData = [];

      await Promise.all(
        analytics.locations.filter((location) => location.isChecked).map((location) =>
          axios({
            url: baseUrl + "/Report/ActivityList?system=" + system,
            headers: {
              Authorization: "Bearer " + user.access_token,
              "Content-Type": "application/json",
            },
            method: "POST",
            data: {
              dateFrom: analytics.dateFrom,
              dateTo: analytics.dateTo,
              locationId: location.id,
              locationGroupId: 0,
              supplierId: 0,
              reference: 0,
              paymentStatusId: -1,
            },
          }).then((res) => {
            console.log(res.data.reportRecord)
            fetchedData = fetchedData.concat(res.data.reportRecord);
          })
        )
      );

      return fetchedData;
    };

    const fetchedResult = await fetchData("A");
    const fetchedDoorstaff = await fetchData("S");

    dispatch({ type: "GET_AREA_MANAGER_ANALYTICS_COSTS", data: fetchedResult });
    dispatch({ type: "GET_AREA_MANAGER_ANALYTICS_DOORSTAFF", data: fetchedDoorstaff });

  }
  return (
    <div className={s.container}>
      <form onSubmit={Submit}>
        <div>
          <label htmlFor="">FROM</label>
          <input
            type="date"
            name="from-date"
            id="from-date"
            value={analytics.dateFrom}
            onChange={(e) => {
              dispatch({
                type: "SET_AREA_MANAGER_ANALYTICS_DATE_FROM",
                data: e.target.value,
              });
            }}
          ></input>
        </div>
        <div>
          <label htmlFor="">TO</label>
          <input
            type="date"
            name="to-date"
            id="to-date"
            value={analytics.dateTo}
            onChange={(e) => {
              dispatch({
                type: "SET_AREA_MANAGER_ANALYTICS_DATE_TO",
                data: e.target.value,
              });
            }}
          />
        </div>
        <div className={s.view_btn}>
          {" "}
          <button>VIEW</button>
        </div>
      </form>
    </div>
  );
};
