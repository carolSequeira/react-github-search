import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { compose, createStore, applyMiddleware } from "redux";

import { Provider } from 'react-redux'
import rootReducer from './redux/reducer/reducer';
import createSagaMiddleware from 'redux-saga';

import reportWebVitals from './reportWebVitals';
import { fetchReposWatcher } from "./sagas/fetchRepoSaga";
import { handlePageChangeWatcher } from "./sagas/handlePageChangeSaga";
import { composeWithDevTools } from 'redux-devtools-extension';




const sagaMiddleware = createSagaMiddleware();
let store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(fetchReposWatcher);
sagaMiddleware.run(handlePageChangeWatcher);

const AppWithStore = () => (
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

ReactDOM.render(<AppWithStore />, document.getElementById('root'));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
