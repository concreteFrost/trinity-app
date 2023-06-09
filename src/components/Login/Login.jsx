import s from "./Login.module.scss";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetToken } from "../../redux/api/loginApi";
import { SetLoginDetails } from "../../redux/actions";
import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";

export const Login = () => {
  const errorMessage = useSelector((state) => state.userReducer.errorOnLogin)
  const isLoggedIn = useSelector(state => state.userReducer.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let clientID = localStorage.getItem("clientID");
  let user = JSON.parse(localStorage.getItem('user'))
  console.log(errorMessage)
  if (!clientID) {
    axios
      .get(
        baseUrl + "/Auth/GenerateUniqueReference"
      )
      .then((res) => {
        localStorage.setItem("clientID", res.data.message);
        clientID = res.data.message;
      });
  }

  useEffect(() => {
    if (user) {
      if (new Date() < new Date(user['.expires']))
        dispatch(SetLoginDetails(user))
    }

    if (isLoggedIn) {
      if (localStorage.getItem("lastRoute")) {
        navigate(localStorage.getItem("lastRoute"))
      }
      else {
        navigate("/home")
      }
    }
  }, [isLoggedIn])

  function submitLogin(e) {
    e.preventDefault();
    dispatch(GetToken(e.target[0].value, clientID))

  }
  return (
    <div className={s.container}>
      <form onSubmit={submitLogin}>
        <div>
          <label htmlFor="userName" autoComplete="new-password">
            User name
          </label>
          <input type="text" name="userName" id="userName" />
        </div>

        <button>Login</button>
      </form>
      <div className={s.error_container}>
        <div className={errorMessage ? s.error : s.error_fade}>
          <p>*The username or password is incorrect</p>
          <p> <strong>–NOTE </strong> pub logins should be entered in the format of your network login without the ‘@jdwetherspoon.co.uk’</p>
          <p><i> -e.g. ‘p95’ or ‘p177’ or ‘p4039’ without any leading zeroes </i></p>
        </div>
      </div>
    </div>
  );
};
