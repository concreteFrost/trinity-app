import s from "./Chart.module.scss";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export const Chart = (props) => {

  const labels = [
    ...new Set(props.activity.map((item) => item.start.split("T")[0])),
  ];

  const calculatePayments = (obj) => {
    return labels.map((date) => {
      return obj
        .filter((item) => item.start.split("T")[0] === date)
        .reduce((acc, curr) => acc + curr.cost, 0);
    });
  };

  const payments = calculatePayments(props.activity);

const dSet = {
  labels: labels,
  datasets: [
    {
      label: "Payments",
      data: payments,
      backgroundColor: "#eb3a34",
      borderColor: "#eb3a34",
    },
  ],
};

  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Disable maintaining aspect ratio
  };
  return (
    <div className={s.graph}>
      <Line data={dSet } options={options} />
      {/* <button className={s.print_button}>Print</button> */}
    </div>
  );
};
