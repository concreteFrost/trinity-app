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
        {errorMessage ? (
          <div className={s.error}>
            <p>{errorMessage}</p>
          </div>
        ) : null}
        <button>Login</button>
      </form>
    </div>
  );
};
