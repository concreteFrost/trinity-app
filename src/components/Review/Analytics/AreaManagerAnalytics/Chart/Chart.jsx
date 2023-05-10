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

const generateRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const Chart = (props) => {

  console.log(props)
  const labels = [
    ...new Set(props.data.map((item) => item.start.split("T")[0]))
  ];

  const calculatePayments = (group) => {
    return labels.map((date) => {
      return group
        .filter((item) => item.start.split("T")[0] === date)
        .reduce((acc, curr) => acc + curr.cost, 0);
    });
  };

  const groups = {};

  props.data.forEach(obj => {
    const groupKey = obj.locationName;
    if (groups[groupKey]) {
      groups[groupKey].push(obj);
    } else {
      groups[groupKey] = [obj];
    }
  });

  const datasets = Object.entries(groups).map(([groupName, group]) => {
    const payments = calculatePayments(group);
    const backgroundColor = generateRandomColor();
    const borderColor = backgroundColor;
    return {
      label: groupName,
      data: payments,
      backgroundColor: backgroundColor,
      borderColor: borderColor,
    };
  });

  const dSet = {
    labels: labels,
    datasets: datasets,
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <h3>{props.title}</h3>
      <div className={s.graph}>
        <Line data={dSet} options={options} />
      </div>
    </div>
  );
};
