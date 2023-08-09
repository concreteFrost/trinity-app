import s from "./SupplierInfo.module.scss"

export const SupplierInfo = (props)=>{
    return(    <div className={s.supplier_info}>

        <div className={s.supplier_title}>{props.systemToCheck === "A" ? <span > Supplier:</span> : <span>Door Staff Supplier: </span>}{props.receiptData.supplierAccount ? props.receiptData.supplierAccount : null}</div>
        <div className={s.supplier_address}>
            <p>{props.receiptData.supplierName ? props.receiptData.supplierName : null}</p>
            <p>{props.receiptData.supplierAddress1 ? props.receiptData.supplierAddress1 : null}</p>
            <p>{props.receiptData.supplierAddress2 ? props.receiptData.supplierAddress2 : null}</p>
            <p>{props.receiptData.supplierAddress3 ? props.receiptData.supplierAddress3 : null}</p>
            <p>{props.receiptData.supplierAddress4 ? props.receiptData.supplierAddress4 : null}</p>
        </div>

        <p>
            <span className={s.supplier_telephone}>Telephone:
            </span>
            {props.receiptData.supplierPhone ? props.receiptData.supplierPhone : null}
        </p>
    </div>)
}