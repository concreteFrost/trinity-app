import * as AuthoriseTypes from "../types/authoriseTypes";

export function CheckAllAuthoriseDoorstass(){
    return {type: AuthoriseTypes.CHECK_ALL_AUTHORISE_DOORSTAFF}
}

export function CheckAllAuthoriseCosts(){
    return { type: AuthoriseTypes.CHECK_ALL_AUTHORISE_COSTS }
}

export function UncheckAllAuthoriseDoorstaff(){
    return{ type: AuthoriseTypes.UNCHECK_ALL_AUTHORISE_DOORSTAFF }
}

export function UncheckAllAuthoriseCosts(){
    return { type: AuthoriseTypes.UNCHECK_ALL_AUTHORISE_COSTS }
}

export function SetDisputedPaymentID(id) {
    return { type:  AuthoriseTypes.SET_DISPUTED_PAYMENT_ID, data: id }
  }

