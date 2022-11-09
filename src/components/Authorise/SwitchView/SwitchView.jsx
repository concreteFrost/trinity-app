import s from "./SwitchView.module.scss"

export const SwitchView = (props) => (
    <div className={s.container}>
          <input type="radio" value="Doorstaff" name="gender" onChange={()=> props.defineView('doorstaff')} checked={props.currentView==="doorstaff"} /> Doorstaff
        <input type="radio" value="Costs" name="gender" onChange={()=> props.defineView('costs')} checked={props.currentView==="costs"} /> Costs
    </div>
);

