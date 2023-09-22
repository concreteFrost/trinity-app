import html2pdf from "html2pdf.js";
import { GetTimesheetDataAPI, GetSearchLocationsAPI, GetSearchedDataAPI } from "../reportApi";
import { SetReceiptData, GetAreaManagerAnalyticsCosts, GetAreaManagerAnalyticsDoorstaff } from "../../redux/actions";

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

export function GetAreaManagerAnalytics(system, token, analytics, dispatch) {
    const requests =
        analytics.locations
            .filter((location) => location.isChecked)
            .map((location) => {
                return GetSearchedDataAPI(system, token, location.id, analytics).then((res) => {
                    return res.data.reportRecord;
                });
            })


    return Promise.all(requests).then((results) => {
        const concatenatedResults = results.reduce((acc, curr) => acc.concat(curr), []);
        switch (system) {
            case "A":
                dispatch(GetAreaManagerAnalyticsCosts(concatenatedResults))
                break;
            case "S":
                dispatch(GetAreaManagerAnalyticsDoorstaff(concatenatedResults));
                break;
        }

    })
}


