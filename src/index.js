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

const settings = require('./settings.json');
axios.defaults.baseURL = settings.APIUrl;
const token = localStorage.getItem('access_token');

if (token !== null) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

let isRefreshing = false;
let subscribers = [];

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onTokenRefreshed(access_token) {
  subscribers.map((cb) => cb(access_token));
  console.log(subscribers)
}

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        try {
          const access_token = await new Promise((resolve) => subscribeTokenRefresh(resolve));
          originalRequest.headers.Authorization = 'Bearer ' + access_token;
          return axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const response = await axios.post('/token-refresh/', {
          refresh: localStorage.getItem('refresh_token'),
        });
        const access_token = response.data.access;
        localStorage.setItem('access_token', access_token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        originalRequest.headers.Authorization = 'Bearer ' + access_token;
        onTokenRefreshed(access_token);
        return axios(originalRequest);
      } catch (refreshError) {
        localStorage.clear();
        window.location.href = '/auth';
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById('root'));

subscribeTokenRefresh((access_token) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
});

root.render(<App />);

reportWebVitals();