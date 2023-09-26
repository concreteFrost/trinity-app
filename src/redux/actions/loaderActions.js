import { SHOW_LOADER,HIDE_LOADER } from "../types/loaderTypes"

export function ShowLoader() {

    return { type: SHOW_LOADER }
  }
  
  export function HideLoader() {
    return { type: HIDE_LOADER }
  }
  