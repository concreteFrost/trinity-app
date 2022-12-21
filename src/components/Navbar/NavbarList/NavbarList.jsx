import s from "./NavbarList.module.scss";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UserLogOff } from "../../../redux/actions";
import { useNavigate } from "react-router-dom";

export const NavbarList = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userReducer = useSelector(state=> state.userReducer.user);
  function Logout() {
     dispatch(UserLogOff());
     
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
      {userReducer.userRole ==3 ?  <NavLink
        className={({ isActive }) => (isActive ? s.active : s.default)}
        to="/activity"
      >
       ACTIVITY
      </NavLink> : null}
     
      {userReducer.userRole ==3 ? <NavLink
        className={({ isActive }) => (isActive ? s.active : s.default)}
        to="/doorstaff"
      >
        DOORSTAFF
      </NavLink> : null }
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
      {userReducer.userRole == 2 ? <NavLink
        className={({ isActive }) => (isActive ? s.active : s.default)}
        to="/authorise"
      >
        AUTHORISE
      </NavLink> : null}
      <button onClick={Logout}>LOGOUT</button>
    </div>
  );
};
