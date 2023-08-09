import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";
import html2pdf  from "html2pdf.js";

function generatePDF() {
  const el = document.getElementById('receipt');
  const pdfOptions = {
      filename: 'jdw-receipt.pdf',
  };
  html2pdf().from(el).set(pdfOptions).save()
}


export function GetTimesheetData(token,system,activityId){
  return function (dispatch){
    axios.get(`${baseUrl}/Report/Timesheet?system=${system}&activityId=${activityId}`, {
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((res)=>{
      const receiptTitle = system === "A" ? 'Pub Activity Receipt' : 'Door Staff Timesheet'
      dispatch({type:"SET_RECEIPT_DATA", title: receiptTitle,systemToCheck : system ,data: res.data})
    }).then(()=>generatePDF()).catch((e)=>console.log(e))
  }
}