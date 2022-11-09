import s from "./SwitchView.module.scss"

export const SwitchView = (props) => (
    <div className={s.container}>
          <input type="radio" value="history" name="gender" onChange={()=> props.defineView('history')} checked={props.currentView==="history"} /> History
        <input type="radio" value="activities" name="gender" onChange={()=> props.defineView('activities')} checked={props.currentView==="activities"} /> Activities
    </div>
);

