import s from "./BreakdownList.module.scss";


export const BreakdownList = (props) => {
  const labels = [
    ...new Set(props.payments.map((item) => item.start.split("T")[0])),
  ];

  const calculatePayments = (obj) => {
    return labels.map((date) => {
      const payments = obj
        .filter((item) => item.start.split("T")[0] === date)
        .reduce((acc, curr) => acc + curr.cost, 0);
      return { date, payments };
    });
  };

  const calculateTotal = (obj) => {
    return obj.map((e) => e.payments).reduce((a, b) => a + b);
  };

  const calculateAverage = (obj) => {
    const sum = obj.map((e) => e.payments).reduce((a, b) => a + b);
    const average = sum / obj.length;
    return average;
  };


  const calculateMin = (obj) => {
    return Math.min(...obj.map((e) => e.payments));
  };

  const calculteMax = (obj) => {
    return Math.max(...obj.map((e) => e.payments));
  };

  let paymentsData;
  let paymentsTotal;
  let paymentsAverage;
  let paymentsMin;
  let paymentsMax;

  if (props.payments.length > 0) {
    paymentsData = calculatePayments(props.payments);
    paymentsTotal = calculateTotal(paymentsData);
    paymentsAverage = calculateAverage(paymentsData);
    paymentsMin = calculateMin(paymentsData);
    paymentsMax = calculteMax(paymentsData);
  }
  return (

    <div  >
      <h3>{props.title}</h3>
      {props.payments.length > 0 ? (
        <div className={s.breakdown_list_container}>
          <div className={s.breakdown_total}>
            <ul>
              <li><span>Total: </span>{paymentsTotal.toFixed(2)}</li>
              <li><span>Average: </span> {paymentsAverage.toFixed(2)}</li>
              <li><span>Minimum: </span> {paymentsMin.toFixed(2)}</li>
              <li><span>Maximum: </span> {paymentsMax.toFixed(2)}</li>
            </ul>
          </div>
          <div className={s.breakdown_list}>
            <ul>
              {paymentsData.map((payment) => (
                <li key={payment.date}>
                  <p>
                    <span>Date:</span> {payment.date}
                  </p>{" "}
                  <p>
                    <span>Cost:</span> {payment.payments.toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

        </div>
      ) : (
        <span className={s.no_data}>No data available...</span>
      )}
    </div>

  );
};
