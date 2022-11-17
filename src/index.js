import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { createStore, compose, applyMiddleware} from "redux";
import {Provider}  from 'react-redux'
import { rootReducer } from './redux/reducers/rootReducer';
import thunk from 'redux-thunk';


const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>
    <Provider store={store}>
    <BrowserRouter>
    <Routes>
      <Route path="/*" element={ <App />}></Route>
    </Routes>
    </BrowserRouter> 
    </Provider>
  </React.StrictMode>
);
