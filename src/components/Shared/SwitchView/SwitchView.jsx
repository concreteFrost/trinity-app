import s from "./SwitchView.module.scss";

export const SwitchView = (props) => {
  const inputs = [];
  console.log(props.countedActivity)
  for (let i = 0; i < props.inputs.length; i++) {
    inputs.push(
      <>
        <input
          key={i}
          type="radio"
          value={props.inputs[i]}
          placeholder={`Input ${i + 1}`}
          checked={props.currentView == props.inputs[i]}
          onChange={() => {
            props.defineView(props.inputs[i]);
          }}
        />
        {props.inputs[i]}
      </>
    );
  }

  return <div className={s.container}>{inputs} <span className={s.countedActivity}>{props.countedActivity}</span></div>;
};
