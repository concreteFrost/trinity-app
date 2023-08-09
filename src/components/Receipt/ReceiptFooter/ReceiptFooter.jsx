import s from "./ReceiptFooter.module.scss"

export const ReceiptFooter = (props) =>{
    return(
        <div className={s.footer}>
        <div className={s.signature}>
            {props.systemToCheck === "A" ? <div>Signed: (Supplier)</div> : <div>Signed (Door Person)</div>}
            <div>_________________________________</div>
            <div>Signed:(On behalf of pub)</div>
            <div>_________________________________</div>
        </div>
        <div className={s.doc_info}>This document certifies that the above named person was in attendance at a JDW site on the indicated
            date. It provides no proof of the hours worked which will be confirmed following authorisation by a JD
            Wetherspoon Senior Manager.</div>
        <div className={s.ref_and_date}>
            <div>Activity Reference: {props.receiptData.activityId ? props.receiptData.activityId : null}</div>
            <div>{props.formatDate(new Date())}</div>
        </div>
    </div>
    )
}