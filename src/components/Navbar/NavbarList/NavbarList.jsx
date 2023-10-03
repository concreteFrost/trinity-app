import s from "./NavbarList.module.scss";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GearFill } from "react-bootstrap-icons";
import NavbarSettings from "../NavbarSettings/NavbarSettings";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";

export const NavbarList = (props) => {
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer.user);
  const location = useLocation();
  const settingsRef = useRef(null);

  const [isSettingsVisible, setSettingsVisible] = useState(false);

  function SetSettingsVisible() {
    setSettingsVisible(!isSettingsVisible);
  }

  function handleOutsideClick(e) {
    if (settingsRef.current && !settingsRef.current.contains(e.target)) {
      setSettingsVisible(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className={s.navbar_list}>
      <NavLink
        className={() =>
          location.pathname.includes("home") ? s.active : s.default
        }
        to="/home"
      >
        HOME
      </NavLink>
      {userReducer.userRole == 3 ? (
        <NavLink
          className={() =>
            location.pathname.includes("activity") ? s.active : s.default
          }
          to="/activity/current"
        >
          ACTIVITY
        </NavLink>
      ) : null}

      {userReducer.userRole == 3 ? (
        <NavLink
          className={() =>
            location.pathname.includes("doorstaff") ? s.active : s.default
          }
          to="/doorstaff/current"
        >
          DOORSTAFF
        </NavLink>
      ) : null}
      <NavLink
        className={() =>
          location.pathname.includes("review") ? s.active : s.default
        }
        to="/review/summary"
      >
        REVIEW
      </NavLink>
      <NavLink
        className={() =>
          location.pathname.includes("search") ? s.active : s.default
        }
        to="/search/activities/"
      >
        SEARCH
      </NavLink>
      {userReducer.userRole == 2 || userReducer.userRole == 1 ? (
        <NavLink
          className={() =>
            location.pathname.includes("authorise") ? s.active : s.default
          }
          to="/authorise/doorstaff"
        >
          AUTHORISE
        </NavLink>
      ) : null}
      <div className={s.settings_btn} ref={settingsRef}>
        <GearFill onClick={SetSettingsVisible}></GearFill>
        {isSettingsVisible ? <NavbarSettings></NavbarSettings> : null}
      </div>

      <button
        className={s.logout_btn}
        onClick={() => dispatch({ type: "SHOW_LOGOUT_MODAL" })}
      >
        LOGOUT
      </button>
    </div>
  );
};
