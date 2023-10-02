import s from "./NavbarList.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GearFill } from "react-bootstrap-icons";
import { ToggleDebugConsole } from "../../../redux/actions/debugConsoleActions"

export const NavbarList = (props) => {

  const dispatch = useDispatch();
  const userReducer = useSelector(state => state.userReducer.user);
  const location = useLocation();

  return (
    <div className={s.navbar_list}>
      <NavLink
        className={() => (location.pathname.includes("home") ? s.active : s.default)}
        to="/home"
      >
        HOME
      </NavLink>
      {userReducer.userRole == 3 ? <NavLink
        className={() => (location.pathname.includes("activity") ? s.active : s.default)}
        to="/activity/current"
      >
        ACTIVITY
      </NavLink> : null}

      {userReducer.userRole == 3 ? <NavLink
        className={() => (location.pathname.includes("doorstaff") ? s.active : s.default)}
        to="/doorstaff/current"
      >
        DOORSTAFF
      </NavLink> : null}
      <NavLink
        className={() => (location.pathname.includes("review") ? s.active : s.default)}
        to="/review/summary"

      >
        REVIEW
      </NavLink>
      <NavLink
        className={() => (location.pathname.includes("search") ? s.active : s.default)}
        to="/search/activities/"
      >
        SEARCH
      </NavLink>
      {userReducer.userRole == 2 || userReducer.userRole == 1 ? <NavLink
        className={() => (location.pathname.includes("authorise") ? s.active : s.default)}
        to="/authorise/doorstaff"
      >
        AUTHORISE
      </NavLink> : null}
      <div>
        <GearFill className={s.settings_btn} onClick={() => dispatch(ToggleDebugConsole())}></GearFill>
      </div>

      <button className={s.logout_btn} onClick={() => dispatch({ type: "SHOW_LOGOUT_MODAL" })}>LOGOUT</button>
    </div>
  );
};
