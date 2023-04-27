import s from "./App.module.scss";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Doorstaff } from "./components/Doorstaff/Doorstaff";
import { Activity } from "./components/Activity/Activity";
import { Review } from "./components/Review/Review";
import { Search } from "./components/Search/Search";
import { Authorise } from "./components/Authorise/Authorise";
import { Login } from "./components/Login/Login";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import { ModalMessage } from "./components/Modal/ModalMessage/ModalMessage";
import { ModalLogout } from "./components/Modal/ModalLogout/ModalLogout";
import { TailSpin } from "react-loader-spinner";

function App() {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);
  const isLoading = useSelector((state) => state.loaderReducer.isLoading);

  return (
    <div className={s.container}>
      <ModalMessage></ModalMessage>
      <ModalLogout></ModalLogout>
      {isLoggedIn === true ? <Navbar className={s.nav} /> : null}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
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
          path="/review/*"
          exact={false}
          element={
            <ProtectedRoute>
              <Review />
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
