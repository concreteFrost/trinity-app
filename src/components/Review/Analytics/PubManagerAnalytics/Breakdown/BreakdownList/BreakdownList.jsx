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
    return obj.map((e) => e.payments).reduce((a, b) => a + b).toFixed(2);
  };

  const calculateAverage = (obj) => {
    const sum = obj.map((e) => e.payments).reduce((a, b) => a + b);
    const average = sum / obj.length;
    return average.toFixed(2); 
  };
  

  const calculateMin = (obj) => {
    return Math.min(...obj.map((e) => e.payments)).toFixed(2);
  };

  const calculteMax = (obj) => {
    return Math.max(...obj.map((e) => e.payments)).toFixed(2);
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
              <li><span>Total: </span>{paymentsTotal}</li>
              <li><span>Average: </span> {paymentsAverage}</li>
              <li><span>Minimum: </span> {paymentsMin}</li>
              <li><span>Maximum: </span> {paymentsMax}</li>
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
                    <span>Cost:</span> {payment.payments}
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