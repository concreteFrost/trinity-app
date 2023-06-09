import s from "./Login.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetToken } from "../../redux/api/loginApi";
import { SetLoginDetails } from "../../redux/actions";
import axios from "axios";
import { baseUrl } from "../../contexts/baseUrl";

export const Login = () => {
  const errorMessage = useSelector((state) => state.userReducer.errorOnLogin);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clientID, setClientID] = useState(null); // Use state to store the clientID

  useEffect(() => {
    let storedClientID = localStorage.getItem("clientID");
    if (!storedClientID) {
      axios.get(baseUrl + "/Auth/GenerateUniqueReference").then((res) => {
        const generatedClientID = res.data.message;
        localStorage.setItem("clientID", generatedClientID);
        setClientID(generatedClientID);
      });
    } else {
      setClientID(storedClientID);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && new Date() < new Date(user[".expires"])) {
      dispatch(SetLoginDetails(user));
    }

    if (isLoggedIn) {
      const lastRoute = localStorage.getItem("lastRoute");
      navigate(lastRoute || "/home");
    }
  }, [isLoggedIn, dispatch, navigate]);

  function submitLogin(e) {
    e.preventDefault();
    if (clientID) {
      dispatch(GetToken(e.target[0].value, clientID));
    } else {
      
      console.log("clientID not available");
    }
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
