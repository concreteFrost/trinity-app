import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route, HashRouter } from 'react-router-dom';
import { createStore, compose, applyMiddleware } from "redux";
import { Provider } from 'react-redux'
import { rootReducer } from './redux/reducers/rootReducer';
import thunk from 'redux-thunk';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <React.StrictMode>
    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<App />}></Route>
        </Routes>
      </HashRouter>
    </Provider>
  </React.StrictMode>
);
