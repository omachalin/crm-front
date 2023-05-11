import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import fetcher from './fetcher';
import AuthStore from './API/AuthStore';

fetcher.interceptors.request.use((req) => {
  const token = AuthStore.access_token;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

reportWebVitals();