import s from "./App.module.scss";
import "./scss/global.scss";
import { Navbar } from "./components/Navbar/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { Doorstaff } from "./components/Doorstaff/Doorstaff";
import { Activity } from "./components/Activity/Activity";
import { Review } from "./components/Review/Review";
import { Search } from "./components/Search/Search";
import { Authorise } from "./components/Authorise/Authorise";
import { Login } from "./components/Login/Login";
import { Footer } from "./components/Footer/Footer";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useSelector } from "react-redux";
import { ModalMessage } from "./components/Modal/ModalMessage/ModalMessage";
import { ModalLogout } from "./components/Modal/ModalLogout/ModalLogout";
import { ModalAction } from "./components/Modal/ModalAction/ModalAction";
import { Receipt } from "./components/Receipt/Receipt";
import Loader from "./components/Loader/Loader";
import DebugConsole from "./components/DebugConsole/DebugConsole";

function App() {
  const isLoggedIn = useSelector((state) => state.userReducer.isLoggedIn);

  return (
    <div>
      <div className={s.container}>
        <ModalMessage></ModalMessage>
        <ModalLogout></ModalLogout>
        <ModalAction></ModalAction>
        <DebugConsole></DebugConsole>
        {isLoggedIn === true ? <Navbar className={s.nav} /> : null}
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Navigate to="/home" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
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
      </div>
      <Footer></Footer>
      <Receipt></Receipt>
      <Loader></Loader>
    </div>
  );
}

export default App;
