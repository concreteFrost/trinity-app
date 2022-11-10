import s from "./App.module.css";
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
import { useSelector } from "react-redux";



function App() {
  
  const user = useSelector((state)=> state.userReducer)
  return (
    <div className={s.container}>
      {user.isLoggedIn ? <Navbar className={s.nav} /> : null}
      {/* <HeaderImage className={s.logo} /> */}
      <Routes>
        <Route
          exact
          path="/login"
          element={<Login/>}
        ></Route>
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
          path="/activity"
          element={
            <ProtectedRoute>
              <Activity />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/doorstaff"
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
          path="/search"
          element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/authorise"
          element={
            <ProtectedRoute>
              <Authorise />
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
