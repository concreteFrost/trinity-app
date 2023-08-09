import s from "./Receipt.module.scss";
import { useSelector } from "react-redux";
import { ActivityTable } from "./ActivityTable/ActivityTable";
import { DoorstaffTable } from "./DoorstaffTable/DoorstaffTable";
import { SupplierInfo } from "./SupplierInfo/SupplierInfo";
import { PubInfo } from "./PubInfo/PubInfo";
import { ReceiptFooter } from "./ReceiptFooter/ReceiptFooter";
import { ReceiptHeader } from "./ReceiptHeader/ReceiptHeader";

export const Receipt = (props) => {

    const receiptData = useSelector((state) => state.receiptReducer.data)
    const receiptTittle = useSelector((state) => state.receiptReducer.title);
    const systemToCheck = useSelector((state) => state.receiptReducer.systemToCheck);

    function formatDate(inputDate) {
        const date = new Date(inputDate);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return (
        <div className={s.hidden_wrapper} >
            <div className={s.wrapper} id="receipt" >
                <ReceiptHeader receiptTittle={receiptTittle}></ReceiptHeader>
                <div className={s.tables}>
                    <SupplierInfo systemToCheck={systemToCheck} receiptData={receiptData}></SupplierInfo>
                    <PubInfo receiptData={receiptData}></PubInfo>
                </div>
                {systemToCheck === "A" ? <ActivityTable receiptData={receiptData} formatDate={formatDate}></ActivityTable> : 
                <DoorstaffTable receiptData={receiptData} formatDate={formatDate}></DoorstaffTable>
                }
                <ReceiptFooter systemToCheck={systemToCheck} receiptData={receiptData} formatDate={formatDate}></ReceiptFooter>
            </div>
        </div>
    )
}