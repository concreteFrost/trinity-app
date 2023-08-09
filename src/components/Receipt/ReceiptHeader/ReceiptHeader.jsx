import s from "./ReceiptHeader.module.scss"

export const ReceiptHeader = (props) =>{
    return(
        <div className={s.header} >
        <div className={s.title}>{props.receiptTittle ? props.receiptTittle : null}</div>
        <div className={s.main_address}>
            <p>J D Wetherspoon plc</p>
            <p> Wetherspoon House </p>
            <p> Central Park</p>
            <p> Reeds Crescent </p>
            <p> Watford </p>
            <p> WD24 4Q </p>
        </div>
        <div className={s.switchboard}>Switchboard: 01923 477777</div>
    </div>
    )
}