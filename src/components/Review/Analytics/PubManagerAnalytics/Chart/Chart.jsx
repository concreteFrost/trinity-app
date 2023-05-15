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
    ...new Set(props.data.doorstaff.map((item) => item.start.split("T")[0])),
  ];

  const calculatePayments = (obj) => {
    return labels.map((date) => {
      return obj
        .filter((item) => item.start.split("T")[0] === date)
        .reduce((acc, curr) => acc + curr.cost, 0);
    });
  };

  const doorstaffPayments = calculatePayments(props.data.doorstaff);
  const costsPayments = calculatePayments(props.data.costs);

  const dataSets = [];

  const doorstaffDataSet = {
    label: "doorstaff",
    data: doorstaffPayments,
    backgroundColor: "#eb3a34",
    borderColor: "#eb3a34",
  };

  const costsDataSet = {
    label: "costs",
    data: costsPayments,
    backgroundColor: "rgb(76, 105, 138)",
    borderColor: "rgb(76, 105, 138)",
  };

  switch (props.data.currentType) {
    case "S":
      dataSets.push(doorstaffDataSet);
      break;
    case "A":
      dataSets.push(costsDataSet);
      break;
    case "C":
      dataSets.push(doorstaffDataSet);
      dataSets.push(costsDataSet);
      break;
  }

  const data = {
    labels: labels,
    datasets: dataSets,
  };

  const options = {
    responsive: true, // Make the chart responsive
    maintainAspectRatio: false, // Disable maintaining aspect ratio
  };
  return (
    <div className={s.graph}>
      <Line data={data} options={options} />
      {/* <button className={s.print_button}>Print</button> */}
    </div>
  );
};
