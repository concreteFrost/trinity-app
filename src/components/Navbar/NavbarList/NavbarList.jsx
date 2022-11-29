import s from "./NavbarList.module.scss";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserLogOff } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";

export const NavbarList = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function Logout() {
     dispatch(UserLogOff());
     localStorage.removeItem('user')
    navigate('/login')
  }
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
      <NavLink
        className={({ isActive }) => (isActive ? s.active : s.default)}
        to="/authorise"
      >
        AUTHORISE
      </NavLink>
      <button onClick={Logout}>LOGOUT</button>
    </div>
  );
};
