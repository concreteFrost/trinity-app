import s from "./NavbarList.module.scss";
import { NavLink } from "react-router-dom";

export const NavbarList = () => {
  return (
    <div className={s.navbar_list}>
      <NavLink
        className={({ isActive }) => (isActive ? s.active : s.default)}
        to="/home"
      >
        HOME
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? s.active : s.default)}
        to="/activity"
      >
        ACTIVITY
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? s.active : s.default)}
        to="/doorstaff"
      >
        DOORSTAFF
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? s.active : s.default)}
        to="/costs"
      >
        COSTS
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? s.active : s.default)}
        to="/search"
      >
        SEARCH
      </NavLink>
      <button>LOGOUT</button>
    </div>
  );
};
