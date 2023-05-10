import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App';
import axios from 'axios';
import reportWebVitals from './reportWebVitals';
import AuthStore from './API/AuthStore';

const settings = require('./settings.json');
axios.defaults.baseURL = settings.APIUrl;

axios.interceptors.request.use((req) => {
  const token = AuthStore.access_token;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
})


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();