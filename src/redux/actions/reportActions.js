import { SET_RECEIPT_DATA } from "../types/reportTypes"


export function SetReceiptData(receiptTitle, system, res) {
    return { type: SET_RECEIPT_DATA, title: receiptTitle, systemToCheck: system, data: res }
  }