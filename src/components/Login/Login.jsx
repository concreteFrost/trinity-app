import s from "./Login.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { SetLoginDetails } from "../../redux/actions";

export const Login = (props) => {
  const [errorMessage, setErrorMessage] = useState(false);
  const [clientID, setClientID] = useState(localStorage.getItem("clientID"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(false);
      }, 3000);
    }
  }, [errorMessage]);

  if (!clientID) {
    axios
      .get(
        "https://testapi.etrinity.services/TrinityWebApi/api/Auth/GenerateUniqueReference"
      )
      .then((res) => {
        localStorage.setItem("clientID", res.data.message);
        setClientID(res.data.message);
      });
  }

  function submitLogin(e) {
    e.preventDefault();
    axios({
      method: "POST",
      url: "https://testapi.etrinity.services/TrinityWebApi/api/Login",
      data: {
        username: e.target[0].value,
        client_id: clientID,
        grant_type: "password",
      },
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then((res) => {
        dispatch(SetLoginDetails(res.data));
        navigate("/home");
      })
      .catch((e) => {
        setErrorMessage(true)
        console.log(e)
      });
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
            <p>*incorrect user name</p>
          </div>
        ) : null}
        <button>Login</button>
      </form>
    </div>
  );
};
