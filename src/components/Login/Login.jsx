import s from "./Login.module.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SetErrorOnLogin, SetLoginDetails } from "../../redux/actions/loginActions";
import { GenerateUniqueReference, GetToken } from "../../services/authApi";

export const Login = () => {
  const errorMessage = useSelector((state) => state.userReducer.errorOnLogin);
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [clientID, setClientID] = useState(null); // Use state to store the clientID

  useEffect(() => {
    let storedClientID = localStorage.getItem("clientID");
    if (!storedClientID) {
      GenerateUniqueReference()
        .then((generatedIdReferene) => {
          setClientID(generatedIdReferene);
        })
    } else {
      setClientID(storedClientID);
    }
  }, []);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const lastRoute = localStorage.getItem("lastRoute");
    if (user && new Date() < new Date(user[".expires"]))
      dispatch(SetLoginDetails(user));

    if (isLoggedIn) {
      navigate(lastRoute || "/home");
    }
  }, [isLoggedIn]);

  function submitLogin(e) {
    e.preventDefault();
    if (clientID) {
      GetToken(e.target[0].value, clientID)
        .then((res) => dispatch(SetLoginDetails(res)))
        .catch((e) => dispatch(SetErrorOnLogin()));
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
          <p>
            {" "}
            <strong>–NOTE </strong> pub logins should be entered in the format
            of your network login without the ‘@jdwetherspoon.co.uk’
          </p>
          <p>
            <i> -e.g. ‘p95’ or ‘p177’ or ‘p4039’ without any leading zeroes </i>
          </p>
        </div>
      </div>
    </div>
  );
};
