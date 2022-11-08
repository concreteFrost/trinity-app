
import s from './App.module.css';
import { Navbar } from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './components/Home/Home';
import { HeaderImage } from './components/HeaderImage/HeaderImage';
import { Doorstaff } from './components/Doorstaff/Doorstaff';
import { Activity } from './components/Activity/Activity';
import { Costs } from './components/Costs/Costs';
import { Search } from './components/Search/Search';
import {Authorise} from "./components/Authorise/Authorise"


function App() {
  return (
    <div className={s.container}>
      <BrowserRouter>
        <Navbar className={s.nav} />
        <HeaderImage className={s.logo} />
        <Routes>
          <Route exact path="/" element={<Navigate to="/home" />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/activity' element={<Activity/>}></Route>
          <Route path='/doorstaff' element={<Doorstaff/>}></Route>
          <Route path='/costs' element={<Costs/>}></Route>
          <Route path='/search' element={<Search/>}></Route>
          <Route path='/authorise' element={<Authorise/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
