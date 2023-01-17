import s from "./App.module.scss";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Doorstaff } from "./components/Doorstaff/Doorstaff";
import { Activity } from "./components/Activity/Activity";
import { Costs } from "./components/Costs/Costs";
import { Search } from "./components/Search/Search";
import { Authorise } from "./components/Authorise/Authorise";
import { Login } from "./components/Login/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector, useDispatch } from "react-redux";
import { ModalMessage } from "./components/Modal/ModalMessage/ModalMessage";
import { ModalLogout } from "./components/Modal/ModalLogout/ModalLogout";
import { TailSpin } from "react-loader-spinner";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { GetDisputedActivity } from "./redux/api/disputedApi";


function App() {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const location = useLocation();
  const isLoading = useSelector((state) => state.loaderReducer.isLoading);
  let user = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();

  //LOGOFF AUTOMATICALLY IF TOKEN EXPIRES
  useEffect(() => {
    if (user)
      if (new Date() > new Date(user[".expires"])) {
        dispatch({ type: "LOGOFF" });
      }
  }, [location]);



  return (
    <div className={s.container}>
      <ModalMessage></ModalMessage>
      <ModalLogout></ModalLogout>
      {isLoggedIn === true ? <Navbar className={s.nav} /> : null}
      {/* <HeaderImage className={s.logo} /> */}
      <Routes>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/" element={<Navigate to="/login" />}></Route>
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/activity/*"
          element={
            <ProtectedRoute>
              <Activity />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/doorstaff/*"
          element={
            <ProtectedRoute>
              <Doorstaff />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/costs"
          element={
            <ProtectedRoute>
              <Costs />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/search/*"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/authorise/*"
          element={
            <ProtectedRoute>
              <Authorise />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
      {isLoading === true ? (
        <div className={s.tail_spin_container}>
          <div className={s.tail_spin}>
            <TailSpin width={150} height={150} color={"#42aaf5"}></TailSpin>
          </div>{" "}
        </div>
      ) : null}
    </div>
  );
}

export default App;
