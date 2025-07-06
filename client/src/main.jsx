import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'  // ✅ Import BrowserRouter
import { Toaster } from 'react-hot-toast'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter> {/* ✅ Wrap App inside BrowserRouter */}
      <App />
      <Toaster position="top-right" />
    </BrowserRouter>
  </React.StrictMode>
)
