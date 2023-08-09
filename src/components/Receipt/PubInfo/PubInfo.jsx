import s from "./PubInfo.module.scss"

export const PubInfo = (props)=>{
    return(
        <div className={s.pub_info}>
        <div className={s.pub_title}> <span> Pub:</span></div>
        <div className={s.pub_address}>
            <p>{props.receiptData.locationName ? props.receiptData.locationName : null}</p>
            <p>{props.receiptData.locationAddress1 ? props.receiptData.locationAddress1 : null}</p>
            <p>{props.receiptData.locationAddress2 ? props.receiptData.locationAddress2 : null}</p>
            <p>{props.receiptData.locationAddress3 ? props.receiptData.locationAddress3 : null}</p>
            <p>{props.receiptData.locationAddress4 ? props.receiptData.locationAddress4 : null}</p>
        </div>


        <div className={s.pub_telephone}><span>Telephone:</span>{props.receiptData.locationPhone ? props.receiptData.locationPhone : null}</div>
    </div>
    )
}