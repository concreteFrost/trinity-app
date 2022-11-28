import s from "./SwitchView.module.scss"

export const SwitchView = (props) => (
    <div className={s.container}>
          <input type="radio" value="current"  onChange={()=> props.defineView('current')} checked={props.currentView==="current"} /> Current
        <input type="radio" value="recent"  onChange={()=> props.defineView('recent')} checked={props.currentView==="recent"} /> Recent
        <input type="radio" value="disputed"  onChange={()=> props.defineView('disputed')} checked={props.currentView==="disputed"} /> Disputed
    </div>
);

