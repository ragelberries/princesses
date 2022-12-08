import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

if (import.meta.env.DEV) {
  axios.defaults.baseURL = 'http://localhost:5271';
} else {
  axios.defaults.baseURL = 'api';
}


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
