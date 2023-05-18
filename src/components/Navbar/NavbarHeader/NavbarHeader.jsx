import s from "./NavbarHeader.module.scss"
import { useSelector } from "react-redux"

export const NavbarHeader = () => {
    const state = useSelector((state) => state.userReducer.user)
    console.log(state)
    return (<div className={s.header}>
        Welcome Back, {state.siteName}
    </div>)
}