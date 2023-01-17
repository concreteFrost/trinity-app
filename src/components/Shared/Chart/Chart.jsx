import s from "./Chart.module.scss";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
);

export const Chart = (props) => {
  let labels;
  let payments;

  switch (props.system) {
    case "S": {
      labels = [
        ...new Set(props.activity.map((item) => item.start.split("T")[0])),
      ];
      payments = labels.map((date) => {
        return props.activity
          .filter((item) => item.start.split("T")[0] === date)
          .reduce((acc, curr) => acc + curr.cost, 0);
      });
      break;
    }

    default: {
      labels = [
        ...new Set(props.activity.map((item) => item.startTime.split("T")[0])),
      ];
      payments = labels.map((date) => {
        return props.activity
          .filter((item) => item.startTime.split("T")[0] === date)
          .reduce((acc, curr) => acc + curr.costValue, 0);
      });
      break;
    }
  }
  const data = {
    labels: labels,
    datasets: [
      {
        data: payments,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
      },
    ],
    options: {
      tooltips: {
        mode: "index",
        intersect: false,
      },
    },
  };

  return (
    <div className={s.graph}>
      <Line data={data} responsive={true} />
    </div>
  );
};
