import s from "./SwitchView.module.scss";
import { useNavigate, useLocation } from "react-router-dom";


export const SwitchView = (props) => {
  const inputs = [];
  const nav = useNavigate();
  const location = useLocation();

  for (let i = 0; i < props.inputs.length; i++) {
    inputs.push(
      <div key={i} className={s.input_container}>
        <label>
        <input 
          type="radio"
          id={i}
          nme={i}
          value={props.inputs[i]}
          placeholder={`Input ${i + 1}`}
          checked={location.pathname.includes(props.inputs[i])}
          onChange={() => {
            nav(props.inputs[i])
          }}
        />
        {props.inputs[i]}
        </label>
      </div>
    );
  }

  return <div className={s.container}>{inputs} {props.countedActivity > 0 ?  <span className={s.countedActivity}>{props.countedActivity < 10 ? props.countedActivity : "9+"}</span> : null} </div>;
};
