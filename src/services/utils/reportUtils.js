import html2pdf from "html2pdf.js";
import { GetTimesheetDataAPI } from "../reportApi";
import { SetReceiptData } from "../../redux/actions";

export function GeneratePDF(token, system, activityId, dispatch) {
    GetTimesheetDataAPI(token, system, activityId).then((res) => {
        console.log("generate pdf success", res);
        const receiptTitle = system === "A" ? 'Pub Activity Receipt' : 'Door Staff Timesheet'
        dispatch(SetReceiptData(receiptTitle, system, res))
    }).then(() => {
        const el = document.getElementById('receipt');
        const pdfOptions = {
            filename: 'jdw-receipt.pdf',
        };
        html2pdf().from(el).set(pdfOptions).save()
    }).catch((e) => console.log('generate pdf error', e));



}

